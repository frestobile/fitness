/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

 LOGIN_ENDPOINT = 'api/auth/login';
 REFRESH_TOKEN_ENDPOINT = 'api/auth/refresh';
 REGISTER_ENDPOINT = 'api/auth/requester';
 FORGOT_PWD_ENDPOINT = 'api/auth/forget-password';
 RESET_PWD_ENDPOINT = 'api/auth/reset-password';
 UPDATE_PWD_ENDPOINT = 'api/auth/updatePassword';
 USER_PROFILE_ENDPOINT = 'api/user/profil';
 USERS_ENDPOINT = 'api/users';
 BE_PROVIDER_ENDPOINT = 'api/auth/provider';

 //Admin end points
 LIST_PROVIDERS_ENDPOINT = 'api/manager/provider/get_by_country';
 LIST_COUNTRIES_ENDPOINT = 'api/countries/find_all_countries';
 ACCEPT_PROVIDER_ENDPOINT = 'api/admin/account/accept_as_provider';

 //Service end points
 REQUEST_SERVICE_ENDPOINT = 'api/requester/service/add';
 REQUEST_RENTAL_SERV_ENDPOINT = 'api/requester/rental_service/add';
 GET_SERVICE_ENDPOINT = 'api/requester/service/one';
 LIST_SERVICE_ENDPOINT = 'api/requester/service/list'; //for user
 ACCEPT_PRICE_ENDPOINT = 'api/requester/service/transaction/accept_price';
 UPDATE_PRICE_ENDPOINT = 'api/requester/service/transaction/update_price';

 //Notifications
 readonly NOTIF_USER_ENDPOINT = 'api/notifications/find_by_user_id'; //for user

 //Payment
 readonly URL_INIT_PAYMENT = 'api/requester/service/make_paiement';
 readonly URL_CHECK_PAYMENT = 'api/requester/service/check_paiement';
 readonly URL_CANCEL_PAYMENT = 'api/requester/service/cancel_paiement';
 readonly URL_BILL_PAYMENT = 'api/requester/service/transaction/send_bill';

  constructor() { }
}
