import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto';
import { AppError } from 'src/common/errors';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

    async hashPassword(password: string) {
        return bcrypt.hash(password, 10)
    }

    async findUserByEmail(email: string) {
        return this.userRepository.findOne({where: {email}})
    }

    async createUser(dto: CreateUserDto): Promise<CreateUserDto>{
        dto.password = await this.hashPassword(dto.password)
        await this.userRepository.create({
            firstName: dto.firstName,
            username: dto.username,
            email: dto.email,
            password: dto.password
        })
        return dto
    }

    async publicUser(email: string){
        return this.userRepository.findOne({
            where: {email},
            attributes: {exclude: ['password']}
        })
    }
}
