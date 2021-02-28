//function to request acronym from the backend and display it on page
function getAcronym() {
    //get entered acronym and swear check values
    let acronym = document.getElementById("acronym-text").value;
    let swearCheck = document.getElementById("swears-check").value == "on" ? true : false;

    let viewModel = {
        "acronym": acronym,
        "noSwears": swearCheck
    };

    let sendData = {
        "jsonString": JSON.stringify(viewModel)
    }

    //acronyms need to be at least two characters
    if (acronym.length > 1) {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            //when the request goes through, fill out the page with the generated acronym
            if (4 == this.readyState && 200 == this.status) {
                let response = JSON.parse(this.responseText);

                //set abrv of acronym value
                document.getElementById("acronym-letters").innerHTML = response.acronym;

                //get the phrase and split it into an array of words - also clear the acronym-words element
                let acronymWords = document.getElementById("acronym-words");
                let words = response.phrase.split(" ");
                acronymWords.innerHTML = "";

                //create an anchor tag that links to the dictionary definition of each generated word
                for (let i = 0; i < words.length; i++) {
                    let appendValue = `<a href="https://www.merriam-webster.com/dictionary/${words[i]}" target="_blank">${words[i]} </a>`;
                    acronymWords.insertAdjacentHTML('beforeend', appendValue);
                }

                //toggle the "tip" of being able to click on words
                showTip();
            }
        }

        //actually send the request
        xhr.open('POST', '/api/acronym');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(sendData));
    }
}

//simple sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//async function to inform the users they can see the words' defintions by clicking on them
//  will display for 5 seconds each time an acronym is generated
async function showTip() {
    //if the definition tip has been shown in the past day, don't display it again
    if ("true" != getCookie("shownTip")) {
        let tipEl = document.getElementById("tip-p");

        tipEl.style.display = "block";

        //await sleep(5000);

        sleep(5000).then(() => {
            tipEl.style.display = "none";
        });

        setCookie("shownTip", "true", 1);
    }
}

//simple function to set a cookie with a name, value, and n days until expiration
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//function to retrieve value of a given cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}