import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtStrategy: JwtStrategy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      return false;
    }
    const payload = await this.jwtStrategy.validate(token);
    if (!payload) {
      return false;
    }
    request.user = payload;
    return true;
  }
}
