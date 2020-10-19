
exports.up = function(knex) {
  return knex.schema.createTable('groups', function(table) {
    table.increments();
    table.string('theme').notNullable();
    table.string('members').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('groups');
};
