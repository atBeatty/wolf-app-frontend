
class API {

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
            // console.log("updated then return this", newGameObj)
            newGameObj.renderWithUpdatedScores(hole)
            // document.querySelector(".stakes-container").innerHTML += `${json.holes[0].score}`
        })
    }
}