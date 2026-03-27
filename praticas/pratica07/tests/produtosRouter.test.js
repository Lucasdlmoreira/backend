const request = require('supertest');
const app = require('../app');

describe('Testes da API de Produtos', () => {
  let idProduto;

  it('Deve criar um produto com sucesso', async () => {
    const res = await request(app)
      .post('/produtos')
      .send({ nome: 'Laranja', preco: 10.0 });

    expect(res.statusCode).toBe(201);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.nome).toBe('Laranja');
    expect(res.body.preco).toBe(10.0);

    idProduto = res.body._id;
  });

  it('Deve retornar erro 422 ao criar sem nome e preço', async () => {
    const res = await request(app).post('/produtos').send({});
    expect(res.statusCode).toBe(422);
    expect(res.body.msg).toBe('Nome e preço do produto são obrigatórios');
  });

  it('Deve listar os produtos cadastrados', async () => {
    const res = await request(app).get('/produtos');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Deve buscar um produto pelo ID', async () => {
    const res = await request(app).get(`/produtos/${idProduto}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.nome).toBe('Laranja');
    expect(res.body.preco).toBe(10.0);
  });

  it('Deve retornar erro 400 para parâmetro inválido', async () => {
    const res = await request(app).get('/produtos/0');
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe('Parâmetro inválido');
  });

  it('Deve retornar erro 404 para produto não encontrado', async () => {
    const res = await request(app).get('/produtos/000000000000000000000000');
    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('Produto não encontrado');
  });

  it('Deve atualizar o produto pelo ID', async () => {
    const res = await request(app)
      .put(`/produtos/${idProduto}`)
      .send({ nome: 'Laranja Pera', preco: 18.0 });

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Laranja Pera');
    expect(res.body.preco).toBe(18.0);
  });

  it('Deve retornar erro 422 ao atualizar sem nome e preço', async () => {
    const res = await request(app).put(`/produtos/${idProduto}`).send({});
    expect(res.statusCode).toBe(422);
    expect(res.body.msg).toBe('Nome e preço do produto são obrigatórios');
  });

  it('Deve retornar erro 400 para parâmetro inválido na atualização', async () => {
    const res = await request(app).put('/produtos/0').send({
      nome: 'Teste',
      preco: 1.0,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe('Parâmetro inválido');
  });

  it('Deve retornar erro 404 para produto não encontrado na atualização', async () => {
    const res = await request(app)
      .put('/produtos/000000000000000000000000')
      .send({ nome: 'Teste', preco: 1.0 });
    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('Produto não encontrado');
  });

  it('Deve excluir o produto pelo ID', async () => {
    const res = await request(app).delete(`/produtos/${idProduto}`);
    expect(res.statusCode).toBe(204);
  });

  it('Deve retornar erro 400 para parâmetro inválido na exclusão', async () => {
    const res = await request(app).delete('/produtos/0');
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe('Parâmetro inválido');
  });

  it('Deve retornar erro 404 para produto não encontrado na exclusão', async () => {
    const res = await request(app).delete('/produtos/000000000000000000000000');
    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('Produto não encontrado');
  });
});
