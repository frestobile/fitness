
export interface ICredential {
  email?: string;
  phone?: string;
  password?: string;
  repeat_password?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
 }

export interface EmptyMessage{
  text: string;
  txtButton?: string;
}