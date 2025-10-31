const request = require('supertest');
const app = require('../app'); 

let token; 

describe('Prática 8 - Testes de autenticação e rotas protegidas', () => {
  test('GET /produtos sem token -> 401 Não autorizado', async () => {
    const res = await request(app).get('/produtos');
    expect(res.status).toBe(401);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Não autorizado');
  });

  test('GET /produtos com token inválido -> 401 Token inválido', async () => {
    const res = await request(app)
      .get('/produtos')
      .set('authorization', '123456789');
    expect(res.status).toBe(401);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Token inválido');
  });

  test('POST /usuarios/login com credenciais retorna 200 e token', async () => {
    const res = await request(app)
      .post('/usuarios/login')
      .send({ usuario: 'email@exemplo.com', senha: 'abcd1234' });

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');

    token = res.body.token;
    expect(token.length).toBeGreaterThan(0);
  });

  test('GET /produtos com token válido retorna 200 e JSON (array)', async () => {
    const res = await request(app)
      .get('/produtos')
      .set('authorization', token);

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /usuarios/renovar com token retorna 200 e novo token', async () => {
    const res = await request(app)
      .post('/usuarios/renovar')
      .set('authorization', token);

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');

    token = res.body.token;
    expect(token.length).toBeGreaterThan(0);
  });

  test('GET /produtos com token renovado retorna 200 e JSON (array)', async () => {
    const res = await request(app)
      .get('/produtos')
      .set('authorization', token);

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
