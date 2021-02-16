//function to request acronym from the backend and display it on page
function getAcronym() {
    //get entered acronym value
    let acronym = document.getElementById("acronym-text").value;

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
                console.log(words);
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
        xhr.send(JSON.stringify(acronym));
    }
}

//simple sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//async function to inform the users they can see the words' defintions by clicking on them
//  will display for 5 seconds each time an acronym is generated
async function showTip() {
    let tipEl = document.getElementById("tip-p");

    tipEl.style.display = "block";

    //await sleep(5000);

    sleep(5000).then(() => {
        tipEl.style.display = "none";
    })
}