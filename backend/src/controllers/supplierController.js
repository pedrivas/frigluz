const connection = require('../database/connection');

module.exports = {

    async index(request, response)  {
        const supplier = await connection('supplier').select('*');

        return response.json(supplier);
    },

    async create(request, response) {
        const { corpname, phone, contact, address,
                email, cnpj, cep } = request.body;

        await connection('supplier').insert({
            corpname,
            phone,
            contact,
            address,
            email,
            cnpj,
            cep
        });
    
        return response.json({corpname, phone, contact, address,
                            email, cnpj, cep});
    },

    async delete(request, response)  {
        const { id } = request.params;
        await connection('supplier').where('id', id).first().delete();   

        return response.status(204).send();

    },

    async update(request, response)  {
        const { id } = request.params;
        const { corpname, phone, contact, address,
            email, cnpj, cep } = request.body;
        await connection('supplier').where('id', id).first().update({
            corpname: corpname,
            phone: phone,
            contact: contact,
            address: address,
            email: email, 
            cnpj: cnpj, 
            cep: cep
        });   

        return response.json({id, corpname, phone, contact, address,
                            email, cnpj, cep});

    },
};