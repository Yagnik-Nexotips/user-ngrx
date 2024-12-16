export interface user {
  // id: number;
  // name: string;
  // username: string;
  // email: string;
  // mobile: number;
  // address: string;
  // userType: number;
  status: 'SUCCESS';
  message: 'Your request is successfully executed';
  data: {
    id: number;
    name: string;
    username: string;
    email: string;
    mobile: number;
    address: string;
    userType: String;
  };
}

export interface userData {
  id: string;
  name: string;
  username: string;
  email: string;
  mobile: string;
  address: string;
  userType: any;
}

export enum Roles {
  superUser = 1,
  user = 2,
  organization = 3,
  team = 4,
  sponsor = 5,
  player = 6,
}