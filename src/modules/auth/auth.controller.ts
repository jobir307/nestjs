import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto';
import { UserLoginDto } from './dto/userLogin';
import { TokenService } from '../token/token.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly tokenService: TokenService
    ) {}
    
    @ApiTags('Auth')
    // @ApiResponse({status: 201, type: CreateUserDto})
    @Post('register')
    register(@Body() dto: CreateUserDto) {
        return this.authService.registerUser(dto)
    }

    @ApiTags('Auth')
    @Post('login')
    login(@Body() dto: UserLoginDto) {
        return this.authService.loginUser(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('test')
    test() {
        return true
    }
}
