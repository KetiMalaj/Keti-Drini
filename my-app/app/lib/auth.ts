import {SignJWT} from 'jose'

const getJwtSecretKey = () => {
    const secret = process.env.SECRET_KEY;
    if (!secret) throw new Error("SECRET_KEY is not set");
    return new TextEncoder().encode(secret);
  };

  export const signToken = async (payload: { email: string; id: number }) => {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(getJwtSecretKey());
  };

