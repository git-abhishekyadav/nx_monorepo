const MEMBER_APHA_ID_LENGTH = 7;

export class MemberAphaId {

  private _id: string;

  private constructor(id: string) {
    this._id = id;
  }

  public static create(id: string): MemberAphaId {
    if (!id) {
      throw Error(`memberAphaId: id not found - ${id}`);
    }

    if (id.length > MEMBER_APHA_ID_LENGTH) {
      throw Error(`memberAphaId: id invalid length - ${id}`);
    }

    if (id.length < MEMBER_APHA_ID_LENGTH) {
      while (id.length < MEMBER_APHA_ID_LENGTH) id = '0' + id;
      return new MemberAphaId(id);
    }

    return new MemberAphaId(id);
  }

  public toString(): string {
    return this._id;
  }

  public equals(mai: MemberAphaId): boolean {
    return this.toString() === mai.toString();
  }

}