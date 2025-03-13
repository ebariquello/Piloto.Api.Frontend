import {
  convertToComma,
  convertToCurrency,
} from 'app/core/helpers/model.helper';
import { BasicResultModel } from 'app/shared/models/base.model';

export interface ProductModel {
  id?: number;
  name?: string;
  stock?: number;
  price?: number;
  productSuppliers?: ProductSupplierModel[];
  actionIndex?: number;
}

export class FormCreateEditProductModel {
  name?: string;
  stock?: number;
  price?: number;
}

export interface ProductSupplierModel {
  id?: number;
  productid?: number;
  supplierid?: number;
  product?: ProductModel;
  supplier?: SupplierModel;
}
export interface SupplierModel {
  id?: number;
  name?: string;
  cnpj?: string;
}
