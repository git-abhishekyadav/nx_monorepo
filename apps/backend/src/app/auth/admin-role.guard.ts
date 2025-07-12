// import { Roles } from '@halo/showday-interface';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminRoleGuard implements CanActivate {

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.token) {
      return false;
    }
    return request.token?.user?.role === 'Association';
  }
}
