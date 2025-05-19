import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  app.set('trust proxy', true);
  app.enableCors({ methods: ['GET', 'POST'] }); // 보안 점검으로 인한 DELETE, PUT 삭제
  await app.listen(port);
}

bootstrap().catch(console.error);
