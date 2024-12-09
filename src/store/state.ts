export interface RootStateI {
  version: string;
  sidebar: boolean;
}

export interface OptionI {
  content: string;
  action: string;
}

export interface PaginationI {
  page: number;
  limit: number;
  query: string;
}

export const state: RootStateI = {
  version: '0.0.1',
  sidebar: false,
};
