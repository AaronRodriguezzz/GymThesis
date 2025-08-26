import bcrypt from 'bcrypt';

export const setTokenCookie = (res, name, token, maxAgeMs) => {
  res.cookie(name, token, {
    httpOnly: true,
    maxAge: maxAgeMs,
    sameSite: "lax",
    secure: true
  });
};

// Verify password matches hashed password
export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Hash a plain password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};