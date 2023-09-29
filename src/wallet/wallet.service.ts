import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { WalletDto } from './dto/wallet.dto';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async createWallet(dto: WalletDto, id: string) {
    const userId = parseFloat(id);
    try {
      const isUser = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!isUser) {
        return {
          success: false,
          msg: 'There is no user with this id',
        };
      }
      const isWallet = await this.prisma.walletDetail.findUnique({
        where: {
          userId: userId,
          walletNumber: dto.walletNumber,
        },
      });

      if (!isWallet) {
        const user = await this.prisma.walletDetail.create({
          data: {
            walletNumber: dto.walletNumber,
            bankCode: dto.bankCode,
            user: { connect: { id: userId } },
          },
        });

        return user;
      } else {
        return {
          success: false,
          msg: 'This user already has a wallet',
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async getBanks() {
    const { data } = await axios.get(
      'https://api.paystack.co/bank?country=nigeria',
    );
    return data;
  }
}
