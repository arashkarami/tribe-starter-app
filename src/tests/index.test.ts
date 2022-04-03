import request from 'supertest';
import App from '@/app';
import IndexRoute from '@routes/index.route';
//import { doesNotMatch } from 'assert';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[POST] /', () => {
    it('response statusCode 200', async () => {
      const indexRoute = new IndexRoute();
      const app = new App([indexRoute]);

      const body = {
        networkId: 'CAxOmI7I7X',
        context: 'NETWORK',
        currentSettings: [],
        type: 'TEST',
        data: {
          challenge: true,
        },
      };

      await request(app.getServer()).post(`${indexRoute.path}`).set('Content-type', 'application/json').send(body).expect(200);
    });
  });
});

describe('Testing Index with real values', () => {
  describe('[POST] /', () => {
    it('response statusCode 200', async () => {
      const indexRoute = new IndexRoute();
      const app = new App([indexRoute]);

      const body = {
        networkId: 'CAxOmI7I7X',
        context: 'NETWORK',
        currentSettings: [],
        data: {
          object: { ownerId: 'DfXnNzYqom' },
        },
      };

      await request(app.getServer()).post(`${indexRoute.path}`).set('Content-type', 'application/json').send(body).expect(200);
    });
  });
});
