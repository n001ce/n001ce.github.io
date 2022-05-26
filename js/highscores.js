const highScoresTable = document.querySelector('#highScoresTable')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

for(let i = 1; i <= highScores.length; i++){
    let row = highScoresTable.insertRow(i);
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)

    cell1.innerHTML = highScores[i].email
    cell2.innerHTML = highScores[i].score
}
