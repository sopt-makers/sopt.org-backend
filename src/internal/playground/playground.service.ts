import { Injectable } from '@nestjs/common';

import { PlaygroundRepository } from './playground.repository';
import { GetPlaygroundUserInfoResponseDto } from './dto/get-playground-user-info-response.dto';

@Injectable()
export class PlaygroundService {
  constructor(private readonly playgroundRepository: PlaygroundRepository) {}

  async getPlaygroundUserInfoByToken(
    authToken: string,
  ): Promise<GetPlaygroundUserInfoResponseDto> {
    return await this.playgroundRepository.getUser(authToken);
  }
}
