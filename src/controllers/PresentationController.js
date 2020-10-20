const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const presentations = await connection('presentations')
            .join('groups', 'groups.id', '=', 'presentations.group_id');

        return response.status(200).json(presentations);
    },

    async create(request, response) {
        const { day, time, group_id } = request.body;

        if(!day || !time || !group_id) {
            return response.status(400).json({ success: false, message: 'Falta informações na requisição' });
        }

        try {

            const [id] = await connection('presentations').insert({
                day,
                time, 
                group_id
            });

            return response.status(200).json({ id, day, time, group_id });
        } catch(e) {
            return response.status(400).json({ success: false, error: e });
        }

    },

    async delete(request, response) {
        const { id } = request.params;

        try {

            const presentation = await connection('presentations')
                .where('id', id)
                .first();
            
            if(!presentation) {
                return response.status(400).json({ success: false, error: e });    
            }
                
            await connection('presentations').where('id', id).delete();
            
            return response.status(200).send();
        } catch(e) {
            return response.status(400).json({ success: false, error: e });
        }

    }
}