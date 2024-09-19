import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllConfigType } from './config/config.type';
import { ResolvePromisesInterceptor } from './utils/serializer.interceptor';
import validationOptions from './utils/validation-options';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const configService = app.get(ConfigService<AllConfigType>);

    app.enableCors();

    app.useGlobalPipes(new ValidationPipe(validationOptions));
    app.useGlobalInterceptors(new ResolvePromisesInterceptor(), new ClassSerializerInterceptor(app.get(Reflector)));

    const options = new DocumentBuilder()
        .setTitle(configService.get('app.name', { infer: true }))
        .setDescription('API docs')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

    await app.listen(configService.get('app.port', { infer: true }));
}
bootstrap();
