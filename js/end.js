const email = document.querySelector("#email")
const saveScoreBtn = document.querySelector("#saveScoreBtn")
const finalScore = document.querySelector("#finalScore")
const mostRecentScore = JSON.parse(localStorage.getItem('mostRecentScore'))
const form = document.querySelector("form")
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore
console.log(mostRecentScore)
form.addEventListener('submit', e => {	
    e.preventDefault();
    if(isEmail(email.value)){
        saveHighScore();
        window.location.assign('/pages/highscores.html')
    }
});


email.addEventListener('keyup', ()=>{
    saveScoreBtn.disabled = !email.value
})

saveHighScore = e =>{
    const score = {
        score: mostRecentScore,
        // email: email.value
    }

    highScores.push(score)

    highScores.sort((a,b)=>{
        return b.score - a.score
    })

    highScores.splice(5)
    localStorage.setItem('highScores', JSON.stringify(highScores))
}


function isEmail(email){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    //test regex against the email
}
