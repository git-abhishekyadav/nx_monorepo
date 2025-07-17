import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterAccountCommand } from "../../application/commands/registerAccount/registerAccount.command";

@Controller('register')
export class RegisterController {
  constructor(
    private commandBus: CommandBus
  ) {}

  @Post()
  async registerMember(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    console.log('Registering member with email:', email);
    return this.commandBus.execute(
      new RegisterAccountCommand(email, password)
    );
  }

}
