const Student = require('../models/students');

exports.getStudents = () => {
    return Student.find();
}

exports.getStudentsByClassroom = (year) => {
    return Student.find({ 'class': year });
}

exports.getStudentById = (id) => {
    return Student.findById(id);
}

exports.addStudent = (obj) => {
    const student = new Student(obj);
    return student.save();
}

exports.editStudent = (obj) => {
    return Student.updateOne({ _id: obj.id }, {
        $set: {
            name: obj.name,
            quote: obj.quote,
            image: obj.image,
            class: obj.class,
            body: obj.body
        }
    });
}

exports.deleteStudentById = (id) => {
    return Student.deleteOne({ _id: id }, function (err) {
        if (err) {
            return err;
        } else {
            return 'Deleted successfully';
        }
    });
}