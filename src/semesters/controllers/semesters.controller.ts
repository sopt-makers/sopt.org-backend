import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetSemestersDocs } from 'docs/semesters/semesters.swagger';
import { SemestersListResponseDto } from 'src/semesters/dtos/semesters-list-response.dto';

@Controller('semesters')
@ApiTags('Semester')
export class SemestersController {
  @Get('')
  @GetSemestersDocs()
  async getSemesters(): Promise<SemestersListResponseDto> {
    const mockSemester: SemestersListResponseDto = {
      page: 0,
      limit: 0,
      total: 1,
      semesters: [
        {
          id: 1,
          color: null, //'#4877AF'
          logo: 'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/semester/logo/default.png',
          background: null, // 'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/semester/background/time_31.png',
          name: null, //'IN',
          year: '2007 하반기',
        },
      ],
    };
    return mockSemester;
  }
}
