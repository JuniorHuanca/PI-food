const express = require('express')
const router = express.Router()
const { Diet } = require('../db');
const { typesDiet } = require('../controllers/typeDiets')
router.get('/', async (req, res) => {
    try {
        typesDiet()
        const dietTypes = await Diet.findAll();
        res.status(200).send(dietTypes)
    } catch (error) {
        // next(error)
        res.status(400).send('error')
    }
})
module.exports = router