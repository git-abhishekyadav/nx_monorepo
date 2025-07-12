
export interface RequestWithToken extends Request {
  token: {user: any};
}
