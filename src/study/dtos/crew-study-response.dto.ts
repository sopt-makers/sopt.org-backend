import { MeetingJoinablePart } from './study-response.dto';
import { CrewPageApiMetaResponseDto } from '../../common/type';

export interface CrewMeetingResponseDto {
  readonly statusCode: number;
  readonly data: CrewMeetingListDto;
}

export interface CrewMeetingListDto {
  readonly meetings: CrewMeetingDto[];
  readonly meta: CrewPageApiMetaResponseDto;
}

export interface CrewMeetingDto {
  id: number;
  userId: number;
  title: string;
  category: string;
  imageURL: [
    {
      id: number;
      url: string;
    },
  ];
  startDate: Date;
  endDate: Date;
  capacity: number;
  desc: string;
  processDesc: string;
  mStartDate: Date;
  mEndDate: Date;
  leaderDesc: string;
  targetDesc: string;
  note: string;
  isMentorNeeded: false;
  canJoinOnlyActiveGeneration: false;
  targetActiveGeneration: number | null;
  joinableParts: MeetingJoinablePart[];
  appliedInfo: [
    {
      id: number;
      type: number;
      meetingId: number;
      userId: number;
      content: number;
      appliedDate: Date;
      status: number;
    },
  ];
  user: {
    id: number;
    name: string;
    orgId: number;
    activities: [
      {
        part: string;
        generation: number;
      },
    ];
    profileImage: string;
    phone: string;
  };
  status: number;
}
