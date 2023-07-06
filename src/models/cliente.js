// models/cliente.js
const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precioApp: { type: Number, requires: true },
  precio: { type: Number, required: true },
  deuda: { type: Number, required: true },
  cantArticulo: { type: Number, required: true },
  ganancia: { type: Number, required: true},

});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
