import { HttpStatus, UnprocessableEntityException, ValidationError, ValidationPipeOptions } from '@nestjs/common';

function generateErrors(errors: ValidationError[]) {
    return errors.reduce(
        (accumulator, currentValue) => ({
            ...accumulator,
            [currentValue.property]:
                (currentValue.children?.length ?? 0) > 0
                    ? generateErrors(currentValue.children ?? [])
                    : Object.values(currentValue.constraints ?? {}).join(', '),
        }),
        {},
    );
}

const validationOptions: ValidationPipeOptions = {
    transform: true, // serve para transformar os dados para o tipo correto
    whitelist: true, // serve para remover campos que não estão no DTO
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, //
    exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: generateErrors(errors),
        });
    },
};

export default validationOptions;
