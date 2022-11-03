import { ApiProperty } from '@nestjs/swagger';

export enum LinkType {
  WEBSITE = '웹사이트',
  GOOGLE_PLAYSTORE = '구글 플레이스토어',
  APP_STORE = '앱 스토어',
  GITHUB = 'Github',
  PRESENTATION_VIDEO = '발표영상',
  INSTAGRAM = 'instagram',
  ETC = '기타 관련자료',
}

export class Link {
  @ApiProperty({
    type: String,
    required: true,
    description:
      '웹사이트, 구글 플레이스토어, 앱스토어, Github, 발표영상 등 프로젝트에 관련된 링크의 종류',
    enum: LinkType,
  })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '링크의 url 주소',
  })
  url: string;
}
