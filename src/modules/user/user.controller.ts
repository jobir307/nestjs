import { Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    createUser(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto)
    }
}
