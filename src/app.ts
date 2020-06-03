import express from 'express';
import { BaseController } from './controllers/base.controller';

export class ApplicationInitializer {
  private _app: express.Application;
  public get app(): express.Application {
    return this._app;
  }

  constructor(controllers: BaseController[]) {
    this._app = express();

    this._initializeControllers(controllers);
  }

  _initializeControllers(controllers: BaseController[]) {
    controllers.forEach(controller => {
      this._app.use('/', controller.router);
    })
  }
}
