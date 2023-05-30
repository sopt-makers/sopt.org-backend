export class SopticleWritersResponseDto {
  readonly id: number;
  readonly name: string;
  readonly part: string;
  readonly generation: number;
}

export class GetSopticlesResponseDto {
  readonly id: number;
  readonly link: string;
  readonly writers: SopticleWritersResponseDto[];
}
