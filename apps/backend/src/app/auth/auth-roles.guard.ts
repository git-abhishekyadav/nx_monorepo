import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthRolesGuard implements CanActivate {
  constructor(@Inject('JwtService') private jwtService?: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-access-token'];

    if(!token) {
      request.token = null;
      return true;
    }

    try {
      const decoded = this.jwtService.verify(token);
      //This injects the decoded token to the following request
      request.token = decoded;
      return true;
    } catch (err) {
      return true;
    }
  }

}
