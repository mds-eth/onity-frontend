import CryptoJS from "crypto-js";

export const formatCoinBR = (date: any): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(date);
};

export const urlToFiles = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();

  const file = new File([blob], "image.jpg", { type: blob.type });

  const fileList = new DataTransfer();

  fileList.items.add(file);

  return fileList.files;
};

export const formatDate = (inputDate: string): string => {
  if (typeof window !== "undefined") {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(inputDate));
  }
  return inputDate;
};

export const encryptionData = async (data: any) => {
  try {
    const encript: any = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
    const integrity: any = process.env.NEXT_PUBLIC_INTEGRITY_KEY;

    const encryptedData = await CryptoJS.AES.encrypt(
      JSON.stringify(data),
      encript
    ).toString();

    const signature = await CryptoJS.HmacSHA256(
      encryptedData,
      integrity
    ).toString();

    const signedData = {
      data: encryptedData,
      signature: signature,
    };

    return signedData;
  } catch (error) {}
};

export const decryptData = async (signedData: any) => {
  const { data, signature } = signedData;

  const encript: any = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  const integrity: any = process.env.NEXT_PUBLIC_INTEGRITY_KEY;

  const calculatedSignature = CryptoJS.HmacSHA256(data, integrity).toString();

  if (calculatedSignature !== signature) {
    return null;
  }

  const bytes = CryptoJS.AES.decrypt(data, encript);

  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  return JSON.parse(decryptedData);
};
