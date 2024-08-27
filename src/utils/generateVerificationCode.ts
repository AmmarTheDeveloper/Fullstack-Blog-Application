import otpGenerator from "otp-generator";
export const generateVerificationCode = (): string =>
  otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
