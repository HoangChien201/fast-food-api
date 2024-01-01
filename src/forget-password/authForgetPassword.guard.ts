import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constant";
import { Request } from 'express';
import { log } from "console";
@Injectable()
export class AuthForgetPassword implements CanActivate{
    constructor(private jwtService: JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        
        const result = this.extractFromHeader(request);
        if (!result.token) {
          throw new UnauthorizedException();
        }
        try {
            
            const payload = await this.jwtService.verifyAsync(
              result.token,
                {
                    secret: jwtConstants.SECRET_FORGET_PASSWORD
                }
                );
          // 💡 We're assigning the payload to the request object here
          // so that we can access it in our route handlers
            if(result.otp.toString() === payload.otp.toString()){
                request['user']=payload
                return true;
            }
        } catch {
          throw new UnauthorizedException();
        }
        return false;
      }

    private extractFromHeader(request: Request):{token:string,otp:string} | undefined{      
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return {
          token:type === 'Bearer' ? token : undefined,
          otp:request.body.otp ? request.body.otp : undefined
        }
    }
}