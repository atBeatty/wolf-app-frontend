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

    });
}

// ("http://localhost:3000/courses")

function displayCourses(courseObject){
    const bodyElement = document.querySelector("body")
    bodyElement.innerText += `${courseObject}`
    
}

displayCourses()
