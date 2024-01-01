import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UpdateFileController } from './update-file.controller';
import { UpdateFileService } from './update-file.service';

@Module({
  imports: [],
  controllers: [UpdateFileController],
  providers: [UpdateFileService],
})
export class UpdateFileModule {}