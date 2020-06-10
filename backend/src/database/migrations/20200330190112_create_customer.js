
exports.up = function(knex) {
    return knex.schema.createTable('customer', function (table) {
        table.increments();
        table.string('corpname').notNullable();
        table.string('phone').notNullable();
        table.string('contact').notNullable();
        table.string('address').notNullable();
        table.string('email').notNullable();
        table.string('cnpj').notNullable();
        table.string('cep').notNullable();
        table.string('salesman').notNullable();
        table.string('deadline').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('customer');
};
