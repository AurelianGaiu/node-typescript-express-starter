import express from 'express';
import { BaseController } from './abstract/base.controller';
import mongoose from 'mongoose';
import { environment } from './environments/environment';

export class AuthenticationInitializer {
  private _app: express.Application;
  public get app(): express.Application {
    return this._app;
  }

  constructor(controllers: BaseController[]) {
    this._app = express();

    this.initializeMongodb();
    this.initializeMiddleware();
    this._initializeControllers(controllers);
  }

  initializeMongodb() {
    mongoose.connect(
      environment.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => console.log('Auth database connected')
    );
  }

  initializeMiddleware() {
    this._app.use(express.json());
  }

  _initializeControllers(controllers: BaseController[]) {
    controllers.forEach((controller) => {
      this._app.use('/auth', controller.router);
    });
  }
}
