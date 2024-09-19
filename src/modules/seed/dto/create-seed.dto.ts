import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSeedDto {
    @ApiProperty({
        example: 'Milho',
        description: 'Neste campo deve ser informado o nome da semente',
    })
    @IsNotEmpty()
    @IsString()
    name: string;
}
