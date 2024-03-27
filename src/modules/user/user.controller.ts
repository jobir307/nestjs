import { Body, Controller, Delete, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    /* 
    createUser(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto)
    } 
    */

    @ApiTags('User')
    @UseGuards(JwtAuthGuard)
    @Patch()
    updateUser(@Body() updateUserDto: UpdateUserDto, @Req() request): Promise<UpdateUserDto> {
        const user = request.user
        return this.userService.updateUser(user.email, updateUserDto)
    }

    @ApiTags('User')
    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteUser(@Req() request){
        const user = request.user
        return this.userService.deleteUser(user.email)
    }
}
