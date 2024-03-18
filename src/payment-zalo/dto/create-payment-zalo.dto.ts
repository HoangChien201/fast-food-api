export class CreatePaymentZaloDto {
    app_id: number;
    app_user: string;
    app_time: number;
    amount: number;
    app_trans_id: string; //Mã giao dịch của đơn hàng. Mã giao dịch phải bắt đầu theo format yymmdd của ngày hiện tại và nên theo format yymmddMã đơn hàng thanh toán
    bank_code: number;
    embed_data: string;
    item: string;
    callback_url:string;
    description: string;
    mac: string;
    device_info:string;
    sub_app_id:string;
    title:string;
    currency:string;
    phone:string;
    email:string;
    address:string;
}
