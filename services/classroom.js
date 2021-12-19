const Classroom = require('../models/classroom');

exports.getClassrooms = () => {
    return Classroom.find();
}

exports.getClassroomByYear = (year) => {
    return Classroom.findOne({ 'year': year });
}

exports.addClassroom = (obj) => {
    const classroom = new Classroom(obj);
    return classroom.save();
}

exports.editClassroom = (obj) => {
    return Classroom.updateOne({ _id: obj.id }, {
        $set: {
            name: obj.name,
            year: obj.year,
            image: obj.image,
            style: obj.style,
            description: obj.description
        }
    });
}

exports.deleteClassroomById = (id) => {
    return Classroom.deleteOne({ _id: id }, function (err) {
        if (err) {
            return err;
        } else {
            return 'Deleted successfully';
        }
    });
}