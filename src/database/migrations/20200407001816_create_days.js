
exports.up = function(knex) {
  return knex.schema.createTable('presentations', function(table) {
    table.increments();

    table.integer('day').notNullable();
    table.decimal('time').notNullable();
    table.string('group_id').notNullable();

    table.foreign('group_id').references('id').inTable('groups');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('presentations');
};
