import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class WalletDto {
    @IsNotEmpty()
    @IsString()
    walletNumber: string

    @IsNotEmpty()
    @IsString()
    bankCode: string
}

export class FundWalletDto {
    @IsNotEmpty()
    @IsString()
    walletNumber: string

    @IsNotEmpty()
    @IsNumber()
    amount: number

    // @IsNotEmpty()
    // @IsString()
    // password: string
}