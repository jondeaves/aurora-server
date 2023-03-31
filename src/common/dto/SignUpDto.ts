import { IsNotEmpty } from 'class-validator';

export default class SignUpDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
