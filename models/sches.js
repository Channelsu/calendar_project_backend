'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  sches.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    start_date: DataTypes.STRING,
    start_time: DataTypes.STRING,
    end_date: DataTypes.STRING,
    end_time: DataTypes.STRING,
    bar_color: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sches',
    underscored: true,
  });
  return sches;
};