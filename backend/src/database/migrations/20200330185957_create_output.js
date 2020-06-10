
exports.up = function(knex) {
    return knex.schema.createTable('output', function (table) {
        table.increments();
        table.string('pedido').notNullable();
        table.string('entry_lote').notNullable();
        table.foreign('entry_lote').references('lote').inTable('entry');
        table.string('date').notNullable();
        table.string('mp').notNullable();
        table.string('product').notNullable();
        table.string('packing').notNullable();
        table.decimal('quantity').notNullable();
        table.decimal('volume').notNullable();
        table.string('payment').notNullable();
        table.string('deadline').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('output');
};
