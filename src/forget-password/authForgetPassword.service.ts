import { Injectable,UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AuthForgetPasswordService {
    constructor(
        private userService:UserService,
        private jwtService:JwtService,
        private readonly mailerService: MailerService
    ){}


    async forgetPassword(email:string):Promise<any>{
        const user= await this.userService.findUserByEmail(email)
        if(!user){
            throw new UnauthorizedException;
        }

        const payload={
            id_user:user.id,
            email:email,
            token:'',
        }
        const otpCreate=Math.floor(Math.random()*(600000-100000)+100000)
        this.mailerService
        .sendMail({
          to: 'hoangchien11522@gmail.com', // list of receivers
          from: 'appdeliveryfood@gmail.com', // sender address
          subject: 'Forget Password', // Subject line
          text: 'welcome', // plaintext body
          html: `
          <tbody>
            <tr>
            <td bgcolor="#0071ba" style="border-radius:0 0 10px 10px">
            <table cellpadding="0" cellspacing="0" width="100%">
            <tbody><tr>
            <td bgcolor="#ffffff" style="border-radius:6px">
            <table cellpadding="0" cellspacing="0" width="100%">
            <tbody><tr>
            <td>
            <table align="left" style="width:100%;margin-bottom:40px;padding:0px 40px 0px 40px;font:500 18px/24px Arial,Helvetica,sans-serif,Fira">
            <tbody><tr align="center">
            <td>
            <img alt="Verify-email" src="https://ci3.googleusercontent.com/meips/ADKq_NbstJ_jULet7Em19glPign1wg_8tWdLtbIDiQXMkD9pbjkILr1XU_I9vaWS_EqVOazvgL1Wolbr7MU7f9boJM3s4eFEeQcfe2nyYdZKMTgigmfY-BmWL_Vc1cFWwXEEV7UzpvkfbUP6jukfBkXRfR37BmDCEw=s0-d-e1-ft#https://cloudinary-res.cloudinary.com/image/upload/c_scale,dpr_2,w_131/v1/mail/verify-email.png" style="padding-top:42px;padding-bottom:42px" width="131" class="CToWUd" data-bit="iit">
            </td>
            </tr>
            <tr>
            <td style="font-size:16px;line-height:33px">
            Hi Chiến,
            </td>
            </tr>
            <tr>
            <td style="font-size:14px;line-height:33px">
            Here's the confirmation code you requested:
            </td>
            </tr>
            <tr>
            <td style="font-size:28px;line-height:33px;font-weight:bold">
            ${otpCreate}
            </td>
            </tr>
            <tr><td style="font-size:14px;line-height:33px">
            If you didn't request this, you can ignore this email or let us know.
            </td>
            </tr><tr>
            <td>
            <br>
            Thanks,
            </td>
            </tr>
            <tr>
            <td style="font-size:14px;line-height:33px">
            The App Delivery Team
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            
            <tr>
            <td style="padding:32px 40px">
            <table cellpadding="0" cellspacing="0" width="100%">
          <tbody><tr>
          <td align="center" style="padding:0 0 22px">
          <a href="https://cloudinary.com" style="text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://cloudinary.com&amp;source=gmail&amp;ust=1701625788625000&amp;usg=AOvVaw2iwv4cb4xAFED11T0Ynvp8">`, // HTML body content
        })
        .then(() => {
            console.log("send email success");
            
        })
        .catch((error) => {
            console.log("send email fail",error);

        });

        const token= await this.jwtService.signAsync({...payload,otp:otpCreate});
        payload.token=token;
        return payload;
    }
}
