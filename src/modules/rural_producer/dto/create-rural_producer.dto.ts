import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Validate, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'isDocumentValid', async: false })
class IsDocumentValid implements ValidatorConstraintInterface {
    validate(documentNumber: string) {
        return cpf.isValid(documentNumber) || cnpj.isValid(documentNumber);
    }

    defaultMessage() {
        return 'O documento informado é inválido';
    }
}

export class CreateRuralProducerDto {
    @ApiProperty({
        example: '12345678901',
        description: 'Neste campo deve ser informado o número do documento do produtor rural',
    })
    @IsString()
    @Validate(IsDocumentValid)
    @Transform((value) => {
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
