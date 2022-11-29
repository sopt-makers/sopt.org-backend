import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetSemestersDocs } from 'docs/semesters/semesters.swagger';
import { SemestersInfoResponseDto } from 'src/semesters/dtos/semesters-info-response.dto';
import { SemestersListResponseDto } from 'src/semesters/dtos/semesters-list-response.dto';
import { Semester } from 'src/semesters/entities/semesters.entity';
import { SemestersService } from 'src/semesters/services/semesters.service';

@Controller('semesters')
@ApiTags('Semester')
export class SemestersController {
  constructor(private readonly semestersService: SemestersService) {}

  @Get('')
  @GetSemestersDocs()
  async getSemesters(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<SemestersListResponseDto> {
    const semesters = await this.semestersService.findAll(limit, page);
    const count = await this.semestersService.count();

    const semestersInfoList: SemestersInfoResponseDto[] = semesters.map(
      (semester: Semester) => {
        return new SemestersInfoResponseDto(semester);
      },
    );

    return {
      page: page,
      limit: limit,
      total: count,
      semesters: semestersInfoList,
    };
  }
}
