export const generateOTP = (): string => {
  // the function return numper but we need string so we use as unknown as string
  return Math.floor(Math.random() * 99999 + 10000) as unknown as string;
};

export const generateExpiryDate = (time: number) => {
  return Date.now() + time;
};
