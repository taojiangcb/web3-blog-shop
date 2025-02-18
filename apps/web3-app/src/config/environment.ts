export enum Network {
  HARDHAT = "hardhat",
  SEPOLIA = "sepolia",
}

/** 推断当前的网络 */
export function network() {
  const network = process.env.NEXT_PUBLIC_NETWORK as Network;
  return network;
}

export const environment = {
  isDev: () => process.env.NODE_ENV === "development",
  isProd: () => process.env.NODE_ENV === "production",
  isTest: () => process.env.NODE_ENV === "test",
  // 获取当前环境名称
  getName: () => process.env.NODE_ENV || "development",
};
