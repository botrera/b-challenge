interface ShowMessage {
  EN: string;
  ES: string;
}

interface CustomError {
  message: string;
  showMessage: ShowMessage;
  HTTPStatusCode?: number;
  errorName?: string;
  type?: string;
}

export { CustomError, ShowMessage };
