const BASE_URL = "http://localhost:3000"

function renderCourses(){
    
    fetch(`${BASE_URL}/courses`)
    .then(resp => resp.json())
    .then(json => {

        
        json.forEach(course => {
            // debugger
            mainElement.innerHTML += `
            <div class="course-pick">
            <h2>${course.name}</h2>
            </div>
            <button class="play-button" data-id="${course.id}">Play Course!</button>`

        })

        attachPlayButtonEventListeners()
    })

}
// const playCourseBtn = function(e){
//     mainElement.innerHTML = ''
//     console.log(e)


    
//     let courseId = e.target.id.slice(-1)

//     fetch(`${BASE_URL}/wolf_games`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify()
//     }).then(resp => {})

//     let selectedCourse
    
    // const newWolfGameForm = document.createElement("div")

    // newWolfGameForm.innerHTML = `<h2>Welcome</h2><form class="new-wolf-game">
    // <label for="stakes">Stakes</label>
    // <input type="text" name="stakes">
    // <label for="foursome_id">Foursome_ID</label>
    // <input type="text" name="foursome">
    // <input type="submit" value="Submit" id="new-wolf-submit">
    // </form>`

    // mainElement.prepend(newWolfGameForm)
    // document.getElementById("new-wolf-submit").addEventListener("submit", addGolfer(e))

    

    // fetch(`${BASE_URL}/wolf_games`)
    // .then(resp => resp.json())
    // .then(json => {
    //     
    //     json.forEach(att => {

    //         const id = att.id
    //         const name = att.name
    //         new Wolf_Game(stakes, course_id, foursome_id)
    //     })
    // })
// }

// const addGolfer = function(data){
//     
//     fetch(`${BASE_URL}/golfers`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(data)


//     })
// }

// const appendFormListeners = function(){
//     let createFoursomeForm = document.createElement("form")
//     createFoursomeForm.innerHTML = `
//     <h2>Welcome</h2>
//     <label for="teeTime">Tee Time</label>
//     <input type="text" name="teeTime">
    
//     <input type="submit" value="Submit">
//     `
//     mainElement.prepend(createFoursomeForm)
// }



const mainElement = document.querySelector("main")

// ADD EVENT LISTENERS TO FORM SUBMITS

function createAllFormElements(){
    
    // let [hour, minute, second] = new Date().toLocaleTimeString("en-US").split(/:| /)
    mainElement.innerHTML = `

    <div>
    <form class="foursome-form">
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
   
    <form class="wolf-game-form">
    <h2>New Game of Wolf</h2>
    <label name="stakes">Stakes</label>
        <input type="number" name="stakes" placeholder="$$">
    <label name="foursome_id">Foursome</label>
        <input type="number" name="foursome_id">
    <label name="course_id">Course</label>
        <input type="number" name="course_id">
    <input class="submit" type="submit" value="Submit">
    </form>
   

    <form class="golfer-form">
    <h2>New Golfer</h2>
    <label name="initials">Player 1Initials</label>
    <input type="text" name="initials" placeholder="XYZ">
    <input class="submit" type="submit" value="Submit">
    </form>
    </div>`

    
}


// ATTACH ALL FORM LISTENERS

function attachFormEventListeners(){
    
    const allForms = document.querySelectorAll("form")
    console.log(allForms)
    allForms.forEach(form => {
        if (form.classList.contains("golfer-form")){
            return form.addEventListener("submit", event => {
                event.preventDefault()
                createGolfer(event)

            })
        } else if (form.classList.contains("wolf-game-form")){
            return form.addEventListener("submit", event => {
                event.preventDefault()
                createWolfGame(event)
                // renderCourses()

            })
        } else if (form.classList.contains("foursome-form")){
            return form.addEventListener("submit", event => {
                event.preventDefault()
                createFoursome(event)
            })
        }
    })
}


function createGolfer(event){
    // event.preventDefault()
    
    fetch(`${BASE_URL}/golfers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            initials: `${event.currentTarget.children[1].value}`
        })
        
    })
    .then(resp => resp.json())
    .then(json => console.log(json))
}

function createFoursome(event){
    // event.preventDefault()
    const [p1, p2, p3, p4, p5] = event.currentTarget.querySelectorAll("input")
    
    fetch(`${BASE_URL}/foursomes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            teeTime: `${p1.value}`
        })
        
    })
    .then(resp => resp.json())
    .then(json => console.log(json))
}


function createWolfGame(event){
    // event.preventDefault()
    fetch(`${BASE_URL}/wolf_games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            stakes: `${event.currentTarget.children[1].value}`,
            course_id: `${1}`,
            foursome_id: `${1}`
        })
        
    })
    .then(resp => resp.json())
    .then(json => {
        new WolfGame(json.id, json.foursome_id, json.course_id)
    })
}



function attachPlayButtonEventListeners(){
    // debugger
    const allPlayButtons = document.querySelectorAll(".play-button")
    allPlayButtons.forEach(button => {
        button.addEventListener("click", event => {
            mainElement.innerHTML = ''
            // debugger
            loadChosenCourse(event)

        })
    })
}
                                    
document.addEventListener('DOMContentLoaded', (event) => {
    
    console.log('DOM fully loaded and parsed');
    // load courses
    renderCourses()
    createAllFormElements()
    attachFormEventListeners()

    // attachPlayButtonEventListeners()
    
    
});

// attachPlayButtonEventListeners()


function loadChosenCourse(event){
const courseId = event.currentTarget.dataset.id
    fetch(`${BASE_URL}/courses/${courseId}/holes`)
    .then(resp => resp.json())
    .then(json => displayScorecard(json))
}

function displayScorecard(courseArr) {
    
    courseArr.forEach(hole => {

        mainElement.innerHTML += `
        <div class ="hole-container">
        <h2>${hole.number}</h2>
        <h2>${hole.yards}</h2>
        </div>`
    })
}