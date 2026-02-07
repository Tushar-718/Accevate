export const formatCurrency = (amount: number) => {
  return amount.toFixed(2);
};

export const isValidEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const wait = (timeout: number) => {
  return new Promise<void>(resolve => setTimeout(() => resolve(), timeout));
};
