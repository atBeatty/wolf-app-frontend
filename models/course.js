class Course {

    constructor(id, name){
        this.id = id
        this.name = name
        this.displayCourses()
    }

    displayCourses(){
        const bodyElement = document.querySelector("body")
        
        bodyElement.innerHTML += `<div class="course-card" id=${this.id}><h1 class="course-name">${this.name}</h1>
        <button class="play-course">Play Course</button>
        </div>`
    }

    


}