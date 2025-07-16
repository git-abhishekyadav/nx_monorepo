import { AggregateRoot } from "@nestjs/cqrs";

interface Props {
  type: string;
  content: string;
  footer: string;
  subject: string;
}

export class EmailTemplate extends AggregateRoot {

  private constructor(private props: Props) {
    super();
  }

  public static create(props: Props): EmailTemplate {
    return new EmailTemplate(props);
  }

  getType(): string {
    return this.props.type;
  }

  getContent(): string {
    return this.props.content;
  }

  getFooter(): string {
    return this.props.footer;
  }

  getSubject(): string {
    return this.props.subject;
  }

}