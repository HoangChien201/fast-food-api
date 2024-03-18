import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentZaloDto } from './create-payment-zalo.dto';

export class UpdatePaymentZaloDto extends PartialType(CreatePaymentZaloDto) {}
