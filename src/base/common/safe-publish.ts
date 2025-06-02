import type { Queue } from 'bull';
import { UUID } from 'uuidjs';
import { IdHash } from './id-hash';
import type { IServiceMessageContract } from '../interfaces/service-message-contract.interface';
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
  const jobId =
    dto.id ??
    (freshEvent
      ? UUID.genV6().toString()
      : IdHash.generate([eventName, JSON.stringify(dto.data)], publisher));
  dto.id = jobId;
  await queue.add(eventName, dto, { timeout, jobId });
}
