import { SignJWT, jwtVerify } from "jose";

let secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateToken(payload: object): Promise<string> {
  let token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(secret);
  return token;
}

export async function verifyToken(token: string) {
  try {
    let { payload } = await jwtVerify(token, secret!);
    return payload;
  } catch (error) {
    throw new Error("Invalid user.");
  }
}
