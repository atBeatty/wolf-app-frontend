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
        .then(json => {
            debugger
            createNewWolfGame(json)
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Bad things! Ragnarők!");
          });
          document.querySelector(".stakes-container").classList.remove("hidden")
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
                                    


// attachPlayButtonEventListeners()



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
        // const {id, stakes, foursome_id, course_id} = gameObj
        // const newGame = new WolfGame(id, parseFloat(stakes))
        const newGame = new WolfGame()
        newGame.id = gameObj.id
        newGame.stakes = parseFloat(gameObj.stakes)
        newGame.foursome_id = parseInt(gameObj.foursome_id)
        newGame.course_id = parseInt(gameObj.course_id)
        // console.log(renderWolfGame(newGame), gameObj)
        document.querySelector(".wolf-game-container").id = `${gameObj.id}`
        renderWolfGame(newGame)
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Bad things! Can't create Wolf Game!");
    });
}


function renderWolfGame(game){
    debugger
    fetch(`${BASE_URL}/wolf_games/${game.id}`)
    .then(resp => resp.json())
    .then(json => {
        const initialsList = document.querySelector("#player-initials-list")
        debugger
        displayScorecard(json)
        
        json.foursome.forEach(golfer => {
            let golferInitials = document.createElement("h2")
            golferInitials.innerText = `${golfer.initials}`
            initialsList.appendChild(golferInitials)
        })
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Bad things! Can't render Wolf Game!");
      });
    addScoresToEachHole(game)
}


// Iterates over wolfGame.course.holes and fills wolf-game-container with hole info

function displayScorecard(wolfGame) {
    document.querySelector(".foursome-form").classList.add("hidden")
    wolfGame.holes.forEach(hole => {
        // debugger
        //your code to be executed after 1 second
        document.querySelector(".wolf-game-container").innerHTML += `
        <div class="hole-container horizontal-flex-container" id="${hole.number}">
        <div class="hole-info">
        <h2>${hole.number}</h2>
        <h3 id="yards"><span #id"yards-lbl">Yards</span><br> ${hole.yards}</h3>
        <h3 id="par"><span id="par-lbl">Par</span><br> ${hole.par}</h3>
        </div>
        <button class="send-strokes" data-id="${hole.id}">SEND<br>SCORE</button>
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
        document.querySelectorAll(".player-row").forEach(row => {
            row.innerHTML += `
            <div data-courseId=${json.holes[0].id}>
            <button class="ticker-button" value=-2>-2</button>
            <button class="ticker-button" value=-1>-1</button>
            <button class="ticker-button" value=0>0</button>
            <button class="ticker-button" value=1>+1</button>
            <button class="ticker-button" value=2>+2</button>
            </div>
            <h3 class="player-strokes"></h3>`
            
        })
        addEventListenersToSendScoreButtons()
        updateDOMScorecard()
    })
}

function updateDOMScorecard(){
    // document.querySelectorAll()
    document.querySelectorAll(".ticker-button").forEach(ticker => {
        ticker.addEventListener("click", event => {
            const par = event.currentTarget.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.innerText.slice(-1)
            let currentScoreToPar = event.currentTarget.value
            let playerStrokes = event.currentTarget.parentElement.nextElementSibling
            playerStrokes.innerText = parseInt(par) + parseInt(currentScoreToPar)
            
        })
    })
        
}


// function do something weith new ascore updateScorecardWithButtons



function addEventListenersToSendScoreButtons(){
    const allSendStrokesButtons = document.querySelectorAll(".send-strokes")

    allSendStrokesButtons.forEach(sendBtn => {

        sendBtn.addEventListener("click", (event) => {
            const wolfGameId = document.querySelector(".wolf-game-container").id
            // const courseId = event.currentTarget.parentElement.id
            const hole = event.currentTarget.parentElement.id
            let scoresFromHoleArray = []        
            
            event.currentTarget.parentElement.querySelectorAll(".player-strokes").forEach(score => scoresFromHoleArray.push(score.innerText))
            console.log(hole, "HOLE", scoresFromHoleArray)


            
            API.updateScores(wolfGameId, hole, scoresFromHoleArray)
        })
        
    })
}
