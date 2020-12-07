const BASE_URL = "http://localhost:3000"



function loadCourses(){
    fetch(`${BASE_URL}/courses`)
    .then(resp => resp.json())
    .then(json => displayCourses(json))
}


const playCourseBtn = function(e){
    console.log(e)
    const scoreCardDiv = document.createElement("div")
    scoreCardDiv.innerHTML = `<h2>Welcome</h2>`
    document.querySelector("main").prepend(scoreCardDiv)
}


function displayCourses(courseArr){
    const bodyElement = document.querySelector("main")
    courseArr.forEach(course => {
        bodyElement.innerHTML += `<div class="course-card" id="${course.id}"><h1 class="course-name">${course.name}</h1>
        <button class="play-course" id="play-${course.id}">Play Course</button>
        </div>`
        document.getElementById(`play-${course.id}`).addEventListener("click", playCourseBtn)

    })
    
}


document.addEventListener('DOMContentLoaded', (event) => {

    console.log('DOM fully loaded and parsed');
    loadCourses()

});