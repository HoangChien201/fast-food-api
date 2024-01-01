import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('update-file')
export class UpdateFileController {

  @Post()
  @UseInterceptors(FileInterceptor('file',{}))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}

