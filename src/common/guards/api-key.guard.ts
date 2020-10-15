import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '../decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(':Guard:');
    const isPublic = this.reflector.get(PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    return authHeader === `Bearer ${this.configService.get('API_KEY')}`;
  }
}
