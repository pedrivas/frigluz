const connection = require('../database/connection');

module.exports = {

    async index(request, response)  {
        const { lote, page = 1 } = request.query;
        if(lote) {
            const entry = await connection('entry')
                .limit(15)
                .offset((page-1)*15)
                .select('*')
                .where('lote', lote);    
            return response.json(entry);
        }
        const entry = await connection('entry')
            .limit(15)
            .offset((page-1)*15)
            .select('*');
        return response.json(entry);
    },

    async indexGroupLote(request, response)  {
        const { lote, page = 1 } = request.query;

        if(lote) {
            const entry = await connection('entry')
                .limit(15)
                .offset((page-1)*15)
                .select('entry.lote','supplier.corpname','entry.bildate','entry.expdate','entry.nf', 'entry.missing', 'entry.bones', 'entry.kassel')
                .innerJoin('supplier', 'entry.supplier_id', 'supplier.id' )
                .where('lote',lote)
                .groupBy('entry.lote','entry.supplier_id','entry.bildate','entry.expdate','entry.nf', 'entry.missing', 'entry.bones', 'entry.kassel'); 
            return response.json(entry);
        }

        const entry = await connection('entry')
            .limit(15)
            .offset((page-1)*15)
            .select('entry.lote','supplier.corpname','entry.bildate','entry.expdate','entry.nf', 'entry.missing', 'entry.bones', 'entry.kassel')
            .innerJoin('supplier', 'entry.supplier_id', 'supplier.id' )
            .groupBy('entry.lote','entry.supplier_id','entry.bildate','entry.expdate','entry.nf', 'entry.missing', 'entry.bones', 'entry.kassel');
        return response.json(entry);
    },

    async indexMaxLote(request, response) {
        const entry = await connection('entry')
        .max('lote', {as: 'maxLote'})
        return response.json(entry);
    },

    async create(request, response) {
        const { lote, supplier_id, bildate, expdate, bones,
                missing, kassel, nf, mp, quantitymp,
                valuemp, product, quantitypr, valuepr } = request.body;

        await connection('entry').insert({
            lote,
            supplier_id,
            bildate,
            expdate,
            bones,
            missing,
            kassel,
            nf,
            mp,
            quantitymp,
            valuemp,
            product,
            quantitypr,
            valuepr
        });
    
        return response.json({lote, supplier_id, bildate, expdate, bones,
                            missing, kassel, nf, mp, quantitymp,
                            valuemp, product, quantitypr, valuepr});
    },

    async delete(request, response)  {
        const { id } = request.params;
        await connection('entry').where('id', id).first().delete();  
        return response.status(204).send();

    },

    async deleteLote(request, response)  {
        const { lote } = request.query;
        if(lote!==undefined) {
            await connection('entry').where('lote', lote).delete();   
            return response.status(204).send();
        }
        return response.status(404).send();

    },    

    async update(request, response)  {
        const { id } = request.params;
        const { lote, supplier_id, bildate, expdate, bones,
            missing, kassel, nf, mp, quantitymp,
            valuemp, product, quantitypr, valuepr } = request.body;
        await connection('entry').where('id', id).first().update({
            lote: lote,
            supplier_id: supplier_id,
            bildate: bildate,
            expdate: expdate,
            bones: bones, 
            missing: missing, 
            kassel: kassel, 
            nf: nf,
            mp: mp,
            quantitymp: quantitymp,
            valuemp: valuemp,
            product: product,
            quantitypr: quantitypr,
            valuepr: valuepr
        });   

        return response.json({lote, supplier_id, bildate, expdate, bones,
                            missing, kassel, nf, mp, quantitymp,
                            valuemp, product, quantitypr, valuepr});

    },

    async updateLote(request, response)  {
        const { lote } = request.query;
        const { supplier_id, bildate, expdate, 
            bones, missing, kassel, nf } = request.body;
        if(lote!==undefined) {
            await connection('entry').where('lote', lote).update({
                supplier_id: supplier_id,
                bildate: bildate,
                expdate: expdate,
                bones: bones, 
                missing: missing, 
                kassel: kassel, 
                nf: nf
            });   
            return response.json({supplier_id, bildate, expdate, 
                                bones, missing, kassel, nf});
        }
        return response.status(404).send();
    }
};