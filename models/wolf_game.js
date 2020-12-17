class WolfGame {
    constructor(id, stakes, foursome_id, course_id){
        this.id = id
        this.stakes = parseFloat(stakes)
        this.foursome_id = foursome_id
        this.course_id = course_id
    }

    renderWithUpdatedScores(holeNumber){
        fetch(`http://localhost:3000/wolf_games/${this.id}`)
        .then(resp => resp.json())
        .then(json => {
            const scoreCard = document.getElementById("player-individual-strokes-container")
            const scoreColumnId = `${this.id}-${holeNumber}`
            if (document.getElementById(scoreColumnId)) {
                document.getElementById(scoreColumnId).innerHTML = `
                <h3>${holeNumber}</h3>
                <h6>${json.holes[parseInt(holeNumber)-1].score.toString()[0]}</h6>
                <h6>${json.holes[parseInt(holeNumber)-1].score.toString()[1]}</h6>
                <h6>${json.holes[parseInt(holeNumber)-1].score.toString()[2]}</h6>
                <h6>${json.holes[parseInt(holeNumber)-1].score.toString()[3]}</h6>
                `

            } else {

                scoreCard.innerHTML +=`
                <div class="score-column" id=${this.id}-${holeNumber}>
                <h3>${holeNumber}</h3>
                    <h6>${json.holes[parseInt(holeNumber)-1].score.toString()[0]}</h6>
                    <h6>${json.holes[parseInt(holeNumber)-1].score.toString()[1]}</h6>
                    <h6>${json.holes[parseInt(holeNumber)-1].score.toString()[2]}</h6>
                    <h6>${json.holes[parseInt(holeNumber)-1].score.toString()[3]}</h6>
                </div>`
            }
        })
    }





    





    
    




    

    
}