import axios, { type AxiosError, type AxiosInstance } from 'axios';
import { Logger } from './logger';
import { ClientException } from '../exceptions/http/client.exception';

function toErrorObject(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }
  if (typeof value === 'string') {
    return new Error(value);
  }
  try {
    return new Error(JSON.stringify(value));
  } catch {
    return new Error(String(value));
  }
}

export interface INetworkRequest {
  url: string;
  method: 'post' | 'get' | 'put' | 'delete' | 'patch';
  data?: Record<string, unknown>;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export class NetworkHandler {
  private readonly logger = new Logger(NetworkHandler.name);
  private readonly client: AxiosInstance;

  private onSuccessPromise?: (response: unknown) => Promise<unknown>;
  private onFailPromise?: (status: number, data: unknown) => Promise<unknown>;

  constructor() {
    this.client = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async callRequest(
    request: INetworkRequest,
    apiKey?: string,
  ): Promise<unknown> {
    try {
      const response = await this.client(
        this.buildAxiosConfig(request, apiKey),
      );
      if ([200, 201, 204].includes(response.status)) {
        await this.runOnSuccess(response.data, request);
        return response;
      }
      throw new ClientException({
        statusCode: response.status,
        information: {
          identifier: 'networkHandler.statusNotHandled',
          message: 'Network request failed with status not handled',
        },
      });
    } catch (error) {
      await this.handleRequestError(error, request);
      throw error;
    }
  }

  private buildAxiosConfig(
    request: INetworkRequest,
    apiKey: string | undefined,
  ): Record<string, unknown> {
    const { headers, url, method, data, params } = request;
    return {
      method,
      url,
      data,
      params,
      headers: {
        'Content-Type': 'application/json',
        ...(headers ?? {}),
        ...(apiKey ? { 'api-key': apiKey } : {}),
      },
    };
  }

  private async runOnSuccess(
    responseData: unknown,
    request: INetworkRequest,
  ): Promise<void> {
    if (this.onSuccessPromise === undefined) {
      return;
    }
    try {
      await this.onSuccessPromise(responseData);
    } catch (error) {
      this.logger.error(
        {
          error: toErrorObject(error),
          message: 'Network request failed with onSuccess handler',
          info: { url: request.url, requestData: request },
        },
        this.callRequest.name,
      );
      if (this.onFailPromise) {
        await this.onFailPromise(500, error);
      }
    }
  }

  private async handleRequestError(
    error: unknown,
    request: INetworkRequest,
  ): Promise<void> {
    const response = axios.isAxiosError(error)
      ? (error as AxiosError).response
      : undefined;
    if (response === undefined) {
      this.logger.error(
        {
          error: toErrorObject(error),
          message: 'Network request failed with empty response',
          info: { url: request.url, requestData: request },
        },
        this.callRequest.name,
      );
      return;
    }
    this.logger.error(
      {
        error: new Error(
          `AxiosError: Request failed with status code ${response.status} ${response.statusText}`,
        ),
        message: 'Network request failed',
        info: {
          url: request.url,
          requestData: request,
          responseData: response.data,
        },
      },
      this.callRequest.name,
    );
    if (this.onFailPromise !== undefined) {
      this.logger.error(
        {
          error: toErrorObject(error),
          message: 'Network request failed with onFail handler',
          info: {
            url: request.url,
            requestData: request,
            responseData: response.data,
            status: response.status,
          },
        },
        this.callRequest.name,
      );
      await this.onFailPromise(response.status, response.data);
    }
  }

  onSuccess(handler: (response: unknown) => Promise<unknown>): this {
    this.onSuccessPromise = handler;
    return this;
  }

  onFail(handler: (status: number, data: unknown) => Promise<unknown>): this {
    this.onFailPromise = handler;
    return this;
  }
}
