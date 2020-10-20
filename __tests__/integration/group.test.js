const request = require('supertest');
const app = require('../../src/app');

const connection = require('../../src/database/connection');
const knexCleaner = require('knex-cleaner');

describe('Groups', () => {
    
    beforeAll(async () => {
        knexCleaner
            .clean(connection, { ignoreTables: ['knex_migrations', 'knex_migrations_lock'] })
    });

    it('deve ser possível criar um novo grupo', async () => {
        const response = await request(app)
            .post('/groups')
            .send({
                theme: "CI CD",
                members: "A B C"
            })
        
        expect(response.status).toBe(200);
    });

    it('nao deve ser possivel criar um novo grupo, falta informações', async () => {
        const response = await request(app)
            .post('/groups')
            .send({
                members: "A B C"
            })
        
        expect(response.status).toBe(400);
    });

    it('deve ser possivel visualizar os grupos cadastrados', async () => {
        const response = await request(app)
            .get('/groups')
        
        expect(response.status).toBe(200);
    });

    it('deve ser possivel deletar um grupo cadastrado', async () => {
        const responseCreate = await request(app)
            .post('/groups')
            .send({
                theme: "microsserviços",
                members: "A B C"
            })
            
        const responseIndex = await request(app)
            .get('/groups')
        const responseDelete = await request(app)
            .delete('/groups/1')
        
        
        expect(responseIndex.status).toBe(200);
        expect(responseCreate.status).toBe(200);
        expect(responseDelete.status).toBe(200);
    });

    it('nao deve ser possivel deletar um grupo nao cadastrado', async () => {
        const responseDelete = await request(app)
            .delete('/groups/1')
        
        expect(responseDelete.status).toBe(400);
    });


})
