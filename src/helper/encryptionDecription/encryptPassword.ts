import bcrypt from "bcryptjs";

export async function encrypt(pass: string): Promise<string> {
  let encryptedPass = await bcrypt.hash(pass, 10);
  return encryptedPass;
}

export async function comparePass(
  pass: string,
  encryptedpass: string
): Promise<boolean> {
  let isMatch = await bcrypt.compare(pass, encryptedpass);
  return isMatch;
}
