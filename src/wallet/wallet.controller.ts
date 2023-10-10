import { Body, Controller, Get, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { FundWalletDto, WalletDto } from './dto/wallet.dto';
import { WalletService } from './wallet.service';

@UseGuards(JwtGuard)
@Controller('api/')
export class WalletController {
    constructor(private walletService: WalletService){}

    @Get('/banks')
    getBanks(){
        return this.walletService.getBanks()
    }
    @Post('/add-wallet')
    createWallet(@Query('id') id:string,@Body() dto:WalletDto){
        return this.walletService.createWallet(dto,id)
    }

    @Patch('/fund-wallet')
    fundWallet(@Body() dto:FundWalletDto){
        return this.walletService.fundWallet(dto)
    }
}
