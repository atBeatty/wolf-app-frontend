class Golfer {
    constructor(initials){
        this.initials = initials
    }

    newGolferForm(){
        const newGolfer = document.createElement("form")
        newGolfer.innerHTML = `<input>`
        console.log(newGolfer)
    
        mainElement.prepend(newGolfer)
    }

    addGolfer(data){
        fetch(`${BASE_URL}/golfers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    
}