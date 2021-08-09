import { Validator, ErrorMessage, ErrorMessagesParams } from "./types"

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
const numberRegex = /^[0-9]*$/;
const lettersRegex = /^[A-Za-z]*$/;
const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
const pattern = (val: string, patternRegex: any) => patternRegex.test(val);

export const validator:Validator = {
  required: ({ value }) => !!value.trim(),
  minLength: ({ value, conditionValue }) => value.trim().length >= conditionValue || !value.trim().length,
  length: ({ value, conditionValue }) => value.trim().length >= conditionValue,
  email: ({ value }) => pattern(value, emailRegex),
  url: ({ value }) => pattern(value, urlRegex),
  number: ({ value }) => pattern(value, numberRegex),
  letters: ({ value }) => pattern(value, lettersRegex),  
}

export const errorMessages: ErrorMessage = {
  required: ({ name }) =>`${name} is required`,
  minLength: ({ name }) =>`${name} has invalid min length`,
  length: ({ name }) =>`${name} is required`,
  email: ({ name }) =>`${name} is invalid`,
  url: ({ name }) =>`${name} is invalid`,
  number: ({ name }) =>`${name} is invalid`,
  letters: ({ name }) =>`${name} is invalid`,
}

export const getErrorMessage = ({ name, value, rules }: ErrorMessagesParams) => {  
  let errorMessage = "";

  rules.split("|").some((rule:string) => {
    const innerRule = rule.split(":");
    const hasInnerRule = innerRule.length === 2;
    
    if (hasInnerRule) {
      const [conditionRule, conditionValue] = innerRule;
      const isValidField:boolean = validator[conditionRule]({ value, conditionValue});

      errorMessage = isValidField ? "" : errorMessages[rule]({ name });
      return isValidField;
    }

    const isValidField:boolean = validator[rule]({ value });

    errorMessage = isValidField ? "" : errorMessages[rule]({ name });
    return isValidField;
  });

  return errorMessage;
}