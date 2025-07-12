export class ShowProducerAccessEmailEvent {
  constructor(
    public readonly email: string,
    public readonly extraData: any,
    public readonly emailTemplateName?: string,
  ) {}
}
