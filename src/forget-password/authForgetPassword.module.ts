import { Module } from '@nestjs/common';
import { AuthForgetPasswordController } from './authForgetPassword.controller';
import { AuthForgetPasswordService } from './authForgetPassword.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.SECRET_FORGET_PASSWORD,
      signOptions: { expiresIn: '60s' },
    }),
    MailerModule.forRoot({
      transport: {
        host:'smtp.gmail.com',
        auth:{
          user:'hoangchien220401@gmail.com',
          pass:'cikayheijkfhuhtv'
        }
      } 

    }),
  ],
  controllers: [AuthForgetPasswordController],
  providers: [AuthForgetPasswordService]
})
export class AuthForgetPasswordhModule { }
