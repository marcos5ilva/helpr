const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async index(req, resp) {
    try {
      const { page = 1 } = req.query;
      const [count] = await connection('events').count();

      const events = await connection('events')
        .join('ngos', 'ngos.id', '=', 'events.ngo_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
          'events.*',
          'ngos.name',
          'ngos.email',
          'ngos.whatsapp',
          'ngos.city',
          'ngos.state',
        ]);

      resp.header('X-Total-Count', count['count(*)']);

      return resp.json(events);
    } catch (e) {
      console.log(e);
    }
  },

  async create(req, resp) {
    try {
      const { title, description, value } = req.body;
      const ngo_id = req.headers.authorization;

      const [id] = await connection('events').insert({
        title,
        description,
        value,
        ngo_id,
      });

      return resp.json({ id });
    } catch (e) {
      console.log(e);
    }
  },

  async delete(req, resp) {
    try {
      const { id } = req.params;
      const ngo_id = req.headers.authorization;

      const event = await connection('events')
        .where('id', id)
        .select('ngo_id')
        .first();

      if (event.ngo_id !== ngo_id) {
        return resp.status(401).json({ error: 'Operation not authorized' });
      }

      await connection('events').where('id', id).delete();

      return resp.status(204).send();
    } catch (e) {
      console.log(e);
    }
  },
};
