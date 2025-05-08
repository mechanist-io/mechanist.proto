import { Module } from '@nestjs/common';
import { FileService } from './services/file.service';

@Module({
  imports: [],
  exports: [FileService],
  providers: [FileService],
})
export class FileModule {}
