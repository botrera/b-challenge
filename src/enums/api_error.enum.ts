export namespace ApiError {
  export enum Server {
    GENERIC = 1000,
  }

  export enum User {
    GENERIC = 2000,
    ORIGIN_DOES_NOTEXIST,
    DESTINATION_DOES_NOTEXIST,
  }

  export enum Transaction {
    GENERIC = 3000,
    INVALID_AMOUNT = 3001,
    INSUFFICIENT_BALANCE = 3002,
    ORIGIN_EQUALS_DESTINATION = 3003,
    CREATE_FAILED = 3004,
    UPDATE_FAILED = 3005,
    NOT_FOUND = 3006,
    NOT_PENDING = 3007,
  }
}
