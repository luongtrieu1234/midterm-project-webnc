import { Request, Response } from 'express';
import * as fs from 'fs';
import { isArray } from 'lodash';

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class DeleteFileOnErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // const getFiles = (
    //   multerFiles: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] },
    // ): Express.Multer.File[] => {
    //   if (!multerFiles) return [];
    //   // if multerFiles is Express.Multer.File[]
    //   if (isArray(multerFiles)) return multerFiles;
    //   // if multerFiles is { [fieldname: string]: Express.Multer.File[]; }
    //   return Object.values(multerFiles)?.flat() ?? [];
    // };

    // const files = getFiles(request.files) ?? [];

    // for (const file of files) {
    //   if (file?.path) {
    //     fs.unlink(file?.path, (err) => {
    //       if (err) {
    //         console.error(err);
    //         return err;
    //       }
    //     });
    //   }
    // }

    response.status(status).json(exception.getResponse());
  }
}
