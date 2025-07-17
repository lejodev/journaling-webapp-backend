import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtHelper {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: any) {
    try {
      const token = this.jwtService.sign(payload, {
        secret: 'temporarySecret',
      });
      console.log('JWT Token: ', token);
      return token;
    } catch (error) {
      console.log(error);
      throw new Error('Token error');
    }
  }
}
