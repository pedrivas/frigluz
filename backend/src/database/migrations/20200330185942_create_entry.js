
exports.up = function(knex) {
    return knex.schema.createTable('entry', function (table) {
        table.increments();
        table.string('lote').notNullable();
        table.string('supplier_id').notNullable();
        table.foreign('supplier_id').references('id').inTable('supplier');
        table.string('bildate').notNullable();
        table.string('expdate').notNullable();
        table.string('bones').notNullable();
        table.decimal('missing').notNullable();
        table.string('kassel').notNullable();
        table.string('nf').notNullable();

        table.string('mp').notNullable();
        table.decimal('quantitymp').notNullable();
        table.decimal('valuemp').notNullable();

        table.integer('product').notNullable();
        table.foreign('product').references('id').inTable('product');
        table.decimal('quantitypr').notNullable();
        table.decimal('valuepr').notNullable();

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('entry');
};
