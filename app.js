const express = require('express')
const path = require('node:path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const itemsRouter = require('./routes/items')
const ordersRouter = require('./routes/orders')

// =========================================================
// 1. CONFIGURACIÓN DE PROMETHEUS (Añadido)
// =========================================================
const client = require('prom-client')
const collectDefaultMetrics = client.collectDefaultMetrics
collectDefaultMetrics({ register: client.register })
// =========================================================

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// =========================================================
// 2. RUTA PARA MÉTRICAS (Añadido)
// =========================================================
app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', client.register.contentType)
        res.end(await client.register.metrics())
    } catch (ex) {
        res.status(500).end(ex.message)
    }
})

// Endpoint extra de salud (opcional pero recomendado)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' })
})
// =========================================================

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/items', itemsRouter)
app.use('/orders', ordersRouter)

module.exports = app