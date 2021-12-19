const { response } = require('express');
var express = require('express');
var multer = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/images/');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = 1E13 - Date.now() + '-' + Math.round(Math.random() * 1E5);
		cb(null, uniqueSuffix + '-' + file.fieldname + '-' + file.originalname);
	}
});
var upload = multer({ storage: storage });
var router = express.Router();
var { addClassroom, getClassrooms, getClassroomByYear, editClassroom, deleteClassroomById } = require('../services/classroom');
var { addStudent, getStudents, getStudentById, editStudent, deleteStudentById } = require('../services/students');
var { haveAccess, newAccess } = require('../services/access');
var fs = require('fs-extra');
var styles;
var HOME_URL = process.env.HOME_URL;
fs.readJson('./config.json').then(res => {
	styles = res.styles;
}).catch(err => {
	console.error(err);
});

router.get('/', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		getClassrooms().then((classrooms) => {
			getStudents().then((students) => {
				res.render('admin', { title: 'Կառավարակետ', classrooms: classrooms.length, students: students.length, HOME_URL });
			})
		})
	} else {
		res.redirect(HOME_URL + 'admin/login')
	}
});

router.get('/readme/:article', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		fs.readFile('./readme/' + req.params.article + '.html', 'utf8', (err, result) => {
			if (result) {
				res.send(result);
			} else {
				res.status((err) ? err.status : 500);
				res.render('error');
			}
		});
	} else {
		res.redirect(HOME_URL + 'admin/login')
	}
});
router.get('/logout', function (req, res, next) {
	res.cookie('access', '', { httpOnly: true });
	res.redirect(HOME_URL + 'admin');
});

router.get('/login', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		res.redirect(HOME_URL + 'admin');
	} else {
		res.cookie('access', '', { httpOnly: true });
		res.render('login', { title: 'Մուտք', HOME_URL, warning: true });
	}
});

router.post('/login', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		res.redirect(HOME_URL + 'admin');
	} else {
		res.cookie('access', newAccess(req.body.username, req.body.password), { httpOnly: true });
		res.redirect(HOME_URL + 'admin');
	}
});

router.post('/upload', upload.single('image'), function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		res.send('/images/' + req.file.filename);
	} else {
		res.redirect(HOME_URL + 'admin/login')
	}
});

router.get('/classrooms', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		getClassrooms().sort({ year: 'desc' }).exec((err, classrooms) => {
			res.render('adminTable', { table: classrooms, title: 'Դասարաններ', HOME_URL });
		});
	} else {
		res.redirect(HOME_URL + 'admin/login')
	}
});

router.delete('/delete/class/:class', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		deleteClassroomById(req.params.class).then((response) => {
			res.send(response);
		});
	} else {
		res.redirect(HOME_URL + 'admin/login')
	}
});

router.get('/students', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		getStudents().sort({ class: 'desc' }).exec((err, students) => {
			res.render('adminTable', { table: students, title: 'Սովորողներ', HOME_URL });
		});
	} else {
		res.redirect(HOME_URL + 'admin/login')
	}
});

router.delete('/delete/student/:student', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		deleteStudentById(req.params.student).then((response) => {
			res.send(response);
		});
	} else {
		res.redirect(HOME_URL + 'admin/login')
	}
});

router.get('/new/class', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		res.render('adminClass', { styles, title: 'Ավելացնել դասարան', HOME_URL });
	} else {
		res.redirect(HOME_URL + 'admin/login')
	}
});

router.post('/new/class', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		addClassroom(req.body).then((response) => {
			res.send(response);
		});
	} else {
		res.redirect(HOME_URL + 'admin/login')
	}
});

router.get('/new/student', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		getClassrooms().then((classrooms) => {
			res.render('adminStudent', { classrooms, title: 'Ավելացնել սովորող', HOME_URL });
		});
	} else {
		res.redirect(HOME_URL + 'admin/login')
	}
});

router.post('/new/student', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		addStudent(req.body).then((response) => {
			res.send(response);
		});
	} else {
		res.redirect(HOME_URL + 'admin/login')
	}
});

router.get('/edit/class/:classroom', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		getClassroomByYear(req.params.classroom).then((classroom) => {
			res.render('adminClass', { styles, class: classroom, title: 'Խմբագրել դասարան', HOME_URL });
		});
	} else {
		res.redirect(HOME_URL + 'admin/login')
	}
});

router.post('/edit/class/:classroom', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		editClassroom(req.body).then((response) => {
			res.send(response);
		});
	} else {
		res.redirect(HOME_URL + 'admin/login')
	}
});

router.get('/edit/student/:student', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		getClassrooms().then((classrooms) => {
			getStudentById(req.params.student).then((student) => {
				res.render('adminStudent', { classrooms, student, title: 'Խմբագրել սովորող', HOME_URL });
			})
		});
	} else {
		res.redirect(HOME_URL + 'admin/login')
	}
});

router.post('/edit/student/:student', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		editStudent(req.body).then((response) => {
			res.send(response);
		});
	} else {
		res.redirect(HOME_URL + 'admin/login')
	}
});

module.exports = router;
