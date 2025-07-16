import { ValueObject } from "../../../core/domain/model/value-object";

interface Props {
  value: string
}

enum TransferOrLeaseTypeEnum {
  transfer = 'T',
  lease = 'L'
}

export class TransferOrLeaseType extends ValueObject<Props> {
  public static readonly Transfer = new TransferOrLeaseType({ value: TransferOrLeaseTypeEnum.transfer });
  public static readonly Lease = new TransferOrLeaseType({ value: TransferOrLeaseTypeEnum.lease });

  public static readonly All = [
    TransferOrLeaseType.Transfer,
    TransferOrLeaseType.Lease
  ];

  public static fromString(value: string): TransferOrLeaseType {
    if (value.length === 0) {
      throw new Error('TransferOrLeaseType cannot be empty');
    }
    if (!this.isValid(value)) {
      throw new Error('TransferOrLeaseType not valid value');
    }

    return new TransferOrLeaseType({ value });
  }

  public static isValid(name: string): boolean {
    return TransferOrLeaseType.All.some(t => t.value === name);
  }

  get value(): string {
    return this.props.value;
  }

  toString() {
    return this.value;
  }

  equals(toCompare: TransferOrLeaseType): boolean {
    return this.props.value === toCompare.value;
  }

}