import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class MiddlewareService {
  allowedRoles(role: string) {
    if (role == 'client' || role == 'talent') {
      return true;
    } else {
      throw new BadRequestException({
        statusCode: 403,
        message: 'This role is not allowed. (Only client Or talent)',
      });
    }
  }

  checkRole(accessRole: Array<string>, passedRole: string) {
    if (!accessRole.includes(passedRole)) {
      throw new BadRequestException({
        statusCode: 403,
        message: 'Forbidden resource, this user can not access it.',
      });
    }
    return true;
  }
}
