import express from 'express';
import { BaseController } from '../../abstract/base.controller';
import { authorize } from './../middlewares/auth-verify';

export class PostsController extends BaseController {
  public path = '/posts';

  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, authorize, this.getAllPosts);
  }

  getAllPosts(req: express.Request, res: express.Response) {
    console.log('req', req);
    res.send(req.token);
  }
}
