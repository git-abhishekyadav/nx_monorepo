import { ValueObject } from "../../../core/domain/model/value-object";

interface Props {
  value: string
}

enum Types {
  breeding = 'Breeding Lease',
  show = 'Show Lease',
}

export class LeaseType extends ValueObject<Props> {
  public static readonly Breeding = new LeaseType({ value: Types.breeding });
  public static readonly Show = new LeaseType({ value: Types.show });

  public static readonly All = [
    LeaseType.Breeding,
    LeaseType.Show
  ];

  public static fromString(value: string): LeaseType {
    if (value.length === 0) {
      throw new Error('LeaseType cannot be empty');
    }
    if (!this.isValid(value)) {
      throw new Error('LeaseType not valid value');
    }

    return new LeaseType({ value });
  }

  public static isValid(name: string): boolean {
    return LeaseType.All.some(t => t.value === name);
  }

  get value(): string {
    return this.props.value;
  }

  toString() {
    return this.value;
  }

  equals(toCompare: LeaseType): boolean {
    return this.props.value === toCompare.value;
  }

}