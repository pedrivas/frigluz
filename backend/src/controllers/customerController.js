const connection = require('../database/connection');

module.exports = {

    async index(request, response)  {
        const { page = 1 } = request.query;

        const [count] = await connection('customer').count();

        const customer = await connection('customer')
            .limit(10)
            .offset((page - 1) * 10)
            .select('*');

        response.header('X-Total-Count', count['count(*)'])

        return response.json(customer);
    },

    async create(request, response) {
        const { corpname, phone, contact, address,
                email, cnpj, cep, salesman, deadline } = request.body;

        await connection('customer').insert({
            corpname,
            phone,
            contact,
            address,
            email,
            cnpj,
            cep,
            salesman,
            deadline
        });
    
        return response.json({corpname, phone, contact, address,
                            email, cnpj, cep, salesman, deadline});
    },

    async delete(request, response)  {
        const { id } = request.params;
        await connection('customer').where('id', id).first().delete();   

        return response.status(204).send();

    },

    async update(request, response)  {
        const { id } = request.params;
        const { corpname, phone, contact, address,
            email, cnpj, cep, salesman, deadline } = request.body;
        await connection('customer').where('id', id).first().update({
            corpname: corpname,
            phone: phone,
            contact: contact,
            address: address,
            email: email, 
            cnpj: cnpj, 
            cep: cep, 
            salesman: salesman,
            deadline: deadline
        });   

        return response.json({id, corpname, phone, contact, address,
                            email, cnpj, cep, salesman, deadline});

    },
};