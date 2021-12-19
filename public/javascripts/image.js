window.onload = closeLibrary;

function saveFile() {
    var formData = new FormData();
    let file = document.getElementById('image').files[0];
    formData.append("image", file);
    axios.post(HOME_URL + 'admin/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(function (response) {
        showImages();
    });
}

function showImages() {
    axios.get(HOME_URL + 'images/').then(function (response) {
        var library = document.getElementById('library');
        library.innerHTML = '';
        for (let url of response.data) {
            let image = document.createElement('img');
            image.setAttribute('src', HOME_URL + 'images/' + url);
            image.setAttribute('id', url);
            image.setAttribute('onclick', 'selectImage("' + url + '")');
            library.appendChild(image);
        }
    });
}

function openLibrary() {
    document.getElementById('libraryMain').style.display = 'block';
    showImages();
}

function closeLibrary() {
    document.getElementById('libraryMain').style.display = 'none';
}

function selectImage(url) {
    document.getElementById('chosenImage').setAttribute('src', HOME_URL+'images/' + url);
    document.getElementById('chosenImage').setAttribute('class', url);
}
