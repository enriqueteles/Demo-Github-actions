const connection = require('../database/connection');


async function indexGroup(request, response) {
    try {
        const groups = await connection('groups');

        return response.status(200).json(groups);
    } catch(e) {
        return response.status(400).json({ success: false, error: e })
    }
}
async function createGroup(request, response) {
    const { theme, members } = request.body;

    if(!theme || !members) {
        return response.status(400).json({ message: 'Falta informações'});
    }

    try {
        const [id] = await connection('groups').insert({
            theme,
            members,
        });

        return response.status(200).json({ id, theme, members });
    } catch(e) {
        return response.json({ success: false, error: e })
    }
}

async function deleteGroup(request, response) {
    const { id } = request.params;

    try {

        const group = await connection('groups')
            .where('id', id)
            .first();
        
        if(!group) {
            return response.status(400).send({ success: false, error: e });
        }

        await connection('groups').where('id', id).delete();
        
        return response.status(200).send();
    } catch(e) {
        return response.status(400).send({ success: false, error: e });
    }
}

module.exports = {
    indexGroup,
    createGroup,
    deleteGroup
}