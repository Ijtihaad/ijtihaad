import { formatZodError, updateUserSchema } from '@repo/common';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class UpdateUserPipe implements PipeTransform {
  private readonly logger = new Logger(UpdateUserPipe.name);

  transform(data: any, metadata: ArgumentMetadata) {
    this.logger.log(this.transform.name);

    if (!data || metadata.type !== 'body') {
      return data;
    }

    const result = updateUserSchema.safeParse(data);
    if (!result.success) {
      throw new BadRequestException(formatZodError(result.error));
    }
    return result.data;
  }
}
