import express from 'express';
import jwt from 'jsonwebtoken';
import { environment } from './../../environments/environment';

export function authorize(req: express.Request, res: any, next: any) {
  const authHeaderValue = req.headers.authorization;
  if(!authHeaderValue) {
    return res.status(401).send('Access Denied');
  }
  const headerValues = authHeaderValue.split(' ');
  if(headerValues[0] !== 'Bearer' || !headerValues[1]) {
    return res.status(401).send('Access Denied');
  }

  const token = headerValues[1];
  try {
    const verifiedToken = jwt.verify(token, environment.ACCESS_TOKEN_SECRET);
    req.token = token;
    next();
  } catch (err) {
    res.status(400).send('Your access token is invalid');
  }
};
