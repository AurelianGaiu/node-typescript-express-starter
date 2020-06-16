import { environment } from './environments/environment';
import { AUTH_CONTROLLERS } from './auth/controllers/_controllers';
import { AuthenticationInitializer } from './authentication-initializer';

const port = environment.AUTH_SERVER_PORT;
const app = new AuthenticationInitializer(AUTH_CONTROLLERS).app;

const server = app.listen(port, () => {
  return console.log(`Auth server running on PORT: ${port}`);
}).on('error', (err) => {
  if (err) {
    return console.error(err);
  }
});

export default server;
