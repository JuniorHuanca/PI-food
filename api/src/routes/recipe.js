const express = require('express');
const router = express.Router()
require('dotenv').config();
const { Recipe, Diet } = require('../db');
const { typesDiet } = require('../controllers/typeDiets')


router.post('/', async (req, res) => {
    let{
        name,
        summary,
        healthScore,
        dishTypes,
        image,
        steps,
        diets
    } = req.body
    try{
        if (!name) return res.status(400).send({error: 'Debe ingresar el name para la receta'});
        if (!summary) return res.status(400).send({error: 'Debe ingresar un summary de la receta'});
        if (healthScore < 0 || healthScore > 100) return res.status(400).send({error: 'Debe ingresar un healthScore entre 0 y 100'});
        if(!image) image = 'https://cdn.discordapp.com/attachments/724804315570503730/1046634011864342538/platos-con-sobrantes-de-comida.jpg'
        typesDiet()
        let recipeCreate = await Recipe.create({ 
            name,
            summary,
            healthScore,
            dishTypes,
            image,
            steps,
        })
        let dietDB = await Diet.findAll({ 
            where: {name: diets}
        })
        recipeCreate.addDiets(dietDB);
        res.send('Succesfull');

    }catch(error){
        res.status(400).send(error); 
    }
})



module.exports = router