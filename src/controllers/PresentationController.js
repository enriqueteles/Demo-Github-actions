const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const presentations = await connection('presentations')
            .join('groups', 'groups.id', '=', 'presentations.group_id');

        console.log(presentations);

        return response.json(presentations);
    },

    async create(request, response) {
        const { day, time, group_id } = request.body;

        const [id] = await connection('presentations').insert({
            day,
            time, 
            group_id
        });

        return response.json({ id, day, time, group_id });
    },

    async delete(request, response) {
        const { id } = request.params;

        const presentation = await connection('presentations')
            .where('id', id)
            .first();


        await connection('presentations').where('id', id).delete();

        return response.status(204).send();

    }
}