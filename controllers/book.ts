import type { Request, Response } from 'express';
import { insertService, updateService, deleteService, selectOneService, selectAllService, countAllService } from '../services/bookService';

export async function getAll(req: Request, res: Response) {
  const limit = req.query.limit;
  const offset = req.query.offset;

  const pagination = {
    limit: limit ? Number(limit) : 20,
    offset: offset ? Number(offset) : 0,
  };

  const result = await selectAllService(pagination);
  const countAll = await countAllService();

  return res.status(200).send({
    data: {
      books: result,
      limit: pagination.limit,
      offset: pagination.offset,
      total: countAll,
    },
    status: 'Ok',
    message: null,
  });
}

export async function getOne(req: Request, res: Response) {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      data: null,
      status: 'Bad request',
      message: 'missing params: id',
    });
  }

  const result = await selectOneService(Number(id));

  if (!result) {
    return res.status(404).send({
      data: null,
      status: 'Not found',
      message: 'No records found.',
    });
  }

  return res.status(200).send({
    data: result,
    status: 'Ok',
    message: null,
  });
}

export async function create(req: Request, res: Response) {
  const title = req.body.title;
  const author = req.body.author;
  const synopsis = req.body.synopsis;

  if (!title || !author || !synopsis) {
    return res.status(400).send({
      data: null,
      status: 'Bad request',
      message: 'missing fields: title, author, synopsis',
    });
  }

  const result = await insertService({ title, author, synopsis });

  return res.status(200).send({
    data: result,
    status: 'Ok',
    message: null,
  });
}

export async function update(req: Request, res: Response) {
  const id = req.params.id;
  const title = req.body.title;
  const author = req.body.author;
  const synopsis = req.body.synopsis;

  if (!id || !title || !author || !synopsis) {
    return res.status(400).send({
      data: null,
      status: 'Bad request',
      message: 'missing fields: id, title, author, synopsis',
    });
  }

  const result = await updateService({ id: Number(id), title, author, synopsis });

  if (!result) {
    return res.status(404).send({
      data: null,
      status: 'Not found',
      message: 'No records found.',
    });
  }

  return res.status(200).send({
    data: result,
    status: 'Ok',
    message: null,
  });
}

export async function deleteOne(req: Request, res: Response) {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      data: null,
      status: 'Bad request',
      message: 'missing fields: id',
    });
  }

  const result = await deleteService(Number(id));

  if (!result) {
    return res.status(404).send({
      data: null,
      status: 'Not found',
      message: 'No records found.',
    });
  }

  return res.status(200).send({
    data: result,
    status: 'Ok',
    message: null,
  });
}
