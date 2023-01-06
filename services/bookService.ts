import db from '../connection';
import type { Book, InsertBook, UpdateBook, PaginationRequest, CountAll } from '../models/book';

export async function selectAllService(pagination: PaginationRequest): Promise<Book[]> {
  return db.transaction<Book[]>((trx) => {
    db('books')
      .transacting(trx)
      .select('id', 'title', 'author', 'synopsis', 'created_at', 'updated_at')
      .where({ deleted_at: null })
      .limit(pagination.limit)
      .offset(pagination.offset)
      .orderBy('created_at', 'desc')
      .then(trx.commit)
      .catch(trx.rollback);
  })
  .then(select => select)
  .catch(e => {
    console.log({
      error: e,
      table: 'books',
      service: 'bookService.selectAllService',
      status: 'failed',
    });
    return [];
  });
}

export async function countAllService(): Promise<number> {
  return db.transaction<CountAll[]>((trx) => {
    db('books')
      .count({ count: '*' })
      .where({ deleted_at: null })
      .then(trx.commit)
      .catch(trx.rollback);
  })
    .then(count => {
      return count[0] ? Number(count[0].count) : 0;
    })
    .catch(e => {
      console.log({
        error: e,
        table: 'books',
        service: 'bookService.countAllService',
        status: 'failed',
      });
      return 0;
    });
}

export async function selectOneService(id: number): Promise<Book|null> {
  return db.transaction<Book[]>((trx) => {
    db('books')
      .transacting(trx)
      .where({
        id: id,
        deleted_at: null,
      })
      .select('id', 'title', 'author', 'synopsis', 'created_at', 'updated_at')
      .returning(['id', 'title', 'author', 'synopsis', 'created_at', 'updated_at'])
      .then(trx.commit)
      .catch(trx.rollback);
  })
  .then((select) => select[0])
  .catch(e => {
    console.log({
      error: e,
      table: 'books',
      service: 'bookService.selectOneService',
      status: 'failed',
    });
    return null;
  });
}

export async function insertService(book: InsertBook): Promise<Book|null> {
  return db.transaction<Book[]>((trx) => {
    db('books')
      .transacting(trx)
      .insert({
        ...book,
        created_at: new Date(),
      })
      .returning(['id', 'title', 'author', 'synopsis'])
      .then(trx.commit)
      .catch(trx.rollback);
  })
  .then((inserts) => inserts[0])
  .catch(e => {
    console.log({
      error: e,
      table: 'books',
      service: 'bookService.insertService',
      status: 'failed',
    });
    return null;
  });
}

export async function updateService(book: UpdateBook): Promise<Book|null> {
  return db.transaction<Book[]>((trx) => {
    db('books')
      .transacting(trx)
      .where('id', '=', book.id)
      .update({
        title: book.title,
        author: book.author,
        synopsis: book.synopsis,
        updated_at: new Date(),
      })
      .returning(['id', 'title', 'author', 'synopsis', 'updated_at', 'created_at'])
      .then(trx.commit)
      .catch(trx.rollback);
  })
  .then((updates) => updates[0])
  .catch(e => {
    console.log({
      error: e,
      table: 'books',
      service: 'bookService.updateService',
      status: 'failed',
    });
    return null;
  });
}

export async function deleteService(id: number): Promise<Book|null> {
  return db.transaction<Book[]>((trx) => {
    db('books')
      .transacting(trx)
      .where({
        id: id,
        deleted_at: null,
      })
      .update({
        deleted_at: new Date(),
      })
      .returning(['id', 'title', 'author', 'synopsis', 'updated_at', 'created_at', 'deleted_at'])
      .then(trx.commit)
      .catch(trx.rollback);
  })
  .then((deletes) => deletes[0])
  .catch(e => {
    console.log({
      error: e,
      table: 'books',
      service: 'bookService.deleteService',
      status: 'failed',
    });
    return null;
  });
}
