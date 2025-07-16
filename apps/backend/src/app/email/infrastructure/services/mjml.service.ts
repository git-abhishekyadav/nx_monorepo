import { Injectable } from "@nestjs/common";
import mjml2html from 'mjml';
import { EmailTemplate } from "../../domain/model/EmailTemplate";


@Injectable()
export class MjmlService {

  convertMjmlToHtml(code: string, options?: any) {
    try {
      const html = mjml2html(code, options);
      return html;
    } catch(err) {
      console.error(err);
      throw new Error(err);
    }
  }

  replaceAndSubstitute(emailTemplate: EmailTemplate, substitutions: {[key:string]: string}, mjmlTemplate: string): string {
    mjmlTemplate = this.replaceContent(emailTemplate.getContent(), mjmlTemplate);
    mjmlTemplate = this.replaceFooter(emailTemplate.getFooter(), mjmlTemplate);
    mjmlTemplate = this.replaceSubstitutions(substitutions, mjmlTemplate);
    return mjmlTemplate;
  }

  replaceContent(content: string, template: string) {
    return template.replace('{{content}}', content);
  }

  replaceFooter(footer: string, template: string) {
    return template.replace('{{footer}}', footer);
  }

  replaceSubstitutions(substitutions: {[key: string]: string}, template: string) {

    for (const [key, value] of Object.entries(substitutions)) {
      template = template.replace(`{{${key}}}`, value);
    }

    return template;
  }

}