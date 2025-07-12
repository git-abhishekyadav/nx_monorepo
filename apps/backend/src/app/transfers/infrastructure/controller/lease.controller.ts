import { Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ImportLeasesFromHorsesCommand } from '../../application/commands/importLeasesFromHorses/importLeasesFromHorses.command';

@Controller('leases')
export class LeaseController {

  constructor(
    private commandBus: CommandBus
  ) {}

  @Post('runImportScript')
  async runImportScript() {
    return this.commandBus.execute(
      new ImportLeasesFromHorsesCommand()
    );
  }

}
