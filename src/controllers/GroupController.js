const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        try {
            const groups = await connection('groups');

            return response.json(groups);
        } catch(e) {
            return console.log({ success: false, error: e })
        }
    },

    async create(request, response) {
        const { theme, members } = request.body;

        try {
            const [id] = await connection('groups').insert({
                theme,
                members,
            });

            return response.status(200).json({ id, theme, members });
        } catch(e) {
            return response.json({ success: false, error: e })
        }


    },

    async delete(request, response) {
        const { id } = request.params;

        const group = await connection('groups')
            .where('id', id)
            .first();


        await connection('groups').where('id', id).delete();

        return response.status(204).send();

    }
}