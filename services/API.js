const BASE_URL = "http://localhost:3000"

class API {


    static loadCourses(){
        fetch(`${BASE_URL}/courses`)
        .then(resp => resp.json())
        .then(json => {
            json.forEach(att => {

                const id = att.id
                const name = att.name
                debugger
                new Course(id, name)
            })
        })
    }



}