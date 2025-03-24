const getbaseUrl = () => {
  const baseURL = import.meta.env.VITE_SECRET_KEY_ONLY_URI;
  return baseURL;
};

export default getbaseUrl;
