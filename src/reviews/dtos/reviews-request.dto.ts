import { PageRequest } from '../../utils/paginate-request.dto';
import { Part } from '../entities/reviews.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewsRequestDto extends PageRequest {
  @ApiProperty({
    type: String,
    enum: Part,
    required: false,
    description: 'Part, 전체를 불러올땐 아무값도 안넣으면 됩니다.',
  })
  part?: Part;
}
