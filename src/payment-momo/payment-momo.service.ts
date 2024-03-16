import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PaymentRequest, PaymentRespone } from './entities/payment-momo.entity';
import NodeRSA from 'node-rsa';
@Injectable()
export class PaymentMomoService {
  async paymentHandle(request: PaymentRequest): Promise<PaymentRespone | string> {
    const PUBKEY = '-----BEGIN PUBLIC KEY-----'+
    'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAiBIo9EMTElPppPejirL1'+
    'cdgCuZUoBzGZF3SyrTp+xdMnIXSOiFYG+zHmI1lFzoEbEd1JwXAUV52gn/oAkUo+'+
    '2qwuqZAPdkm714tiyjvxXE/0WYLl8X1K8uCSK47u26CnOLgNB6iW1m9jog00i9XV'+
    '/AmKI1U8OioLFSp1BwMf3O+jA9uuRfj1Lv5Q0Q7RMtk4tgV924+D8mY/y3otBp5b'+
    '+zX0NrWkRqwgPly6NeXN5LwqRj0LwAEVVwGbpl6V2cztYv94ZHjGzNziFJli2D0V'+
    'pb/HRPP6ibXvllgbL4UXU4Izqhxml8gwd74jXaNaEgNJGhjjeUXR1sAm7Mpjqqgy'+
    'xpx6B2+GpjWtEwvbJuO8DsmQNsm+bJZhw46uf9AuY5VSYy2cAF1XMXSAPNLqYEE8'+
    'oVUki4IWYOEWSNXcQwikJC25rAErbyst/0i8RN4yqgiO/xVA1J1vdmRQTvGMXPGb'+
    'DFpVca4MkHHLrkdC3Z3CzgMkbIqnpaDYoIHZywraHWA7Zh5fDt/t7FzX69nbGg8i'+
    '4QFLzIm/2RDPePJTY2R24w1iVO5RhEbKEaTBMuibp4UJH+nEQ1p6CNdHvGvWz8S0'+
    'izfiZmYIddaPatQTxYRq4rSsE/+2L+9RE9HMqAhQVvehRGWWiGSY1U4lWVeTGq2s'+
    'uCNcMZdgDMbbIaSEJJRQTksCAwEAAQ=='+
    '-----END PUBLIC KEY-----';
      
    try {
      const { amount, ...request_payment } = { ...request }

      const jsonData = {
        partnerCode: request_payment.partnerCode,
        partnerRefId: request_payment.partnerRefId,
        amount
      }
      console.log('jsonData', jsonData);
      console.log('request_payment', request_payment);

      const key = new NodeRSA(PUBKEY,'pkcs8-public', {encryptionScheme: 'pkcs1'});
      console.log('key: ', key);
      const encrypted = key.encrypt(JSON.stringify(jsonData), 'base64');
      console.log('encrypted: ', encrypted);

      request_payment.hash=encrypted;
      const respone: PaymentRespone = await axios.post(`${process.env.URL_MOMO}/pay/app`, request_payment)
      console.log('responePayment', respone);
      return respone.message
    } catch (error) {
      console.log('error', error);

      return error
    }

  }
}
