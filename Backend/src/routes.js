const express = require("express");
const routes = express.Router();

const AnnotationController = require('./controllers/AnnotationController');

// Routes.get
// Routes.post
// Routes.delete
// Routes.put


// Rota Annotations
routes.get("/annotations", AnnotationController.read);
routes.post("/annotations", AnnotationController.create);
routes.delete('/annotations/:id',AnnotationController.delete);


module.exports = routes;
