import { IsBoolean, isBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    title: string;

    @IsString()
    author: string;

    @IsString()
    isbn: string;

    @IsNumber()
    publishYear: number;


}