import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { EnvConfig } from "src/configs/env.config";
import { Repository } from "typeorm";

@Injectable()
export class MembersService {
    constructor(    
      private readonly httpService: HttpService,
      private readonly configService: ConfigService<EnvConfig>,
    ){}

}