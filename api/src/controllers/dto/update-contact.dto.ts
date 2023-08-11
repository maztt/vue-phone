import { IsString, IsEmail, IsOptional } from 'class-validator'

export class UpdateContactDTO {
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    phone: string

    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    picture: string
}