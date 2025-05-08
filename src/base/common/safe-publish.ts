import { Queue } from 'bull';
import { IdHash } from './id-hash';
import { IServiceMessageContract } from '../interfaces/service-message-contract.interface';
import { UUID } from 'uuidjs';
export async function safePublish(
  queue: Queue<any>,
  {
    dto,
    publisher,
    eventName,
    timeout = 30,
    freshEvent = false,
  }: {
    dto: IServiceMessageContract<any>;
    publisher: string;
    eventName: string;
    freshEvent?: boolean;
    timeout?: number;
  },
) {
  const jobId = dto.id
    ? dto.id
    : freshEvent
      ? UUID.genV6().toString()
      : IdHash.generate([eventName, JSON.stringify(dto.data)], publisher);
  dto.id = jobId;
  await queue.add(eventName, dto, { timeout, jobId });
}
