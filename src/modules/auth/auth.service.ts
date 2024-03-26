import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto';
import { AppError } from 'src/common/errors';
import { UserLoginDto } from './dto/userLogin';
import * as bcrypt from 'bcrypt'
import { AuthResponseDto } from './dto/authUserResponse';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ){}

    async registerUser(dto: CreateUserDto): Promise<CreateUserDto> {
        const existUser = await this.userService.findUserByEmail(dto.email)
        if (existUser) throw new BadRequestException(AppError.USER_EXIST)
        return this.userService.createUser(dto)
    }

    async loginUser(dto: UserLoginDto): Promise<AuthResponseDto> {
        const existUser = await this.userService.findUserByEmail(dto.email)
        if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST)
        
        const validatePassword = await bcrypt.compare(dto.password, existUser.password)
        if (!validatePassword) throw new BadRequestException(AppError.WRONG_PASSWORD)
        
        const token = await this.tokenService.generateJwtToken(dto.email)
        const user = await this.userService.publicUser(dto.email)
        return {...user, token}
    } 
}
