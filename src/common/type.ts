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
