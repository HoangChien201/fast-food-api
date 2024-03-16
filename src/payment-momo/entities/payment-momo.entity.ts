export class PaymentRequest {
    partnerCode:string;
    partnerRefId:string;
    customerNumber:string;
    appData:string;
    hash:string;
    version:number;
    payType:number;
    amount:number;
    description:string;
}

export class PaymentRespone {
    status:number;
    message:string;
    transid:string;
    amount:number;
    signature:string;
}
