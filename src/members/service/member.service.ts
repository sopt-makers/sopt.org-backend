import { PlaygroundService } from 'src/internal/playground/playground.service';
import { Injectable } from '@nestjs/common';
import { MemberListResponseDto } from '../dtos/member-response.dto';
import { MemberRequestDto } from '../dtos/member-request.dto';
import { Cacheable } from '../../common/cache';

@Injectable()
export class MemberService {
  constructor(private readonly playgroundService: PlaygroundService) {}

  @Cacheable({
    ttl: 30 * 60,
    validate: (value: any) => !(value instanceof Error),
  })
  async findAll({
    filter: part,
    generation,
  }: MemberRequestDto): Promise<MemberListResponseDto> {
    return await this.playgroundService.getAllMembers({
      filter: part,
      generation,
    });
  }
}
