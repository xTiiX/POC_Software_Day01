import express, { Request } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { helloMessage, serverPort } from './serverConfig';

const server = express();
server.use(bodyParser.json());
server.use(cookieParser());

server.get('/hello', (req: Request, res: any) => {
  if (helloMessage) {
    res.send(helloMessage);
  } else {
    res.send(StatusCodes.NOT_FOUND, 'No Message Defined');
  }
});

server.get('/repeat-my-query', (req: Request, res: any) => {
  const msg = req.query.message;
  if (msg) {
    res.send(msg);
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    res.send(ReasonPhrases.BAD_REQUEST);
  }
});

server.get('/repeat-my-param/:message', (req: Request, res: any) => {
  const msg = req.params.message;
  res.send(msg);
});

server.post('/repeat-my-body', (req: Request, res: any) => {
  if (req.body.message) {
    res.send(req.body.message);
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    res.send(ReasonPhrases.BAD_REQUEST);
  }
});

server.get('/repeat-my-header', (req: Request, res: any) => {
  if (req.body.header) {
    res.send(req.body.header);
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    res.send(ReasonPhrases.BAD_REQUEST);
  }
});

server.get('/repeat-my-cookie', (req: Request, res: any) => {
  if (req.cookies.message) {
    res.send(req.cookies.message);
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    res.send(ReasonPhrases.BAD_REQUEST);
  }
});

server.listen(serverPort);
