import {
  Bind,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('api/user')
export class UserController {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  @Get()
  async getUser(@Query('id') id: string) {
    const userId = parseFloat(id);
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          walletDetail: true,
          cart: true,
        },
      });

      if (user) {
        return user;
      } else {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
    } catch (error) {
      throw new NotFoundException({msg:error.response.message})
    }
  }

  @Post('/profile-photo')
  @UseInterceptors(FileInterceptor('file'))
  @Bind(UploadedFile())
  addProfilePhoto(file: Express.Multer.File, @GetUser('id') user: User) {
    const id = user.id;
    return this.userService.addProfilePhoto(file, id);
  }
}
