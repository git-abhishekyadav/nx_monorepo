import { ValueObject } from "../../../core/domain/model/value-object";

const IdGenerator = require('auth0-id-generator');

interface Props {
  value: string
}


export class TransferGuid extends ValueObject<Props>{

  public static generate(): TransferGuid {
    const generator = new IdGenerator({len: 20, prefix: 'transfer'});
    const id = generator.get();
    return new TransferGuid({value: id});
  }

  public static fromString(id: string) {
    return new TransferGuid({value: id});
  }

  public toString() {
    return this.props.value;
  }

}