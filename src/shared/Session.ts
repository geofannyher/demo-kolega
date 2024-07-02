export const saveSession = (token: string) => {
  localStorage.setItem("idKolega", token);
};

export const getSession = () => {
  return localStorage.getItem("idKolega");
};

export const clearSession = () => {
  localStorage.removeItem("idKolega");
};
