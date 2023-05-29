export enum Role {
  MAINPM = 'Main PM',
  PM = 'PM',
  TEAMIMPROVEMENT = 'Team Improvement',
  DESIGN = '디자이너',
  IOS = 'iOS 개발자',
  ANDROID = 'Android 개발자',
  WEB = '웹 프론트엔드 개발자',
  SERVER = '서버 개발자',
}

export class PlaygroundMember {
  memberId: number;
  memberRole: Role;
  memberDescription: string;
  isTeamMember: boolean;
  memberName: string;
  memberGeneration: number;
}
