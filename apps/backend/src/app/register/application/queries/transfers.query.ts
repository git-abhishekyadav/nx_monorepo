export class TransfersQuery {
  constructor(
    public readonly horseId: string,
    public readonly fromDate: string,
    public readonly toDate: string
  ) {}
}
