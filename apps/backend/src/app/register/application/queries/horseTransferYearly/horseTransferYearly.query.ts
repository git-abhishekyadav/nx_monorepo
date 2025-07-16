export class HorseTransferYearlyQuery {
    constructor(
        public readonly horseId: string,
        public readonly fromDate?: string,
        public readonly toDate?:string,
        public readonly index ?: number,
        public readonly limit ?: number
    ) {}
}