import { Injectable } from '@nestjs/common';
import { CreatePaymentZaloDto } from './dto/create-payment-zalo.dto';
import { UpdatePaymentZaloDto } from './dto/update-payment-zalo.dto';
import CryptoJS from 'crypto-js';
import axios from 'axios';

@Injectable()
export class PaymentZaloService {
  async createOrder(createPaymentZaloDto: CreatePaymentZaloDto) {
    const {app_user,amount,embed_data,item,description}={...createPaymentZaloDto}
    let todayDate=new Date().toISOString().slice(2, 10);
    todayDate=todayDate.split('-').join('')
    let timeCurrent=new Date().getTime()

    const apptransid= `${todayDate}_${timeCurrent}`
    const apptime=timeCurrent
    const hmacInput = process.env.APPID_ZALOPAY + "|" + apptransid + "|" + app_user + "|" + amount + "|" + apptime + "|" + embed_data + "|" + item
    const mac = CryptoJS.HmacSHA256(hmacInput, process.env.KEY1_ZALOPAY)

    const order={
      'app_id': parseInt(process.env.APPID_ZALOPAY),
      'app_user': app_user,
      'app_time': apptime,
      'amount': amount,
      'app_trans_id': apptransid,
      'embed_data': embed_data,
      'item': item,
      'description': description,
      'mac': mac.toString(),
    }
    
    const respone= await axios({
      method:'post',
      url:'https://sb-openapi.zalopay.vn/v2/create',
      data:order
    })

    return respone.data;
  }
}
