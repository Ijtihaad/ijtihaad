import {
  ArgumentMetadata,
  BadRequestException,
  Logger,
  PipeTransform
} from '@nestjs/common';
import { formatZodError } from '@repo/common';
import { z } from 'zod';

export function ValidationPipe<T extends z.ZodRawShape>(validationSchema: z.ZodObject<T>) {

  return class Pipe implements PipeTransform {
    readonly logger = new Logger(ValidationPipe.name);
    transform(data: any, metadata: ArgumentMetadata) {
      this.logger.log(this.transform.name);

      if (!data || metadata.type !== 'body') {
        return data;
      }

      const result = validationSchema.safeParse(data);
      if (!result.success) {
        throw new BadRequestException(formatZodError(result.error));
      }
      return result.data;
    }
  }
}
