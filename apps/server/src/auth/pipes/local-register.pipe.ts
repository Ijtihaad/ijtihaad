import { formatZodError, localRegisterSchema } from '@libs/common';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class localRegisterPipe implements PipeTransform {
  private readonly logger = new Logger(localRegisterPipe.name);

  transform(data: any, metadata: ArgumentMetadata) {
    this.logger.log(this.transform.name);

    if (!data || metadata.type !== 'body') {
      return data;
    }
    
    const result = localRegisterSchema.safeParse(data);
    if (!result.success) {
      throw new BadRequestException(formatZodError(result.error));
    }
    return result.data;
  }
}
