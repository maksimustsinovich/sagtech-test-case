import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  controllers: [PostsController],
  providers: [PostsService, JwtStrategy],
})
export class PostsModule {}
