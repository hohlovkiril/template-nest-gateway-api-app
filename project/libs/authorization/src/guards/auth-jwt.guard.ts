import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@libs/common/decorators';

@Injectable()
export class AuthJwtGuard implements CanActivate {
  private readonly logger: Logger = new Logger(AuthJwtGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const req: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);

    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      req['user'] = await this.jwtService.verify(token);
    } else if (!isPublic) {
      throw new ForbiddenException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
