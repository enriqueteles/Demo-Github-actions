//importa os módulos e aqruivos necessários
const connection = require('./database/connection');

const supertest = require('supertest');
const app = require('./routes.js');

const api = supertest(app);

//o que será executado antes de todos os testes
beforeAll(async () => {
    console.log('Iniciando TDD com jest!');
});

//o que será executado após todos os testes
afterAll(() => {
    //o server close irá encerrar nossa aplicação, evitando problemas da porta já estar em uso
    console.log('servidor fechado');
});


test('inicio dos testes', async() => {
    await api
        .get('/groups')
        .expect(200)
        .expect('Content-Type', /application\/json/)

})


// describe('inicio dos testes', () => {
//     it('teste do group', async() => {
//         const mockCompany = {id: "MOCK_ID", theme: "MOCK_NAME", members: "MOCK_DESCRIPTION"};

//         // criamos um mock de uma requisição
//         const req = {
//             theme: mockCompany.name,
//             members: mockCompany.description
//         };

//         // criamos um mock de um objeto de resposta, com os métodos: status e send
//         // como queremos testar como send e status foram chamados, colocamo-os como 
//         // iguais a uma função do jest chamada .fn()
//         const send = jest.fn();
//         const res = { status: jest.fn(() => ({ send })) };
    
//         // configuramos a função updateCompany para que retorne, na próxima chamada
//         // uma Promise com resolução = false
//         // devemos colocar a promise pois a função é assíncrona
//         createGroup.mockReturnValueOnce(Promise.resolve(false));

//         // chamamos a função que iremos criar
//         await GroupController.create(req, res);

//         // VERIFICAÇÕES
//         // verifica que status foi chamada apenas uma vez
//         expect(res.status).toHaveBeenCalledTimes(1); 
//         // verifica que status foi chamada com um erro BAD
//         expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD);
//         // verifica que send foi chamada apenas uma vez
//         expect(send).toHaveBeenCalledTimes(1);
//         // verifica que send foi chamada com um erro de INVALID_PARAMETERS
//         expect(send).toHaveBeenCalledWith({error: ERROR_STATUS.INVALID_PARAMETERS});
//     })
    
// });