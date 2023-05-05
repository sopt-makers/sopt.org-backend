import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { EnvConfig } from 'src/configs/env.config';
import { MemberListResponseDto } from '../dtos/member-response.dto';
import { MemberRequestDto } from '../dtos/member-request.dto';
import { Cacheable } from '../../common/cache';

@Injectable()
export class MemberService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {}

  @Cacheable({
    ttl: 30 * 60,
    validate: (value: any) => !(value instanceof Error),
  })
  async findAll({
    filter: part,
    generation,
  }: MemberRequestDto): Promise<MemberListResponseDto> {
    const memberApiPath = '/internal/api/v1/official/members/profile';

    const apiUrl = this.configService.get('PLAYGROUND_API_URL');
    const jwtToken = this.configService.get('PLAYGROUND_API_URL_JWT_TOKEN');

    return await lastValueFrom(
      this.httpService
        .get<MemberListResponseDto>(apiUrl + memberApiPath, {
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
            return of({
              members: [],
              numberOfMembersAtGeneration: 0,
            });
          }),
        ),
    );
  }
}
