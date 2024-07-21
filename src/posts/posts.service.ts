import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Post } from './entity/post.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostsService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createPost(data: CreatePostDto): Promise<PostDto> {
    const post = await this.prisma.post.create({ data });
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      userId: post.userId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }

  async getAllPosts(): Promise<PostDto[]> {
    const posts = await this.prisma.post.findMany();
    return posts.map((post: Post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      userId: post.userId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));
  }

  async getPostById(id: number): Promise<PostDto | null> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      return null;
    }
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      userId: post.userId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }

  async updatePost(id: number, data: UpdatePostDto): Promise<PostDto> {
    const post = await this.prisma.post.update({ where: { id }, data });
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      userId: post.userId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }

  async deletePost(id: number): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }
}
