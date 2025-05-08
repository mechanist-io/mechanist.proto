/* eslint-disable */
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

@Module({})
@Global()
export class GlobalServicesModule {
  static register(services: Provider[], modules: any[]): DynamicModule {
    return {
      module: GlobalServicesModule,
      imports: [...modules],
      providers: [...services],
      exports: [...services, ...modules],
    };
  }
}
