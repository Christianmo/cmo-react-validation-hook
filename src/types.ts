export interface Validator {
  [key: string]: ({ value }: any) => boolean;
}

export interface ErrorMessage {
  [key: string]: ({ value }: any) => string;
}

export interface ErrorMessagesParams {
  name: string;
  value: any;
  rules: string;
}
