import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import fs from 'fs';
import path from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import storage, { uploadDir } from '../global/config/diskStorage';

@Controller('files')
export class FilesController {
  private readonly logger = new Logger(FilesController.name);

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'files', maxCount: 4 }], { storage }),
  )
  uploadFile(@Body() data: { files: string[] }) {
    return data.files;
  }
  @Get(':name')
  preview(@Res() res: Response, @Param('name') name: string) {
    const fileUrl = path.join(uploadDir, name);
    res.sendFile(fileUrl);
  }

  @Delete(':name')
  delete(@Param('name') name: string) {
    fs.unlink(path.join(uploadDir, name), () => null);
    return { deleted: true };
  }
}
