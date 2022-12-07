const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore:{
      type: DataTypes.FLOAT
    },
    dishTypes:{
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.STRING
    },
    steps: {
      type: DataTypes.TEXT
    }
  },
  {
    timestamps: false
  });
};
