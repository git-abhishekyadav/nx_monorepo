import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class NotEmptyValuePipe implements PipeTransform {
  transform(value: any, metaData: ArgumentMetadata) {
    if (value && value != undefined && value != null) {
      return value;
    }
    throw new BadRequestException(
      `${metaData.data} is required in the request`
    );
  }
}
