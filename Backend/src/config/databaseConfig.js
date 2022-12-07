const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config();
mongoose.set('strictQuery', true)

const dbConfig = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ss689pj.mongodb.net/annotations?retryWrites=true&w=majority`;

// const connectToDatabase = async () => {
//     await mongoose.connect(dbConfig,(error) =>{
//         if(error){
//             console.log('Ocorreu um erro ao se conectar com o banco de DADOS',error)
//         }
//         return console.log("Conectou com sucesso!!!");
//     })
// }

const connectToDatabase = mongoose.connect(dbConfig, {
    useNewUrlParser:true,
    useUnifiedTopology:true
});


module.exports = connectToDatabase;