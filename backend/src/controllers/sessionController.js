const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { nick, pass } = request.body;

        const user = await connection('users')
            .where('nick', nick)
            .andWhere('pass', pass)
            .select('nick')
            .first();

        if(!user) {
            return response.status(400).json({ error: "Nenhum usuário localizado com esses dados"});
        }
        return response.json(user);
    }
}