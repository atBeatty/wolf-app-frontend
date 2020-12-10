class WolfGame {
    constructor(id, stakes, foursome_id, course_id){
        this.id = id
        this.stakes = parseFloat(stakes)
        this.foursome_id = foursome_id
        this.course_id = course_id
        this.renderWolfGame()


        
    }

    // renderWolfGame(){
    //     debugger
    //     document.querySelector(".wolf-game-container").innerHTML += `
    //     <h2>${this.stakes}</h2>
    //     <h2>${this.foursome}</h2>`
       
    // }

    // static renderWolfGame(){
    //     newWolfGameForm.innerHTML = `<h2>Welcome</h2><form class="new-wolf-game">
    //     <label for="stakes">Stakes</label>
    //     <input type="text" name="stakes">
    //     <label for="foursome_id">Foursome_ID</label>
    //     <input type="text" name="foursome">
    //     <input type="submit" value="Submit" id="new-wolf-submit">
    //     </form>`

    //     mainElement.prepend(newWolfGameForm)
    //     document.getElementById("new-wolf-submit").addEventListener("submit", addGolfer(e))
    // }




    

    
}