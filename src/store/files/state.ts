export interface FilesResultI {
  data: any[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface FilesStateI {
  result: FilesResultI;
  uploadProgress: number;
}

export const state: FilesStateI = {
  result: {
    data: [],
    page: 1,
    perPage: 0,
    total: 0,
    totalPages: 0,
  },
  uploadProgress: 0,
};
