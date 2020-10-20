const request = require('supertest');
const app = require('../../src/app');

const connection = require('../../src/database/connection');
const knexCleaner = require('knex-cleaner');

describe('Presentations', () => {
    
    beforeAll(async () => {
        knexCleaner
            .clean(connection, { ignoreTables: ['knex_migrations', 'knex_migrations_lock'] })
    });
    
    afterAll(done => {
        connection.destroy();
    })

    it('deve ser possível criar uma apresenção linkada a um grupo', async () => {
        const responseGroup = await request(app)
            .post('/groups')
            .send({
                theme: "CI CD",
                members: "A B C"
            })
        const responsePresentation = await request(app)
            .post('/presentations')
            .send({
                day: 21,
                time: 15,
                group_id: 1
            })
            
            expect(responseGroup.status).toBe(200);
            expect(responsePresentation.status).toBe(200);
        });
        
    it('nao deve ser possivel criar uma apresentação, grupo nao cadastrado', async () => {
        const responsePresentation = await request(app)
            .post('/presentations')
            .send({
                day: 21,
                time: 15,
                group_id: 0
            })
        
        expect(responsePresentation.status).toBe(400);
    });

    it('deve ser possivel visualizar as apresentações', async () => {
        const response = await request(app)
            .get('/presentations')
        
        expect(response.status).toBe(200);
    });

    it('deve ser possivel deletar uma apresentação', async () => {
        const responseGroup = await request(app)
            .post('/groups')
            .send({
                theme: "CI CD",
                members: "A B C"
            })
        const responsePresentation = await request(app)
            .post('/presentations')
            .send({
                day: 21,
                time: 15,
                group_id: 1
            })
        const responseDelete = await request(app)
            .delete(`/presentations/${responsePresentation.body.id}`)
        
        expect(responseGroup.status).toBe(200);
        expect(responsePresentation.status).toBe(200);
        expect(responseDelete.status).toBe(200);
    });

    it('nao deve ser possivel deletar uma apresentação', async () => {
        const responseDelete = await request(app)
            .delete('/presentations/0')
        
        expect(responseDelete.status).toBe(400);
    });

})
