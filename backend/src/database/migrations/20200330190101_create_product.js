exports.up = function(knex) {
    return knex.schema.createTable('product', function (table) {
        table.increments();
        table.string('description').notNullable();
        table.string('mp').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('product');
};
