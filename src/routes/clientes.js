// routes/clientes.js
const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');

// Obtener todos los clientes

router.get('/', (req, res) => {
    Cliente.find()
        .then(clientes => {
            res.render('clientes/index', { clientes: clientes });
        })
        .catch(error => {
            console.error(error);
            res.render('error');
        });
});


// Mostrar formulario para agregar un nuevo cliente
router.get('/new', (req, res) => {
    res.render('clientes/new');
});

// Crear un nuevo cliente
router.post('/', (req, res) => {
    const { nombre, precio, precioApp, cantArticulo } = req.body;
    const deuda = precio;
    const ganancia = ((precioApp * 600) - precio);

    const nuevoCliente = new Cliente({ nombre, precio, precioApp, deuda, cantArticulo, ganancia });
    nuevoCliente.save()
        .then(() => {
            res.redirect('/clientes');
        })
        .catch(error => {
            console.error(error);
            res.render('error');
        });
});
// Mostrar formulario para editar un cliente
router.get('/:id/edit', (req, res) => {
    const { id } = req.params;

    Cliente.findById(id)
        .then(cliente => {
            res.render('clientes/edit', { cliente });
        })
        .catch(error => {
            console.error(error);
            res.render('error');
        });
});

// Actualizar un cliente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio, precioApp, cantArticulo } = req.body;
    const deuda = precio;
    const ganancia = ((precioApp * 600) - precio);

    Cliente.findByIdAndUpdate(id, { nombre, precio, precioApp, deuda, cantArticulo, ganancia })
        .then(() => {
            res.redirect('/clientes');
        })
        .catch(error => {
            console.error(error);
            res.render('error');
        });
});

// Realizar un pago
router.post('/:id/pagar', (req, res) => {
    const { id } = req.params;
    const { monto } = req.body;

    Cliente.findById(id)
        .then(cliente => {
            const deudaActualizada = cliente.deuda - monto;

            if (deudaActualizada < 0) {
                // Si el monto del pago es mayor a la deuda actual, establecer la deuda en 0
                cliente.deuda = 0;
            } else {
                cliente.deuda = deudaActualizada;
            }

            return cliente.save();
        })
        .then(() => {
            res.redirect('/clientes');
        })
        .catch(error => {
            console.error(error);
            res.render('error');
        });
});


// Eliminar un cliente
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Cliente.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/clientes');
        })
        .catch(error => {
            console.error(error);
            res.render('error');
        });
});

module.exports = router;
