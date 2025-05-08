import { Module } from '@nestjs/common';
import { MediaController } from './controllers/media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';
import { MediaEntity } from './entities/media.entity';
import { MediaService } from './services/media.service';

@Module({
  imports: [
    FileModule,
    TypeOrmModule.forFeature([MediaEntity]),
  ],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
