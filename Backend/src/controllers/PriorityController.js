const Annotations = require('../models/AnnotationData');

module.exports = {

    // Mesmo nome, porem rotas diferentes!
    // Query Params
    async read(req, res){
        const priority = req.query;

        const priorityNotes = await Annotations.find(priority);

        return res.json(priorityNotes);
        // no Postman: Params-> {
        // key -> priority,
        // value -> true 
        //}
    },

    async updateBoolean(req, res) {
        const { id } = req.params;
        const annotation = await Annotations.findOne({_id:id});

        annotation.priority ? annotation.priority= false : annotation.priority = true;

        await annotation.save();
        return res.json(annotation);
    }

}