const express = require('express')
const router = express.Router()
// require('dotenv').config();
const { getInfoByName, getAllInfo, getDBInfoByID, getInfoApiByID } = require('../controllers/recipes');

router.get('/', async (req, res) => {
    const { name } = req.query
    try {
        if (name) {
            const data = await getInfoByName(name);
            // console.log(data);
            if (data !== 'error' || data !== 'errorerror') {
                if (data.length) {
                    return res.status(200).json(data)
                }
                else { throw new Error('not found any recipes') }
            } else {
                throw new Error('Something went wrong')
            }
        } else {
            const allData = await getAllInfo()
            if (allData !== 'error') {
                res.status(200).json(allData);
            } else {
                throw new Error('Error en la búsqueda de datos')
            }
        }
    }
    catch (e) {
        res.status(404).json({ error: e.message })
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await getDBInfoByID(id)
        if (data !== 'error') {
            return res.status(200).json(data)
        }
        const dataApi = await getInfoApiByID(id)
        if (dataApi !== 'error') {
            return res.status(200).json(dataApi)
        }
        else {
            throw new Error('not found any recipes')
        }
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.delete('/', async (req, res) =>{
    const {id} = req.body
    try {
        const recipe = await Recipe.findByPk(id)
        recipe.destroy()
        res.status(200).send('deleted')
    } catch (error) {
        res.status(200).send('deleted')
    }
})

router.put('/', async (req, res) =>{
    const {id, summary, value} = req.body
    try {
        const recipe = Recipe.findByPk(id)
        await recipe.update({[summary]: value})
    } catch (error) {
        
    }
})

module.exports = router