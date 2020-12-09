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
    // let [hour, minute, second] = new Date().toLocaleTimeString("en-US").split(/:| /)
    document.querySelector(".form-box").innerHTML += `

    <div>
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
    </form>
    </div>`
}

// createAllFormElements()


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
    
    



function attachPlayButtonEventListeners(){
    // debugger
    const allPlayButtons = document.querySelectorAll(".play-button")
    allPlayButtons.forEach(button => {
        button.addEventListener("click", event => {
            // mainElement.innerHTML = ''
            loadChosenCourse(event)
            debugger
            // createWolfGame(event)
        })
    })
}
                                    
document.addEventListener('DOMContentLoaded', (event) => {
    
    console.log('DOM fully loaded and parsed');
    createAllFormElements()
    renderCourses()
    
    addEventToSubmitFoursome()
});



function loadChosenCourse(event){
    const courseId = event.currentTarget.dataset.id
    fetch(`${BASE_URL}/courses/${courseId}/holes`)
    .then(resp => resp.json())
    .then(json => {
        
        // displayScorecard(json)
        
    })

    debugger
    // document.querySelector(".foursome-form").classList.remove("hidden")
}

function displayScorecard(json) {
    
    json.forEach(hole => {
        mainElement.innerHTML += `
        <div class ="hole-container">
        <h2>number - ${hole.number}</h2>
        <h2>yards - ${hole.yards}</h2>
        <h2>score - ${hole.score}</h2>
        <h2>par - ${hole.par}</h2>
        </div>`
    })
}


attachPlayButtonEventListeners()



function createNewWolfGame(json){
    
    
    fetch(`${BASE_URL}/wolf_games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            stakes: `${40}`,
            course_id: `${1}`, 
            foursome_id: `${json.id}`,
        })
    })
    .then(resp => resp.json())
    .then(json => {console.log(json);debugger})
}