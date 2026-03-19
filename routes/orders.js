const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json([
    { id: 1, customer: 'Leon S. Kennedy', total: 150.00, status: 'Completed' },
    { id: 2, customer: 'Dante Sparda', total: 85.50, status: 'Pending' }
  ])
})

module.exports = router
