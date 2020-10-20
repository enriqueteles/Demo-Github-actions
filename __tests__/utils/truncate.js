const connection = require('../../src/database/connection');

module.exports = async () => {
    await connection.raw();
    await knex.schema.dropTable('presentations');
}