const Annotations = require("../models/AnnotationData");

const read = async (req, res) => {
    const annotationList = await Annotations.find();
    return res.json(annotationList);
}

module.exports = read;

// module.exports = {
// //   const read = async (req, res) => {
// //     const annotationList = await Annotations.find();
// //     return res.json(annotationList);
// //   },

// //   create(req, res) {
// //     const { title, notes, priority } = req.body;
// //     console.log(title);
// //     console.log(notes);
// //     console.log(priority);
// //   },
// };
