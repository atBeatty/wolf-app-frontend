const BASE_URL = "http://localhost:3000"

function renderCourses(){
    
    fetch(`${BASE_URL}/courses`)
    .then(resp => resp.json())
    .then(json => {

        
        json.forEach(course => {
            // debugger
            coursesElement.innerHTML += `
            <div class="course-pick">
            <h2>${course.name}</h2>
            </div>
            <button class="play-button" data-id="${course.id}">Play Course!</button>`

        })

        attachPlayButtonEventListeners()
    })

}

const coursesElement = document.querySelector(".courses-container")
const mainElement = document.querySelector("main")

// // ADD EVENT LISTENERS TO FORM SUBMITS

function createAllFormElements(){
    document.querySelector(".form-box").innerHTML += `

    <form class="foursome-form hidden">
    <h2>New Foursome</h2>
    <label name="teeTime">Tee Time</label>
    <input type="datetime-local" name="teeTime" placeholder="Tee Time">
    <label name="initials">Player 1 Initials</label>
    <input type="text" name="initials" placeholder="XYZ">
    <label name="initials">Player 2 Initials</label>
    <input type="text" name="initials" placeholder="XYZ">
    <label name="initials">Player 3 Initials</label>
    <input type="text" name="initials" placeholder="XYZ">
    <label name="initials">Player 4 Initials</label>
    <input type="text" name="initials" placeholder="XYZ">
    <input class="submit" type="submit" value="Submit">
    </form>
   
    <form class="wolf-game-form hidden">
    <h2>New Game of Wolf</h2>
    <label name="stakes">Stakes</label>
        <input type="number" name="stakes" placeholder="$$">
    <label name="foursome_id">Foursome</label>
        <input type="number" name="foursome_id">
    <label name="course_id">Course</label>
        <input type="number" name="course_id">
    <input class="submit" type="submit" value="Submit">
    </form>
   

    <form class="golfer-form hidden">
    <h2>New Golfer</h2>
    <label name="initials">Player 1Initials</label>
    <input type="text" name="initials" placeholder="XYZ">
    <input class="submit" type="submit" value="Submit">
    </form>`
}

function addEventToSubmitFoursome(){
    document.querySelector(".foursome-form").addEventListener("submit", function(event){
        event.preventDefault()
        console.log(event.currentTarget.querySelectorAll("input").forEach(input => console.log(input.value)))
        let teeTime = event.currentTarget.querySelectorAll("input")[0].value
        let p1 = event.currentTarget.querySelectorAll("input")[1].value
        let p2 = event.currentTarget.querySelectorAll("input")[2].value
        let p3 = event.currentTarget.querySelectorAll("input")[3].value
        let p4 = event.currentTarget.querySelectorAll("input")[4].value
        // console.log(teeTime, p1, p2, p3)
        
        fetch(`${BASE_URL}/foursomes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                teeTime: `${teeTime}`,
                golfers: [{
                    
                    initials: `${p1}`
                },
                {
                    initials: `${p2}`
                },
                {
                    initials: `${p3}`
                },
                {
                    initials: `${p4}`
                }]
            })
        })
        .then(resp => resp.json())
        .then(json => createNewWolfGame(json))
        
    })
}
    
    

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    createAllFormElements()
    renderCourses()
    addEventToSubmitFoursome()
});


function attachPlayButtonEventListeners(){
    // debugger
    const allPlayButtons = document.querySelectorAll(".play-button")
    allPlayButtons.forEach(button => {
        button.addEventListener("click", event => {
            // mainElement.innerHTML = ''
            coursesElement.classList.add("hidden")
            document.querySelector(".foursome-form").classList.remove("hidden")
            document.querySelector(".foursome-form").dataset.id = event.currentTarget.dataset.id


            // loadChosenCourse(event)
            // createWolfGame(event)
        })
    })
}
                                    


attachPlayButtonEventListeners()



function createNewWolfGame(json){
    let course_id = document.querySelector(".foursome-form").dataset.id

    fetch(`${BASE_URL}/wolf_games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            stakes: `40`,
            course_id: `${course_id}`, 
            foursome_id: `${json.id}`,
        })
    })
    .then(resp => resp.json())
    .then(gameObj => {
        const newGame = new WolfGame()
        newGame.id = gameObj.id
        newGame.stakes = parseFloat(gameObj.stakes)
        newGame.foursome_id = parseInt(gameObj.foursome_id)
        newGame.course_id = parseInt(gameObj.course_id)
        // console.log(renderWolfGame(newGame), gameObj)
        renderWolfGame(newGame)
    })
}


function renderWolfGame(game){

    fetch(`${BASE_URL}/wolf_games/${game.id}`)
    .then(resp => resp.json())
    .then(json => {
        const stakesContainer = document.querySelector(".stakes-container")

        displayScorecard(json)
        json.foursome.forEach(golfer => {
            let golferInitials = document.createElement("h2")
            golferInitials.innerText = `${golfer.initials}`
            stakesContainer.appendChild(golferInitials)
        })


    
    })
    addScoresToEachHole(game)
}


// Iterates over wolfGame.course.holes and fills wolf-game-container with hole info

function displayScorecard(wolfGame) {
    document.querySelector(".foursome-form").classList.add("hidden")
    wolfGame.holes.forEach(hole => {
        // debugger
            //your code to be executed after 1 second
            document.querySelector(".wolf-game-container").innerHTML += `
            <div class="hole-container" id="${hole.number}">
            <div class="hole-info">
            <h2>${hole.number}</h2>
            <h3>Yards - ${hole.yards}</h3>
            <h3>Par - ${hole.par}</h3>
            </div>
            <button class="strokes" value="hole-played">Send Score</button>
            </div>`

    })
}

function addScoresToEachHole(wolfGame){
    fetch(`${BASE_URL}/wolf_games/${wolfGame.id}`)
    .then(resp => resp.json())
    .then(json => {
        console.log(json)
        
        document.querySelectorAll(".hole-container").forEach(hole => {
            let wolf = parseInt(hole.id)%4
            if (wolf === 0) wolf = 4

            hole.innerHTML += `<div class="players-container">
            <section class="player-row">${json.foursome[0].initials}</section>
            <section class="player-row">${json.foursome[1].initials}</section>
            <section class="player-row">${json.foursome[2].initials}</section>
            <section class="player-row">${json.foursome[3].initials}</section>
            </div>`

            hole.querySelector(`section:nth-child(${wolf}`).classList.add("wolf")
        })
    })
    
}





