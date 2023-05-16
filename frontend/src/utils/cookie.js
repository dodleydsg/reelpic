export const setCookie = (name, value, age = 3600) => {
  document.cookie = `${name}=${value}; max-age=${age};`;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; max-age=0`;
};

export const getCookie = (name) => {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      .split("=")[1] || null
  );
};
