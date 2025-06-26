export interface Response<T> {
  errorCode: number;
  errorMessage: string;
  response: T;
}