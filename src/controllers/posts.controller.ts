import express from 'express';
import { BaseController } from './base.controller';

export class PostsController extends BaseController {
  public path = '/posts';

  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
  }

  getAllPosts(req: express.Request, res: express.Response) {
    res.send('foo');
  }
}
