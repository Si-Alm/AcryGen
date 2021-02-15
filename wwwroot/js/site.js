function getAcronym() {
    let acronym = document.getElementById("acronym-text").value;

    if (acronym.length > 1) {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (4 == this.readyState && 200 == this.status) {
                let response = JSON.parse(this.responseText);
                document.getElementById("acronym-letters").innerHTML = response.acronym;
                // document.getElementById("acronym-words").innerHTML = response.phrase;

                let acronymWords = document.getElementById("acronym-words");
                acronymWords.innerHTML = "";

                let words = response.phrase.split(" ");

                for (let i = 0; i < words.length; i++) {
                    let appendValue = `<a href="https://www.merriam-webster.com/dictionary/${words[i]}" target="_blank">${words[i]} </a>`;
                    acronymWords.insertAdjacentHTML('afterbegin', appendValue);
                }

                showTip();
            }
        }

        //specify header and route
        xhr.open('POST', '/api/acronym');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(acronym));
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function showTip() {
    let tipEl = document.getElementById("tip-p");

    tipEl.style.display = "block";

    //await sleep(5000);

    sleep(5000).then(() => {
        tipEl.style.display = "none";
    })
}