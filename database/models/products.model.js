const sequelize = require("../db.config");
const { DataTypes } = require("sequelize");

exports.Products = sequelize.define(
  "products",
  {
    product_id: {
      type: DataTypes.INTEGER,
     primaryKey:true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    freezeTableName: true,
  }
);

// (async () => await this.Products())();
