const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json([
    { id: 1, customer: 'Leon S. Kennedy', total: 150, status: 'Completed' },
    { id: 2, customer: 'Dante Sparda', total: 85.5, status: 'Pending' }
  ])
})

module.exports = router
