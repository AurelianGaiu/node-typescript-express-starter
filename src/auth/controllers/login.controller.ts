import express from 'express';
import { BaseController } from '../../abstract/base.controller';
import { User, RegisterValidationSchema, LoginValidationSchema } from './../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { environment } from './../../environments/environment';

export class Auth extends BaseController {
  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/register', this.registerUser);
    this.router.post('/login', this.loginUser);
  }

  async registerUser(req: express.Request, res: express.Response) {
    // validation of request
    const { error } = RegisterValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error);
    }

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).send(`A user with ${req.body.email} already has been registered`);
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });

      const savedUser = await user.save();

      res.send(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async loginUser(req: express.Request, res: express.Response) {
    // validation of request
    const { error } = LoginValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('Email does not exists');
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send('Password invalid');
    }

    const accessToken = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      environment.ACCESS_TOKEN_SECRET
    );

    return res.status(200).send({ accessToken });
  }
}
