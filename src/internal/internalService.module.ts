import { Module } from '@nestjs/common';
import { PlaygroudModule } from './playground/playgroud.module';

@Module({ imports: [PlaygroudModule] })
export class InternalServiceModule {}
