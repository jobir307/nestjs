import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class AuthResponseDto {
    @IsString()
    firstName: string

    @IsString()
    email: string

    @IsString()
    username: string

    @IsString()
    password: string

    @IsString()
    token: string
}


export class UserLoginDto {
    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    password: string
}

