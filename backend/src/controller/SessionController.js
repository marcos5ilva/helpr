const connection = require('../database/connection');

module.exports = {
  async create(req, resp) {
    try {
      const { id } = req.body;

      const ngo = await connection('ngos')
        .where('id', id)
        .select('name')
        .first();

      if (!ngo) {
        return resp.status(400).json({ error: 'No NGO found' });
      }

      return resp.json(ngo);
    } catch (e) {
      console.log(e);
    }
  }
};
