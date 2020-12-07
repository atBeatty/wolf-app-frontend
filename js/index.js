// const BASE_URL = "http://localhost:3000"
const mainElement = document.querySelector("main")

function loadPlayBtnEvents(){
    debugger
    document.querySelectorAll(".play-course").forEach(button => {
        button.addEventListener("click", playCourseBtn)
    })
}

let playCourseBtn = function(e){
    console.log(e)
    const scoreCardDiv = document.createElement("div")
    scoreCardDiv.innerHTML = `<h2>Welcome</h2>`
    document.querySelector("main").prepend(scoreCardDiv)
}




document.addEventListener('DOMContentLoaded', (event) => {

    console.log('DOM fully loaded and parsed');
    API.loadCourses()
    loadPlayBtnEvents()
    // newGolferForm()
    // loadFoursomes()

});