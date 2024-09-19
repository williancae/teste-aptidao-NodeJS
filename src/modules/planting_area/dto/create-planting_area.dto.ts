import { ApiProperty } from '@nestjs/swagger';
import {
    IsInt,
    IsNumber,
    Validate,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isAreaValid', async: false })
class IsAreaValid implements ValidatorConstraintInterface {
    validate(totalArea: any, args: ValidationArguments) {
        const obj = args.object as any;
        return obj.cultivableArea + obj.vegetationArea <= totalArea;
    }

    defaultMessage() {
        return 'A soma de área cultivável e vegetação não deverá ser maior que a área total da fazenda';
    }
}

export class CreatePlantingAreaDto {
    @ApiProperty({
        example: 100,
        description: 'Neste campo deve ser informado a área total do plantio em hectares',
    })
    @IsNumber()
    @Validate(IsAreaValid)
    totalArea: number;

    @ApiProperty({
        example: 50,
        description: 'Neste campo deve ser informado a área cultivável do plantio em hectares',
    })
    @IsNumber()
    cultivableArea: number;

    @ApiProperty({
        example: 50,
        description: 'Neste campo deve ser informado a área de vegetação do plantio em hectares',
    })
    @IsNumber()
    vegetationArea: number;

    @ApiProperty({
        example: 1,
        description: 'Neste campo deve ser informado o id da semente',
    })
    @IsInt()
    seedId: number;

    @ApiProperty({
        example: 1,
        description: 'Neste campo deve ser informado o id do produtor rural',
    })
    @IsInt()
    ruralProducerId: number;
}
