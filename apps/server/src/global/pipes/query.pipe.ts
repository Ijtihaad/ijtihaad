import {
  ArgumentMetadata,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class QueryPipe implements PipeTransform {
  private readonly logger = new Logger(QueryPipe.name);

  transform(data: string, metadata: ArgumentMetadata) {
    this.logger.log(this.transform.name);

    if (!data || metadata.type !== 'query') {
      return data;
    }

    if (metadata.data === 'filters') {
      const filters = typeof data === 'string' ? [data] : data;
      const dataRecord: Record<string, boolean> = {};
      const filtersRecord: Record<string, any> = { OR: [] };
      filters.forEach((filter) => {
        const [key, val] = filter.split(':');
        const value = this.parseDataType(val);
        if (dataRecord[key]) {
          filtersRecord.OR.push({ [key]: value });
          if (filtersRecord[key]) {
            filtersRecord.OR.push({ [key]: filtersRecord[key] });
            delete filtersRecord[key];
          }
        } else {
          filtersRecord[key] = value;
          dataRecord[key] = true;
        }
      });
      if (!filtersRecord.OR.length) {
        delete filtersRecord.OR;
      }

      return filtersRecord ?? {};
    }

    if (metadata.data === 'orderBy') {
      const [property, order] = data.split(':');
      return {
        [property]: order === 'asc' ? 'asc' : 'desc',
      };
    }
    return data ?? {};
  }

  parseDataType(val: string) {
    const numberRegex = /^[0-9]?$/;
    if (numberRegex.test(val)) {
      return parseFloat(val);
    } else if (val === 'true') {
      return true;
    } else if (val === 'false') {
      return false;
    } else {
      return val;
    }
  }
}
