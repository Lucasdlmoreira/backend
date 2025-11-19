const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const request = supertest(app);

jest.setTimeout(30000);

describe('API /usuarios', () => {
    let id; 
    let token; 

    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`);
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('Deve retornar 201 e JSON no POST /usuarios', async () => {
        const response = await request.post('/usuarios')
            .send({ email: `teste${Date.now()}@email.com`, senha: "abcd1234" }) 
            .expect('Content-Type', /json/);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('email');
        
        id = response.body._id; 
    });

    test('Deve retornar 422 e JSON no POST /usuarios sem dados', async () => {
        const response = await request.post('/usuarios')
            .send({})
            .expect(422)
            .expect('Content-Type', /json/);
        
        expect(response.body).toHaveProperty('msg', 'Email e Senha são obrigatórios');
    });

    test('Deve retornar 200 e token no POST /usuarios/login', async () => {
        await request.post('/usuarios').send({ email: "usuario_fixo@email.com", senha: "123" });
        const response = await request.post('/usuarios/login')
            .send({ usuario: "usuario_fixo@email.com", senha: "123" })
            .expect(200)
            .expect('Content-Type', /json/);
        expect(response.body).toHaveProperty('token');
        token = response.body.token; 
    });

    test('Deve retornar 401 no POST /usuarios/login invalido', async () => {
        const response = await request.post('/usuarios/login')
            .send({}) 
            .expect(401)
            .expect('Content-Type', /json/);
        expect(response.body).toHaveProperty('msg', 'Credenciais inválidas');
    });

    test('Deve retornar 200 no POST /usuarios/renovar com token', async () => {
        const response = await request.post('/usuarios/renovar')
            .set('Authorization', token) 
            .expect(200)
            .expect('Content-Type', /json/);
        expect(response.body).toHaveProperty('token');
    });

    test('Deve retornar 401 no POST /usuarios/renovar com token invalido', async () => {
        const response = await request.post('/usuarios/renovar')
            .set('Authorization', 'Bearer 123456789')
            .expect(401)
            .expect('Content-Type', /json/);
        expect(response.body).toHaveProperty('msg', 'Token invalido');
    });

    test('Deve retornar 204 no DELETE /usuarios', async () => {
        const response = await request.delete('/usuarios') 
            .set('Authorization', token)
            .send({ usuario: "usuario_fixo@email.com" }) 
            .expect(204);
    });
});