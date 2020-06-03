import { ApplicationInitializer } from './app';
import { environment } from './environments/environment';
import { PostsController } from './controllers/posts.controller';

const port = environment.PORT;
const app = new ApplicationInitializer([
  new PostsController()
]).app;

const server = app.listen(port, () => {
  return console.log(`Application running on PORT: ${port}`);
}).on('error', (err) => {
  if (err) {
    return console.error(err);
  }
});

export default server;
