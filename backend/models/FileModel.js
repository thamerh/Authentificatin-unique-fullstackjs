import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

    const File = db.define("files", {
        image: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING,

        },
        description: {
            type: DataTypes.TEXT
        }
       
        });

 export default  File;