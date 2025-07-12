const HORSE_REGISTRATION_NUMBER_LENGTH = 8;

export class HorseRegistrationNumber {

  private _id: string;

  private constructor(id: string) {
    this._id = id;
  }

  public static create(id: string): HorseRegistrationNumber {
    if (!id) {
      throw Error(`HorseRegistrationNumber: id not found - ${id}`);
    }

    if (id.length > HORSE_REGISTRATION_NUMBER_LENGTH) {
      throw Error(`HorseRegistrationNumber: id invalid length - ${id}`);
    }

    if (id.length < HORSE_REGISTRATION_NUMBER_LENGTH) {
      while (id.length < HORSE_REGISTRATION_NUMBER_LENGTH) id = '0' + id;
      return new HorseRegistrationNumber(id);
    }

    return new HorseRegistrationNumber(id);
  }

  public static createFromSpecialEvent(composedId: string): HorseRegistrationNumber {
    const regex = /^([A-Z]-[0-9]{8}|[0-9]{8})$/;

    if(regex.test(composedId)) {
      const regexToExtract = /([0-9]{8})/g;
      const extractedString = composedId.match(regexToExtract);
      return this.create(extractedString[0]);
    } else {
      throw Error(`HorseRegistrationNumber: id invalid - ${composedId}`);
    }
  }

  public toString(): string {
    return this._id;
  }

  public equals(mai: HorseRegistrationNumber): boolean {
    return this.toString() === mai.toString();
  }

}