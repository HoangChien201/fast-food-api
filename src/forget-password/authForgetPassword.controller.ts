import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthForgetPasswordService } from './authForgetPassword.service';
import { AuthForgetPassword } from './authForgetPassword.guard';

@Controller('password')
export class AuthForgetPasswordController {
    constructor(private authForgetPasswordService:AuthForgetPasswordService){}

    @HttpCode(HttpStatus.OK)
    @Post('forget-password')
    async forgetPassword(@Body() body:Record<string,any> ){
        return this.authForgetPasswordService.forgetPassword(body.email);
    }

    @UseGuards(AuthForgetPassword)
    @Post('validate-otp')
    async validateOTP(@Request() req){
        return req.user;
    }
    
}
