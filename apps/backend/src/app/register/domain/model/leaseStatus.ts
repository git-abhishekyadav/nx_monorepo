import { ValueObject } from "../../../core/domain/model/value-object";

interface Props {
  value: string
}

enum Statuses {
  complete = 'Complete',
  review = 'Review',
}

export class LeaseStatus extends ValueObject<Props> {
  public static readonly Complete = new LeaseStatus({ value: Statuses.complete });
  public static readonly Review = new LeaseStatus({ value: Statuses.review });

  public static readonly All = [
    LeaseStatus.Complete,
    LeaseStatus.Review
  ];

  public static fromString(value: string): LeaseStatus {
    if (value.length === 0) {
      throw new Error('LeaseStatus cannot be empty');
    }
    if (!this.isValid(value)) {
      throw new Error('LeaseStatus not valid value');
    }

    return new LeaseStatus({ value });
  }

  public static isValid(name: string): boolean {
    return LeaseStatus.All.some(t => t.value === name);
  }

  get value(): string {
    return this.props.value;
  }

  toString() {
    return this.value;
  }

  equals(toCompare: LeaseStatus): boolean {
    return this.props.value === toCompare.value;
  }

}