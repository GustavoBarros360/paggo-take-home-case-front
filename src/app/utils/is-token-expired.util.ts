import { JWTPayload, decodeJwt } from "jose";

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  const tokenData = (token && decodeJwt(token)) as JWTPayload;
  if (!tokenData?.exp) return true;
  return tokenData.exp < Date.now() / 1000;
};
