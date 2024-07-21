import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost() {
    return this.postsService.createPost();
  }

  @Get()
  retrieveAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  retrievePostById() {
    return this.postsService.getPostById();
  }

  @Put(':id')
  updatePost() {
    return this.postsService.updatePost();
  }

  @Delete(':id')
  deletePost() {
    return this.postsService.deletePost();
  }
}
