import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/rule.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const filteredRoles = requiredRoles.some(
      (role: number) => role <= user.role,
    );

    return filteredRoles;
  }
}
