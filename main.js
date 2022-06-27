

// set word will apper
const words =[ "java", "python", "css", "html", "javascript", "react", "bootstrap", "sass", "hallo" ];

// set level of game
const level = {
    "Esay": 5,
    "Normal": 3,
    "Hard": 2
}

// set defualt level of game
const defualtlevel = "Esay";
// set defualt secound level of game
const defualttime = level[defualtlevel];

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defualtlevel;
secondsSpan.innerHTML = defualttime;
timeLeftSpan.innerHTML = defualttime;
scoreTotal.innerHTML = words.length;

//دا عشان تمنع تحط حاجة انت ناسخها داخل الانبت بتاعك
input.onpaste = function (){
    return false;
}


startButton.onclick = function(){
    this.remove();
    input.focus()

    generate_words()
}

function generate_words(){
    // generate random words
    const random_word = words[Math.floor(Math.random() * words.length)];
    // get index for random_word
    const ind_word = words.indexOf(random_word);
    // remove this word from arry
    words.splice(ind_word, 1);

    //show word for game
    theWord.innerHTML =  random_word;

    //empaty upcoming word
    upcomingWords.innerHTML = ""

    //generate words in upcoming word
    for(let i=0; i < words.length; i++){
        const div = document.createElement("div"),
            txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div)
    }

    //call function startplay
    startplay()
}


//function for start play
function startplay(){
    timeLeftSpan.innerHTML = defualttime;
    const start = setInterval(function(){
        timeLeftSpan.innerHTML--
        if(timeLeftSpan.innerHTML == "0"){
            clearInterval(start)

            //compare bettween upcoming value & input value
            if(theWord.innerHTML.toLowerCase() === input.value.toLowerCase()){
        
                input.value = "";

                // callback function generate_words
                if(words.length > 0){
                    generate_words()
                }else{
                    const span = document.createElement("span"),
                    txt = document.createTextNode("Congratulation");
                    span.classList.add("good")
                    span.appendChild(txt);
                    finishMessage.appendChild(span);

                    upcomingWords.remove()
                }

                //increse scoreGot
                scoreGot.innerHTML++
            }else{
                const span = document.createElement("span"),
                    txt = document.createTextNode("Game Over");
                span.classList.add("bad")
                span.appendChild(txt);
                finishMessage.appendChild(span);
            }
        }
    }, 1000)
}