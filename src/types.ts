export type ThemeName = "light" | "dark";

declare global {
  interface Window {
    restServer: any;
  }
}

export type Customer = {
  id: number;
  username: string;
  name: string;
  login: string;
  email: string;
  isactive: boolean;
  issuperuser: boolean;
  datecreated: string;
  datedeactivated: string | null;
};

export type Product = {
  id: number;
  productname: string;
  description: string;
};

export type CustomerSettingsListProps = {
  userid: String | number;
};

export type Endpoint = {
  id: number;
  endpoint: string;
  description: string;
};

export type Statement = {
  id: number;
  name: string;
  username: string;
  isactive: boolean;
  lddips: number;
  ldamount: number;
  dtddips: number;
  mtddips: number;
  lastmdips: number;
};

export type StatsPerTime = {
  id: number;
  date: string;
  dips: number;
  amount: number;
};
