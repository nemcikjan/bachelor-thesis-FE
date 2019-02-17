export interface JwtTokenModel {
  name: string;
  password: string;
  iat: number | Date;
  exp: number | Date;
}
