const express = require("express");
const routes = require('./routes');
const cors = require('cors');
const Annotations = require("./controllers/AnnotationController");

const app = express();
require('./config/databaseConfig');


app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/annotations'), async (req, res) => {
    const annotationList = await Annotations.find();
    return res.json(annotationList);
}


const port = 3333;
app.listen(port, () => console.log("Rodando em", port));
