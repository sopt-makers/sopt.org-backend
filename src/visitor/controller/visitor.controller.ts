import { VisitorService } from '../service/visitor.service';
import {
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClearCacheDocs } from '../../../docs/clear-cache/clear-cache.swagger';
import {
  GetTodayVisitorResponseDto,
  VisitorCountUpResponseDto,
} from '../dtos/visitor-response.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}
  @Post()
  @ClearCacheDocs()
  async visitorCountUp(): Promise<VisitorCountUpResponseDto> {
    return this.visitorService.visitorCountUp();
  }

  @Get()
  async getTodayVisitor(): Promise<GetTodayVisitorResponseDto> {
    return this.visitorService.getTodayVisitor();
  }
}
