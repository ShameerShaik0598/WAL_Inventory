const sequelize = require("../db.config");
const { DataTypes } = require("sequelize");

exports.Reviews = sequelize.define(
  "reviews",
  {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    review_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // customer_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    review_desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // product_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// (async () => await this.Reviews())();
