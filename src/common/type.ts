export class CrewPageApiMetaResponseDto {
  readonly page: number;
  readonly take: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

export enum Part {
  iOS = 'iOS',
  PLAN = 'PLAN',
  DESIGN = 'DESIGN',
  SERVER = 'SERVER',
  ANDROID = 'ANDROID',
  WEB = 'WEB',
}

export interface PlaygroundUser {
  id: number;
  name: string;
  generation: number;
  profileImage: string | null;
  hasProfile: boolean;
}

export enum SopticlePlatformEnum {
  TISTORY = 'tistory',
  VELOG = 'velog',
  Brunch = 'Brunch',
}
