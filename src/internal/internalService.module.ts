import { CrewModule } from './crew/crew.module';
import { Module } from '@nestjs/common';
import { PlaygroudModule } from './playground/playgroud.module';

@Module({ imports: [PlaygroudModule, CrewModule] })
export class InternalServiceModule {}
