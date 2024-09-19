import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Validate } from 'class-validator';

export class CreateRuralProducerDto {
    @ApiProperty({
        example: '12345678901',
        description: 'Neste campo deve ser informado o número do documento do produtor rural',
    })
    @IsString()
    @Transform((value) => {
        // Remover caracteres não numéricos
        return value.value.replace(/\D/g, '');
    })
    documentNumber: string;

    @ApiProperty({
        example: 'Willian Caetano',
        description: 'Neste campo deve ser informado o nome do produtor rural',
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'Fazenda Jacaré',
        description: 'Neste campo deve ser informado o nome da fazenda do produtor rural',
    })
    @IsString()
    farmName: string;

    @ApiProperty({
        example: 'Campinorte',
        description: 'Neste campo deve ser informado a cidade do produtor rural',
    })
    @IsString()
    city: string;

    @ApiProperty({
        example: 'GO',
        description: 'Neste campo deve ser informado o estado do produtor rural',
    })
    @Validate((value) => value.length === 2, {
        message: 'O estado deve conter 2 caracteres. Exemplo: SP',
    })
    @IsString()
    state: string;
}
