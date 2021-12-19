function addClass() {
    axios.post(HOME_URL + 'admin/new/class', {
        name: document.getElementById('name').value,
        year: document.getElementById('year').value,
        image: '/images/' + document.getElementById('chosenImage').className,
        style: document.getElementById('style').value,
        description: description.root.innerHTML,
    }).then(function (response) {
        window.location.href = HOME_URL + 'admin/classrooms';
    });
}

function saveClass(id) {
    axios.post(HOME_URL + 'admin/edit/class/' + id, {
        id,
        name: document.getElementById('name').value,
        year: document.getElementById('year').value,
        image: '/images/' + document.getElementById('chosenImage').className,
        style: document.getElementById('style').value,
        description: description.root.innerHTML,
    }).then(function (response) {
        window.location.href = HOME_URL + 'admin/classrooms';
    });
}

function addStudent() {
    axios.post(HOME_URL + 'admin/new/student', {
        name: document.getElementById('name').value,
        image: '/images/' + document.getElementById('chosenImage').className,
        quote: document.getElementById('quote').value,
        body: body.root.innerHTML,
        class: document.getElementById('class').value,
    }).then(function (response) {
        window.location.href = HOME_URL + 'admin/students';
    });
}

function saveStudent(id) {
    axios.post(HOME_URL + 'admin/edit/student/' + id, {
        id,
        name: document.getElementById('name').value,
        quote: document.getElementById('quote').value,
        image: '/images/' + document.getElementById('chosenImage').className,
        class: document.getElementById('class').value,
        body: body.root.innerHTML,
    }).then(function (response) {
        window.location.href = HOME_URL + 'admin/students';
    });
}

function deleteStudent(id) {
    axios.delete(HOME_URL + 'admin/delete/student/' + id);
    document.getElementById(id).style.display = "none";
}

function deleteClass(id) {
    axios.delete(HOME_URL + 'admin/delete/class/' + id);
    document.getElementById(id).style.display = "none";
}

function search() {
    var input = document.getElementById("search");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("table").getElementsByTagName("tr");
    for (let tr of table) {
        if (!(tr.getElementsByTagName('th')[0])) {
            let visible = false;
            let i = 0;
            for (let td of tr.getElementsByTagName('td')) {
                i++;
                if (i == 6) { continue }
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    visible = true
                }
            }
            if (visible) {
                tr.style.display = '';
            } else {
                tr.style.display = 'none';
            }
        }
    }
}