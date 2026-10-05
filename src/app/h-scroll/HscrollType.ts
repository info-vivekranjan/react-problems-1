export interface UserApiRes<T> {
  limit: number;
  skip: number;
  total: number;
  users: T[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  image: string;
}
