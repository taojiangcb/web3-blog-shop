import { IData } from "@interfaces/IData";

export interface IApi {
  getInfo(): Promise<IData>;
}
