const connection = require('../database/connection');

module.exports = {

    async index(request, response)  {
        const product = await connection('product').select('*');

        return response.json(product);
    },

    async create(request, response) {
        const { description, mp } = request.body;

        await connection('product').insert({
            description,
            mp
        });
    
        return response.json({description, mp});
    },

    async delete(request, response)  {
        const { id } = request.params;
        await connection('product').where('id', id).first().delete();   

        return response.status(204).send();

    },

    async update(request, response)  {
        const { id } = request.params;
        const { description, mp } = request.body;
        await connection('product').where('id', id).first().update({
            description: description,
            mp: mp
        });   

        return response.json({id, description, mp});

    },
};