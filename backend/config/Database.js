
import {Sequelize} from "sequelize";

const db = new Sequelize('Portal_Auth','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;