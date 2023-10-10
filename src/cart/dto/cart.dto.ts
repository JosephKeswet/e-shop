import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RemoveFromCartDto {
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsNumber()
    userId:number

}

export class ClearCartDto{
    @IsNotEmpty()
    @IsNumber()
    userId:number
}

export class AddItemDto {
    @IsNotEmpty()
    @IsNumber()
    userId:number;

    @IsNotEmpty()
    @IsString()
    productId: string;
}

export class IncreaseQuantityDto {
    @IsNotEmpty()
    @IsNumber()
    productId:number

    @IsNotEmpty()
    @IsNumber()
    userId:number
}

export class DecreaseQuantityDto extends IncreaseQuantityDto {}