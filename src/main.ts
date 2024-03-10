import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import * as YAML from 'yaml';
import { SwaggerModule } from '@nestjs/swagger';

dotenv.config();
const PORTnest = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const fileSchema = await readFile('./doc/api.yaml', 'utf8');
  const docSchema = YAML.parse(fileSchema);
  SwaggerModule.setup('doc', app, docSchema);
  await app.listen(PORTnest);
}
bootstrap();
