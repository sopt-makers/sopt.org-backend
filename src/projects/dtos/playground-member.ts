export enum Role {
  MAINPM = 'MAINPM',
  PM = 'PM',
  DESIGN = 'DESIGN',
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  WEB = 'WEB',
  SERVER = 'SERVER',
}

export class PlaygroundMember {
  memberId: number;
  memberRole: Role;
  memberDescription: string;
  isTeamMember: boolean;
  memberName: string;
  memberGeneration: number;
}
