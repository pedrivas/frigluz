const connection = require('../database/connection');

module.exports = {

    async index(request, response)  {
        const { pedido } = request.query;
        if(pedido) {
            const output = await connection('output')
                .select('output.*', 'customer.corpname', 'product.description as productDescription')
                .innerJoin('customer', 'output.customer_id', 'customer.id')
                .innerJoin('product', 'output.product', 'product.id')
                .where('pedido', pedido);    
            return response.json(output);
        }
        const output = await connection('output')
            .select('output.*', 'customer.corpname')
            .innerJoin('customer', 'output.customer_id', 'customer.id');
        return response.json(output);
    },

    async indexGroupPedido(request, response)  {
        const { pedido, page = 1 } = request.query;

        if(pedido) {
            const output = await connection('output')
                .limit(15)
                .offset((page-1)*15)
                .select('output.pedido','customer.corpname','output.date','output.deadline','output.payment')
                .innerJoin('customer', 'output.customer_id', 'customer.id' )
                .where('pedido',pedido)
                .groupBy('output.pedido','customer.corpname','output.date','output.deadline','output.payment')
                .orderBy('output.pedido', 'desc');
            return response.json(output);
        }

        const output = await connection('output')
        .limit(15)
        .offset((page-1)*15)
        .select('output.pedido','customer.corpname','output.date','output.deadline','output.payment')
        .innerJoin('customer', 'output.customer_id', 'customer.id' )
        .groupBy('output.pedido','customer.corpname','output.date','output.deadline','output.payment')
        .orderBy('output.pedido', 'desc');
    return response.json(output);
    },

    async indexMaxPedido(request, response) {
        const entry = await connection('output')
        .max('pedido', {as: 'maxPedido'})
        return response.json(entry);
    },

    async create(request, response) {
        const { pedido, entry_lote, customer_id, date, mp, product,
                packing, quantity, value, volume, payment, deadline } = request.body;

        await connection('output').insert({
            pedido,
            entry_lote,
            customer_id,
            date,
            mp,
            product,
            packing,
            quantity,
            value,
            volume,
            payment,
            deadline
        });
    
        return response.json({pedido, entry_lote, customer_id, date, mp, product,
                            packing, quantity, value, volume, payment, deadline});
    },

    async delete(request, response)  {
        const { id } = request.params;
        await connection('output').where('id', id).first().delete();  
        return response.status(204).send();

    },

    async deletePedido(request, response)  {
        const { pedido } = request.query;
        if(pedido) {
            await connection('output').where('pedido', pedido).delete();   
            return response.status(204).send();
        }
        return response.status(404).send();

    },    

    async update(request, response)  {
        const { id } = request.params;
        const { pedido, entry_lote, customer_id, date, mp, product,
            packing, quantity, value, volume, payment, deadline } = request.body;
        await connection('output').where('id', id).first().update({
            pedido: pedido,
            entry_lote: entry_lote,
            customer_id,
            date: date,
            mp: mp,
            product: product, 
            packing: packing, 
            quantity: quantity, 
            value: value,
            volume: volume,
            payment: payment,
            deadline: deadline
        });   

        return response.json({pedido, entry_lote, customer_id, date, mp, product,
            packing, quantity, value, volume, payment, deadline});

    },

    async updatePedido(request, response)  {
        const { pedido } = request.query;
        const { entry_lote, customer_id, date, mp, product,
                packing, quantity, value, volume, payment, deadline } = request.body;
        if(pedido) {
            await connection('output').where('pedido', pedido).update({
                entry_lote: entry_lote,
                customer_id: customer_id,
                date: date,
                mp: mp,
                product: product, 
                packing: packing, 
                quantity: quantity, 
                value: value,
                volume: volume,
                payment: payment,
                deadline: deadline
            });   
            return response.json({pedido, entry_lote, customer_id, date, mp, product,
                                packing, quantity, value, volume, payment, deadline});
        }
        return response.status(404).send();
    }
};