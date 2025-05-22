import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private wrapperService: WrapperService) { }

  async create(user: User) {
    try {
      
      return this.wrapperService.create(User, user)
    } catch (error) {
      console.log("ERROR on userservice", error);
      
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(body: any) {
    return this.wrapperService.findOne(User, {
      username: body.username || body.email
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
