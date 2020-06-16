import { ApplicationInitializer } from './application-initializer';
import { environment } from './environments/environment';
import { APP_CONTROLLERS } from './app/controllers/_controllers';

const port = environment.APP_SERVER_PORT;
const app = new ApplicationInitializer(APP_CONTROLLERS).app;

const server = app.listen(port, () => {
  return console.log(`App server running on PORT: ${port}`);
}).on('error', (err) => {
  if (err) {
    return console.error(err);
  }
});

export default server;
