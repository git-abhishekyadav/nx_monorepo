import { ValueObject } from "../../../core/domain/model/value-object";

const IdGenerator = require('auth0-id-generator');

interface Props {
  value: string
}


export class LeaseGuid extends ValueObject<Props>{

  public static generate(): LeaseGuid {
    const generator = new IdGenerator({len: 20, prefix: 'lease'});
    const id = generator.get();
    return new LeaseGuid({value: id});
  }

  public static fromString(id: string) {
    return new LeaseGuid({value: id});
  }

  public toString() {
    return this.props.value;
  }

}
