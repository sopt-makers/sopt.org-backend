import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';

import { EnvConfig } from '../../configs/env.config';

@Injectable()
export class CrewRepository {
  private readonly API_URL: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {
    this.API_URL = this.configService.get('CREW_API_URL') as string;
  }
}
