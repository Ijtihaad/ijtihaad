import { NestFactory } from '@nestjs/core';
import { PostsModule } from './posts.module';

async function bootstrap() {
  const posts = await NestFactory.create(PostsModule);
  await posts.listen(3000);
}
bootstrap();
