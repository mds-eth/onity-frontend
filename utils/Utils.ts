import CryptoJS from "crypto-js";

export const formatCoinBR = (date: any): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(date);
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
