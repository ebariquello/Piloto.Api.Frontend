// import { BasicResultModel } from 'app/shared/models/base.model';
// import { UserModel } from './user.model';

//export class User extends BasicResultModel<LoginModel> {}

//export class UserInformation extends BasicResultModel<UserInformationModel> {}

export class LoginModel {
  success?: boolean;
  token?: string;
}
