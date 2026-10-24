export interface HscrollFetchUserDataType {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  image: string;
}

export interface HscrollFetchUserApiType<T> {
  total: number;
  skip: number;
  limit: number;
  users: T[];
}
