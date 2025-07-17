import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RegisterAccountCommand } from "./registerAccount.command";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Asset } from '../../../../schemas/asset.schema';
import { v4 as uuidv4 } from 'uuid';


@CommandHandler(RegisterAccountCommand)
export class RegisterAccountHandler implements ICommandHandler<RegisterAccountCommand> {
  
  constructor(
    @InjectModel(Asset.name) private assetModel: Model<Asset>,
  ) {}
  
  async execute(command: RegisterAccountCommand): Promise<any> {
    const { email, password } = command;

    // Here you would typically save the account to the database
    // For example:
    const newAccount = new this.assetModel({
       guid:  uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      email,
      password,
      // other fields as necessary
    });

    await newAccount.save();

    // Return the newly created account or any relevant information
    return {
      message: 'Account registered successfully',
      account: newAccount,
    };
  }

}