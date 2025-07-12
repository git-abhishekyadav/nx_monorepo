// import { UserMinimalInfo, UserSession } from "@halo/showday-interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {

  public getAccountIdAndName(token: {user: any}): any {
    return {
      id: token.user.account._id,
      name: token.user.account.email
    }
  }

}