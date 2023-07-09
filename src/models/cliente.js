// models/cliente.js
const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precioApp: { type: mongoose.Types.Decimal128, requires: true },
  precio: { type: mongoose.Types.Decimal128, required: true },
  deuda: { type: mongoose.Types.Decimal128, required: true },
  cantArticulo: { type: Number, required: true },
  ganancia: { type: mongoose.Types.Decimal128, required: true},

});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
