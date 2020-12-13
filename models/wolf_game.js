class WolfGame {
    constructor(id, stakes, foursome_id, course_id){
        this.id = id
        this.stakes = parseFloat(stakes)
        this.foursome_id = foursome_id
        this.course_id = course_id
        // this.renderWolfGame()


        
    }

    renderWithUpdatedScores(holeNumber){
        debugger
        fetch(`http://localhost:3000/wolf_games/${this.id}`)
        .then(resp => resp.json())
        .then(json => {
            const scoreCard = document.getElementById("player-individual-strokes-container")
            debugger
            scoreCard.innerHTML +=`
            <div class="score-column" id=${this.id}-${holeNumber}><p>${json.holes[parseInt(holeNumber-1)].score}</p></div>`

        })
    }



    





    
    




    

    
}