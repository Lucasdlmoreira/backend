const request = require('supertest');
const app = require('../app');

let tarefaId;

describe('API de Tarefas', () => {

  it('GET /tarefas deve retornar 200 e JSON', async () => {
    const res = await request(app).get('/tarefas');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  it('POST /tarefas deve criar uma tarefa e retornar 201', async () => {
    const res = await request(app)
      .post('/tarefas')
      .send({ nome: "Estudar Node", concluida: false });
    expect(res.statusCode).toBe(201);
    expect(res.headers['content-type']).toMatch(/json/);
    tarefaId = res.body.id;
  });

  it('GET /tarefas/:id deve retornar 200 e JSON', async () => {
    const res = await request(app).get(`/tarefas/${tarefaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  it('GET /tarefas/1 deve retornar 404', async () => {
    const res = await request(app).get('/tarefas/1');
    expect(res.statusCode).toBe(404);
  });

  it('PUT /tarefas/:id deve atualizar a tarefa', async () => {
    const res = await request(app)
      .put(`/tarefas/${tarefaId}`)
      .send({ nome: "Estudar Node e Express", concluida: true });
    expect(res.statusCode).toBe(200);
  });

  it('PUT /tarefas/1 deve retornar 404', async () => {
    const res = await request(app)
      .put('/tarefas/1')
      .send({ nome: "Teste", concluida: true });
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /tarefas/:id deve remover a tarefa', async () => {
    const res = await request(app).delete(`/tarefas/${tarefaId}`);
    expect(res.statusCode).toBe(204);
  });

  it('DELETE /tarefas/1 deve retornar 404', async () => {
    const res = await request(app).delete('/tarefas/1');
    expect(res.statusCode).toBe(404);
  });

});