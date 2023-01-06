export type Book = {
  id: number,
  title: string,
  author: string,
  synopsis: string,
  created_at: string,
  updated_at: string,
  deleted_at: string,
};

export type InsertBook = {
  title: string,
  author: string,
  synopsis: string,
};

export type UpdateBook = {
  id: number,
  title: string,
  author: string,
  synopsis: string,
};

export type PaginationRequest = {
  limit: number,
  offset: number,
};

export type CountAll = {
  count: number,
};
