const connection = require('../database/connection');

module.exports = {

    async index(request, response)  {
        const { pedido } = request.query;
        if(pedido!==undefined) {
            const output = await connection('output').select('*').where('pedido', pedido);    
            return response.json(output);
        }
        const output = await connection('output').select('*');
        return response.json(output);
    },

    async create(request, response) {
        const { pedido, entry_lote, date, mp, product,
                packing, quantity, volume, payment, deadline } = request.body;

        await connection('output').insert({
            pedido,
            entry_lote,
            date,
            mp,
            product,
            packing,
            quantity,
            volume,
            payment,
            deadline
        });
    
        return response.json({pedido, entry_lote, date, mp, product,
                            packing, quantity, volume, payment, deadline});
    },

    async delete(request, response)  {
        const { id } = request.params;
        await connection('output').where('id', id).first().delete();  
        return response.status(204).send();

    },

    async deletePedido(request, response)  {
        const { pedido } = request.query;
        if(pedido!==undefined) {
            await connection('output').where('pedido', pedido).delete();   
            return response.status(204).send();
        }
        return response.status(404).send();

    },    

    async update(request, response)  {
        const { id } = request.params;
        const { pedido, entry_lote, date, mp, product,
            packing, quantity, volume, payment, deadline } = request.body;
        await connection('output').where('id', id).first().update({
            pedido: pedido,
            entry_lote: entry_lote,
            date: date,
            mp: mp,
            product: product, 
            packing: packing, 
            quantity: quantity, 
            volume: volume,
            payment: payment,
            deadline: deadline
        });   

        return response.json({pedido, entry_lote, date, mp, product,
            packing, quantity, volume, payment, deadline});

    },

    async updatePedido(request, response)  {
        const { pedido } = request.query;
        const { entry_lote, date, mp, product,
                packing, quantity, volume, payment, deadline } = request.body;
        if(pedido!==undefined) {
            await connection('output').where('pedido', pedido).update({
                entry_lote: entry_lote,
                date: date,
                mp: mp,
                product: product, 
                packing: packing, 
                quantity: quantity, 
                volume: volume,
                payment: payment,
                deadline: deadline
            });   
            return response.json({pedido, entry_lote, date, mp, product,
                                packing, quantity, volume, payment, deadline});
        }
        return response.status(404).send();
    }
};