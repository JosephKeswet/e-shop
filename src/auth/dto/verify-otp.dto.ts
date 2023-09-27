import { IsNotEmpty, IsString } from "class-validator";

export class VerifyOtpDto {


    @IsString()
    @IsNotEmpty()
    code: string;
}