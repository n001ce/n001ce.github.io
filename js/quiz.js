const question = document.querySelector("#question")
const choices = Array.from(document.querySelectorAll(".choice-text"))
const progressText = document.querySelector("#progressText")
const scoreText = document.querySelector("#score")
const progressBarFull = document.querySelector("#progressBarFull")

let currentQ = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let quiz = [
    {
        question: "Who tricks Naruto into stealing a scroll in the first episode of the series?",
        choice1: "Iruka",
        choice2: "Mizuki",
        choice3: "Hiruzen",
        choice4: "Mitsuki",
        answer: 2,
        message: "Mizuki tricks Naruto into stealing the Scroll of Sealing, and that's how he learns his signature multi shadow clone jutsu. So, honestly, it all turned out just fine."
    },
    {
        question: "What is the name of Zabuza's sword?",
        choice1: "Haku",
        choice2:"Shark Skin/Samehada",
        choice3: "Hemlsplitter/Kabutowari",
        choice4: "Executioner's Blade/Kubikiribocho",
        answer: 4,
        message: "As a member of the Seven Ninja Swordsmen of the Mist, Zabuza wielded the Executioner's Blade/Kubikiribocho. Haku saw himself as Zabuza's \"tool,\" but he wasn't a literal sword."
    },
    {
        question: "Which team isn't included in the \"Rookie 9\" classification of the Chunin Exams?",
        choice1: "Team 7",
        choice2:"Team Guy",
        choice3: "Team 8",
        choice4: "Team 10",
        answer: 2,
        message: "Team Guy isn't part of the \"Rookie 9\" classification during the Chunin Exams because Neji, Lee, and Tenten have already been an official team for a year by that point. Teams 7, 8, and 10 are fresh out of the Ninja Academy."
    },
    {
        question: "Which of Gambunta's sons does Naruto accidentally summon during his fight against Gara?",
        choice1: "Gamakichi",
        choice2:"Gamamaro",
        choice3: "Gamatatsu",
        choice4: "Gamaken",
        answer: 1,
        message: "Naruto accidentally summons Gamakichi during his fight against Gaara, but he's later able to summon Gamabunta to fight off Shukaku when the battle gets a bit too crazy."
    },
    {
        question: "Who are Itachi and Kisame looking for when they first arrive in Konoha together?",
        choice1: "Kakashi",
        choice2:"Nobody",
        choice3:"Sasuke",
        choice4: "Naruto",
        answer: 4,
        message: "The Akatsuki is trying to gather all of the tailed beasts, so Itachi and Kisame's objective is to capture Naruto. Luckily, he's not even in the village at this point in time."
    },
    {
        question: "Why is Kakashi always late?",
        choice1: "He gets lost on the path of life",
        choice2:"He visits the Hokage daily",
        choice3: "He visits the Memorial Stone",
        choice4: "He's reading Jiraiya's novels",
        answer: 3,
        message: "Kakashi makes up tons of excuses for why he's always late, but the real reason is that he pays tribute to his fallen friends at the Memorial Stone every day."
    },
    {
        question: "Which members of the Sound Village go to Konoha to bring Sasuke back to Orochimaru?",
        choice1: "Jirobo, Kidomaru, Kimimaro, Ukon",
        choice2:"Jirobo, Kidomaru, Kabuto, Sakon",
        choice3: "Kidomaru, Tayuya, Sakon, Ukon",
        choice4: "Jirobo, Kidomaru, Tayuya, Sakon, Ukon",
        answer: 4,
        message: "The group is called the Sound Four, but technically it consists of Jirobo, Kidomaru, Tayuya, Sakon, and Ukon. Sakon and Ukon often share a single body. Those five are the ones who meet Sasuke in Konoha before he leaves."

    },
    {
        question: "Which of the Eight Gates does Rock Lee stop at against Gaara in the Chunin Exams?",
        choice1: "5th Gate: The Gate of Closing",
        choice2:"4th Gate: The Gate of Pain",
        choice3: "6th Gate: The Gate of Joy",
        choice4: "3rd Gate: The Gate of Life",
        answer: 1,
        message: "Rock Lee opens up five of the Eight Gates in his action-packed fight against Gaara. He opens the Gate of Closing just before performing the Hidden Lotus."
    },
    {
        question: "How many times does Naruto use the Nine Tails' power in Part 1 of the series?",
        choice1: "7",
        choice2:"4",
        choice3: "5",
        choice4: "9",
        answer: 1,
        message: "In Part 1, Naruto uses the Nine Tails' power these seven times: against Haku, against Orochimaru, to summon Gamabunta while training, against Neji, against Gaara, against Kimimaro, and finally, against Sasuke. Naruto uses that power more than a few times as a kid."
    },
    {
        question: "What is the Eight Tails' real name?",
        choice1: "Chomei",
        choice2:"Saiken",
        choice3: "Gyuki",
        choice4: "Matatabi",
        answer: 3,
        message: "Every tailed beast has a name, and the Eight Tails is named Gyuki. Naruto learns them all late in the series, and even he has trouble remembering them all."
    },
    {
        question: "Which one of the five major Hidden Villages is the only one to never produce a member of the Akatsuki?",
        choice1:"Hidden Sound",
        choice2:"Hidden Cloud",
        choice3:"Hidden Mist",
        choice4:"Hidden Stone", 
        answer: 2,
        message: "The Village Hidden in the Clouds is the only one of the five great nations that hasn't produced an Akatsuki member. This is one of the reasons that the Raikage doesn't trust the rest of them at the Kage Summit."
    },
    {
        question: "Which former Kage was also the Jinchuriki of the Three Tails?",
        choice1: "Yagura Karatachi",
        choice2:"A",
        choice3: "Gaara",
        choice4: "Mu",
        answer: 1,
        message: "The Fourth Mizukage, Yagura Karatachi, was the Jinchuriki of the Three Tails before he died. This is kind of a big deal since he's the only Kage to live for quite some time with a Tailed Beast inside him."
    },
    {
        question: "The red spiral on the back of Konoha vests symbolizes friendship with which clan?",
        choice1: "Senju",
        choice2: "Uzumaki",
        choice3: "Namikaze",
        choice4: "Uchiha",
        answer: 2,
        message: "The red spiral pattern on the Leaf Village vests represents a friendship with the Hidden Eddy Village, home of the Uzumaki clan. The symbol is red, just like their hair, and the spiral is similar to their sealing jutsu."
    },
    {
        question: "Which Tailed Beast did Rin have inside her?",
        choice1:"Isobu",
        choice2:"Yonbi",
        choice3: "Matatabi",
        choice4: "Saiken",
        answer: 1,        
        message: "Rin was forced to become the Three Tails (Isobu) Jinchuriki shortly before she tragically lost her life in front of Kakashi."
    },
    {
        question: "What is the name of Madara Uchiha's grand plan?",
        choice1: "Project Tsukuyomi",
        choice2:"Project Tsukigakure",
        choice3: "Project Tsuki no Me",
        choice4: "Infinite Tsukuyomi",
        answer: 3,
        message: "Madara Uchiha's overly complicated and convoluted plan is named Project Tsuki no Me. He wanted to cast a worldwide genjutsu with an Infinite Tsukuyomi."
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () =>{
    questionCounter=0
    score = 0
    availableQuestions = [...quiz]
    getNewQuestion()
}

getNewQuestion = () =>{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/pages/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice=>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
}

choices.forEach(choice=>{
    choice.addEventListener('click', e=>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
            setTimeout(()=>{
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()
            }, 1000)
        }else{
            question.innerText = currentQuestion.message
            setTimeout(()=>{
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()
            }, 8000)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        
    })
})

incrementScore = num =>{
    score +=num
    scoreText.innerText = score
}

startGame()
