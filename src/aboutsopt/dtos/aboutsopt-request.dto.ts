import { PageRequest } from '../../utils/paginate-request.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AboutSoptRequestDto {
  @ApiProperty({
    type: Number,
    required: true,
  })
  id: number;
}