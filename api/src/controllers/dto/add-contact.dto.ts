import { IsString, IsEmail, IsOptional } from 'class-validator'

export class AddContactDTO {
    @IsString()
    name: string

    @IsString()
    phone: string

    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    picture?: string
}