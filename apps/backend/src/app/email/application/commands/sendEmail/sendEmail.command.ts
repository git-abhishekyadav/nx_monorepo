export class SendEmailCommand {
  constructor(
    public readonly type: string,
    public readonly email: string,
    public readonly substitutions: {[key: string]: string},
    public readonly sendAttachment?: boolean,
    public readonly filePublicUrl?: string,
    public readonly emailAttachments?: any[],
    public readonly cronId?: string,
  ) {}
}