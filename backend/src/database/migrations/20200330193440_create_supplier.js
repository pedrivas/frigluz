
exports.up = function(knex) {
    return knex.schema.createTable('supplier', function (table) {
        table.increments();
        table.string('corpname').notNullable();
        table.string('phone').notNullable();
        table.string('contact').notNullable();
        table.string('address').notNullable();
        table.string('email').notNullable();
        table.string('cnpj').notNullable();
        table.string('cep').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('supplier');
};
