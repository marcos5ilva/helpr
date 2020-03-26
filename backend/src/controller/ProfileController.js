const connection = require('../database/connection');

module.exports = {
  async index(req, resp) {
    try {
      const ong_id = req.headers.authorization;

      const events = await connection('events')
        .where('ngo_id', ngo_id)
        .select('*');

      return resp.json(events);
    } catch (e) {}
  }
};
