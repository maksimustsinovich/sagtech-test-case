import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  async updatePost(
    @Param('id') id: number,
    @Body() data: UpdatePostDto,
  ): Promise<PostDto> {
    return await this.postsService.updatePost(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deletePost(@Param('id') id: number): Promise<void> {
    return await this.postsService.deletePost(id);
  }
}
