function getAcronym() {
    let acronym = document.getElementById("acronym-text").value;

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (4 == this.readyState && 200 == this.status) {
            let response = JSON.parse(this.responseText);
            document.getElementById("acronym-letters").innerHTML = response.acronym;
            document.getElementById("acronym-words").innerHTML = response.phrase;
        }
    }

    //specify header and route
    xhr.open('POST', '/api/acronym');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(acronym));
}
