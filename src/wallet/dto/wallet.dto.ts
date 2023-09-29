import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class WalletDto {
    @IsNotEmpty()
    @IsString()
    walletNumber: string

    @IsNotEmpty()
    @IsString()
    bankCode: string
}