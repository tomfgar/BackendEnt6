const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();

        const testUser = {
            firstName: "Tomy",
            lastName: "Garcia",
            email: "tomy@gmail.com",
            password: "tomy26996",
            gender: "male",
        }

        await request(app).post('/users').send(testUser);
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();