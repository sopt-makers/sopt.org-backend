import { VisitorService } from '../service/visitor.service';
import {
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import {
  GetTodayVisitorResponseDto,
  VisitorCountUpResponseDto,
} from '../dtos/visitor-response.dto';
import {
  GetTodayVisitorDocs,
  VisitorCountUpDocs,
} from '../../../docs/visitor/visitor.swagger';
import { Request } from 'express';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}
  @Post()
  @VisitorCountUpDocs()
  async visitorCountUp(
    @Req() req: Request,
  ): Promise<VisitorCountUpResponseDto> {
    return this.visitorService.visitorCountUp(req);
  }

  @Get()
  @GetTodayVisitorDocs()
  async getTodayVisitor(): Promise<GetTodayVisitorResponseDto> {
    return this.visitorService.getTodayVisitor();
  }
}
