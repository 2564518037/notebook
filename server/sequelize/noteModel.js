import { DataTypes } from 'sequelize';
import sequelize from "./server.js";

const Note = sequelize.define(
  'Note',
  {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName:'notes',
    timestamps:true,
    createdAt: 'createdAt',
  }
  
);

export default Note;