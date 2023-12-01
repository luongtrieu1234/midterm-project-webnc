export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  SIGNUP_CONFIRMATION = 'signup_confirmation',
  RESET_PASSWORD = 'reset_password',
}

export type ResetPasswordPayload = {
  tokenType: TokenType.RESET_PASSWORD;
  id: string;
  email: string;
  iat?: Date;
};

export type AccessTokenPayload = {
  tokenType: TokenType.ACCESS_TOKEN;
  id: string;
  email: string;
  iat?: Date;
};

export type SignupConfirmationPayload = {
  tokenType: TokenType.SIGNUP_CONFIRMATION;
  id: string;
  iat?: Date;
};

export type JwtPayload = AccessTokenPayload | SignupConfirmationPayload | ResetPasswordPayload;
