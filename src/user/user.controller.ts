import {
  Bind,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(@GetUser('id') user:User){
    return {
      userInfo:user
    };
  }

  @Post('/profile-photo')
  @UseInterceptors(FileInterceptor('file'))
  @Bind(UploadedFile())
  addProfilePhoto(file,@GetUser('id') user:User) {
    const id = user.id;
    return this.userService.addProfilePhoto(file,id);
  }
}
