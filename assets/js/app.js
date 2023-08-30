'use strict';

const identification = document.querySelector(".identification");
const inputForName = identification[0];
const startBtn = identification[1];
const username = document.querySelector(".username");
const quiz = document.querySelector(".container-global");
const formQuiz = document.querySelector(".form-quiz");
let userResponses = [];
const goodResponses = ['c', 'b', 'c', 'c', 'c'];
const emojis = ["✅", "✨", "👀", "😭", "👎"];
const titleResult = document.querySelector(".resultats h2");
const noteResult = document.querySelector(".note");
const helpResult = document.querySelector(".aide");
const allQuestions = document.querySelectorAll(".question-block");
let finalResponses = [];

formQuiz.addEventListener("submit", (e)=> {
    e.preventDefault();

    for (let index = 1; index < 6; index++) {
        userResponses.push(document.querySelector(`input[name="q${index}"]:checked`).value);
    }

    compareResults(userResponses);
    userResponses = [];
});

function compareResults(userResponses) {
     for (let i = 0; i < 5; i++) {
        if (userResponses[i] === goodResponses[i]) {
            finalResponses.push(true);
        } else {
            finalResponses.push(false);
        }
     }

     showResults(finalResponses);
     colorsFunc(finalResponses);
     finalResponses = [];
}

function showResults(finalResponses) {
    const badResponses = finalResponses.filter(element => element !== true).length;
    switch (badResponses) {
        case 0:
            titleResult.innerHTML = `${emojis[0]} Bravo, c'est un sans faute ! ${emojis[0]}`;
            helpResult.innerHTML = "";
            noteResult.innerHTML = "5/5";
            playMusic()
            break;

        case 1:
            titleResult.innerHTML = `${emojis[1]} Tu y es presque ! ${emojis[1]}`;
            helpResult.innerHTML = "Retente une autre réponse dans la case rouge, puis re-valide !";
            noteResult.innerText = "4/5";
            playMusic()
            break;

        case 2:
            titleResult.innerHTML = `${emojis[1]} Encore un effort ! ${emojis[2]}`;
            helpResult.innerHTML = "Retente une autre réponse dans la case rouge, puis re-valide !";
            noteResult.innerText = "3/5";
            break;

        case 3:
            titleResult.innerHTML = `${emojis[2]} Tu peux mieux faire ! ${emojis[2]}`;
            helpResult.innerHTML  = "Retente une autre réponse dans les cases rouges, puis re-valide !";
            noteResult.innerText = "2/5";
            break;

        case 4:
            titleResult.innerHTML = `${emojis[3]} Tu as besoin d'une mise à jour ! ${emojis[3]}`;
            helpResult.innerHTML = "Retente une autre réponse dans les cases rouges, puis re-valide !";
            noteResult.innerText = "1/5";
            break;

        case 5:
            titleResult.innerHTML = `${emojis[4]} Allez, tu peux mieux faire ! ${emojis[4]}`;
            helpResult.innerHTML = "Retente une autre réponse dans les cases rouges, puis re-valide !";
            noteResult.innerText = "0/5";
            break;

        default:
            "Oups, cas inattendu.";
    }
}

function colorsFunc(finalResponses) {
    for (let j = 0; j < finalResponses.length; j++) {
        if (finalResponses[j] === true) {
            allQuestions[j].style.backgroundColor = "lightgreen";
        } else {
            allQuestions[j].style.backgroundColor = "#FFB8B8";
            allQuestions[j].classList.add("failed");
            setTimeout(() => {
                allQuestions[j].classList.remove("failed");
            }, 200);
        }
    }
}


allQuestions.forEach(element => {
    element.addEventListener("click", () => {
        element.style.backgroundColor = "white";
    });
});




function capitalizeUsername (word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase()
}

startBtn.addEventListener("click", () => {

    if (inputForName.value.length > 0) {
        const capitalizedUsername = capitalizeUsername(inputForName.value);
        username.innerHTML += `<b>${capitalizedUsername}</b>`;
        quiz.classList.toggle("inactive");
        identification.classList.toggle("inactive");
    } else {
        inputForName.style.borderColor = "red";
    }


    console.log(inputForName.value.length);
});

inputForName.addEventListener("keydown", (e) => {
    console.log(e);
    const key = e.key;

    if (key === "Enter") {
        e.preventDefault();
        if (inputForName.value.length > 0) {
            const capitalizedUsername = capitalizeUsername(inputForName.value);
            username.innerHTML += `<b>${capitalizedUsername}</b>`;
            quiz.classList.toggle("inactive");
            identification.classList.toggle("inactive");
        } else {
            inputForName.style.borderColor = "red";
        }
    }

    console.log(inputForName.value.length);
});

// FONCTION QUI JOUE LA MUSIQUE
function playMusic(){
    var music = new Audio("./assets/sounds/Booba.mp3");
    music.play();
};