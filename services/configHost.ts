export const configHost = {
  host:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3015/"
      : "http://137.184.24.163:3015/",
};
