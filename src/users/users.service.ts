import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, Users } from './users.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: UsersRepository,
    private configService: ConfigService,
    private jwtService: JwtService
  ) { }
  async create(createUserDto: CreateUserDto) {
    const { username, password, role } = createUserDto;
    const saltOrRounds = 10;
    const hashPassword = password;
    const hash = await bcrypt.hash(hashPassword, saltOrRounds);
    const user = this.usersRepository.create({
      username: username,
      password: hash,
      role:role
    })
    await this.usersRepository.save(user)
    return user;
  }

  findAll(xHeaders: any) {
    let creds = this.configService.get("X_HEADERS")
    if (creds === xHeaders) {
      return this.usersRepository.find();
    }
    return "Headers is incorrect or not set"
  }

  findOne(username: string) {
    return this.usersRepository.findOne({
      where: {
        username: username
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async createPasswordResetToken(userId: string): Promise<string> {
    const payload = { sub: userId };
    const options = { expiresIn: '1h' };
    const token = await this.jwtService.signAsync(payload, options);
    // TODO: save the token in the database for later verification
    return token;
  }
}


