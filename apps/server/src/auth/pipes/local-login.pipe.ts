import { formatZodError, localLoginSchema } from '@libs/common';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class LocalLoginPipe implements PipeTransform {
  private readonly logger = new Logger(LocalLoginPipe.name);

  transform(data: any, metadata: ArgumentMetadata) {
    this.logger.log(this.transform.name);

    if (!data || metadata.type !== 'body') {
      return data;
    }

    const result = localLoginSchema.safeParse(data);
    if (!result.success) {
      throw new BadRequestException(formatZodError(result.error));
    }
    return result.data
  }
}
