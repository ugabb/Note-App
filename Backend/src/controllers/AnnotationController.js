const Annotations = require("../models/AnnotationData");


module.exports = {
    async read (req, res){
    const annotationList = await Annotations.find();
    return res.json(annotationList);
  },

  async create(req, res) {
    console.log(req.body)
    const { title, notes, priority } = req.body;


    const annotationCreated = await Annotations.create({
        title,
        notes,
        priority,
    });
    return res.json(annotationCreated);
  },
};
