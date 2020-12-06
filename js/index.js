window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("body").innerText = "WHATS UP EVERYONE"
    console.log('DOM fully loaded and parsed');
    fetchCourses()
});



function fetchCourses(){
    fetch("http://localhost:3000/courses")
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {
        console.log(object);
        displayCourses(object)

    });
}

// ("http://localhost:3000/courses")

function displayCourses(courseArr){
    const bodyElement = document.querySelector("body")
    courseArr.forEach(course => {
        bodyElement.innerHTML += `<div>${course.name}</div>`
    })
    
}

