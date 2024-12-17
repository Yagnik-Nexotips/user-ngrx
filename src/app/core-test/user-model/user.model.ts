export interface userData {
  id?: string;
  name: string;
  username: string;
  email: string;
  mobile: string;
  address: string;
  confirmPassword: string;
  password: string;
  role: string;
}

export enum Type {
  Admin = '1',
  Customer = '2',
  Guest = '3',
}
