const sequelize = require("../db.config");
const { DataTypes } = require("sequelize");


exports.Orders = sequelize.define(
  "orders",
  { 
    order_id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    customer_id: {
      type: DataTypes.INTEGER,
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

// (async () => await this.Orders())();
