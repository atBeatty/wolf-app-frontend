
class API {

    // static loadCourses(){
    //     fetch(`${BASE_URL}/courses`)
    //     .then(resp => resp.json())
    //     .then(json => {
    //         json.forEach(att => {

    //             const id = att.id
    //             const name = att.name
    //             new Course(id, name)
    //         })
    //     })
    // }

    static updateScores(gameId, hole, scores){
        fetch(`http://localhost:3000/wolf_games/${gameId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                hole: `${hole}`,
                scores: `${scores}`,
                wolfGameId: `${gameId}`
            })
        }) 
        .then(resp => resp.json())
        .then(json => {
            const id = json.id
            const foursome_id = json.foursome[0].foursome_id
            const stakes = json.stakes
            const course_id = json.holes[0].course_id
            
            const newGameObj = new WolfGame(id, stakes, foursome_id, course_id)
            newGameObj.renderWithUpdatedScores()
            // document.querySelector(".stakes-container").innerHTML += `${json.holes[0].score}`
        })
        
        // newGameObj.renderWithUpdatedScores()

    }
// event.currentTarget.parentElement.parentElement.id



}