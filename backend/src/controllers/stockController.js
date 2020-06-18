const connection = require('../database/connection');

module.exports = {

  async getStock(request, response) {
    const { product } = request.params;
    const stock = await connection('entry')
    .select(connection.raw(`distinct (select sum(quantitypr) from entry where product='${product}') as incomes, (select sum(quantity) from output where product='${product}') as outcomes`))
    .innerJoin(connection.raw(`output on entry.product = output.product`))

    return response.json(stock);
  }

};