import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Users } from '../users/users.entity';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,  private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(username);
      const isMatch = await bcrypt.compare(pass, user.password);
      if(isMatch){
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user.id, role:user.role };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}


