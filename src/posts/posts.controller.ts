import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(@Body() data: CreatePostDto): Promise<PostDto> {
    return await this.postsService.createPost(data);
  }

  @Get()
  async retrieveAllPosts(): Promise<PostDto[]> {
    return await this.postsService.getAllPosts();
  }

  @Get(':id')
  async retrievePostById(@Param('id') id: number): Promise<PostDto> {
    return await this.postsService.getPostById(id);
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() data: UpdatePostDto,
  ): Promise<PostDto> {
    return await this.postsService.updatePost(id, data);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number): Promise<void> {
    return await this.postsService.deletePost(id);
  }
}
