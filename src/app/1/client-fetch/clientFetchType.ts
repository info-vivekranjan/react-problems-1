export interface UsersDataType {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
}

export interface UsersApiResp<T> {
  total: number;
  skip: number;
  limit: number;
  users: T[];
}
