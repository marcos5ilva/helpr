const connection = require('../database/connection');
const crypto = require('crypto');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
  async index(req, resp) {
    try {
      const ngos = await connection('ngos').select('*');
      console.log('list ngo was accessed');
      return resp.json(ngos);
    } catch (e) {
      console.log(e);
    }
  },

  async create(req, resp) {
    try {
      const { name, email, whatsapp, city, state } = req.body;

      const id = generateUniqueId();
      console.log('create ngo was accessed');
      await connection('ngos').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        state,
      });

      return resp.json({ id });
    } catch (e) {
      console.log(e);
    }
  },

  // async delete(req, resp){
  //   try {
  //   const {id}=req.params;
  //   const ong_id = req.headers.authorization

  //   const event = await connection()
  //   } catch (e) {

  //   }
  // }
};
