class WolfGame {
    constructor(id, stakes, foursome_id, course_id){
        this.id = id
        this.stakes = parseFloat(stakes)
        this.foursome_id = foursome_id
        this.course_id = course_id
        // this.renderWolfGame()


        
    }

    renderWithUpdatedScores(){
        debugger
        fetch(`http://localhost:3000/wolf_games/${this.id}`)
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
        })
    }

    





    
    




    

    
}