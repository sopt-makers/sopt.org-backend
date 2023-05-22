export class GetPlaygroundUserInfoResponseDto {
  readonly id: number;
  readonly name: string;
  readonly generation: number;
  readonly profileImage: string | null;
  readonly hasProfile: boolean;
}
