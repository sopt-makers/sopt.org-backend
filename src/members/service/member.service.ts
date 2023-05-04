import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { EnvConfig } from 'src/configs/env.config';
import { MemberResponseDto } from '../dtos/member-response.dto';
import { MemberRequestDto } from '../dtos/member-request.dto';

@Injectable()
export class MemberService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {}

  async findAll({
    filter: part,
    generation,
  }: MemberRequestDto): Promise<MemberResponseDto[]> {
    const memberApiPath = '/internal/api/v1/official/members/profile';

    const apiUrl = this.configService.get('PLAYGROUND_API_URL');
    const jwtToken = this.configService.get('PLAYGROUND_API_URL_JWT_TOKEN');

    const response = await lastValueFrom(
      this.httpService
        .get<MemberResponseDto[]>(apiUrl + memberApiPath, {
          headers: {
            Authorization: jwtToken,
          },
          params: {
            filter: part,
            generation,
          },
        })
        .pipe(
          map((res) => res.data),
          catchError((error) => {
            console.error(`Get Member Failed: ${error}`);
            return of([]);
          }),
        ),
    );

    return response;
  }
}
