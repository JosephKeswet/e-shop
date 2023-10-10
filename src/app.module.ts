import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { OtpService } from './otp/otp.service';
import { EmailService } from './email/email.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { WalletService } from './wallet/wallet.service';
import { WalletController } from './wallet/wallet.controller';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { CartService } from './cart/cart.service';
import { CartController } from './cart/cart.controller';
import { CategoriesService } from './categories/categories.service';
import { CategoriesController } from './categories/categories.controller';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),AuthModule, PrismaModule,UserModule],
  providers: [ OtpService, EmailService, UserService, WalletService, ProductsService, CartService, CategoriesService],
  controllers: [UserController, WalletController, ProductsController, CartController, CategoriesController],
})
export class AppModule {}
