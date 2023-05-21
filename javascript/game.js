const id = localStorage.getItem("lernsetname");
const gamecontent = document.getElementById("gamecontent");
gamecontent.style.justifyContent = "left";
const surface = document.getElementById("surface");
const mainsurface = document.getElementById("mainsurface");
const title = document.createElement("div");
const question = document.createElement("div");
let questionindex = 0;

fetch("http://localhost:3000/get/" + id)
.then(response => response.json())
.then(data => {
    PrintGame(data);
});

function PrintGame(data) {
    PrintQuestion();

    function PrintQuestion() {
        
        title.classList.add("lernsettitle");
        title.textContent = data[0].name;
        surface.appendChild(title);

        question.classList.add("questiontext");
        question.textContent = data[0].question[questionindex];
        surface.appendChild(question);

        const input = document.createElement("input");
        input.id = "answerinput";
        gamecontent.appendChild(input);

        const submitbtn = document.createElement("div");
        submitbtn.id = "submitanswer-btn";

        const sbtn = document.createElement("i");
        sbtn.classList.add("fa-solid");
        sbtn.classList.add("fa-arrow-right");
        submitbtn.appendChild(sbtn);
        gamecontent.appendChild(submitbtn);

        surface.appendChild(gamecontent);

        document.getElementById("submitanswer-btn").onclick = function() {
            CheckAnswer();
        }
    }
    

    function CheckAnswer() {
        let userinput = document.getElementById("answerinput").value;
    
        if(userinput == data[0].answer[questionindex]) {
            const popupbackground = document.createElement("div");
            popupbackground.classList.add("popup-background");
    
            const popup = document.createElement("div");
            popup.classList.add("popup");
    
            const popuptext = document.createElement("div");
            popuptext.classList.add("popup-text");
            popuptext.innerHTML = `Korrekt<br><br>Die Antwort ist <br>${data[0].answer[questionindex]}`;
    
            const moveonbtn = document.createElement("div");
            moveonbtn.id = "moveon-btn";
            const moveontext = document.createElement("div");
            moveontext.classList.add("moveon-text");
            moveontext.textContent = "Weiter";
            moveonbtn.appendChild(moveontext);
    
            popup.appendChild(popuptext);
            popup.appendChild(moveonbtn);
            popupbackground.appendChild(popup);
            mainsurface.appendChild(popupbackground);

            document.getElementById("moveon-btn").onclick = function() {
                questionindex++;
                popup.remove();
                popupbackground.remove();
                title.remove();
                question.remove();
                gamecontent.innerHTML = "";
                question.textContent = data[0].question[questionindex];
                if (questionindex < data[0].question.length) {
                    PrintQuestion();
                } else{
                    title.innerHTML = "Sie haben es geschafft!<br>Sie haben das Lernset abgeschlossen"
                    title.style.fontSize = "5rem";
                    title.style.marginTop = "8.5rem";
                    title.style.marginLeft = "6rem";
                    surface.appendChild(title);
                }   
            }


        } else {
            const popupbackground = document.createElement("div");
            popupbackground.classList.add("popup-background");
    
            const popup = document.createElement("div");
            popup.classList.add("popup");
    
            const popuptext = document.createElement("div");
            popuptext.classList.add("popup-text");
            popuptext.innerHTML = `Leider Falsch<br><br>Die richtige Antwort wäre <br>${data[0].answer[questionindex]}`;
    
            const moveonbtn = document.createElement("div");
            moveonbtn.id = "moveon-btn";
            const moveontext = document.createElement("div");
            moveontext.classList.add("moveon-text");
            moveontext.style.padding = "2.1rem";
            moveontext.textContent = "Nochmals";
            moveonbtn.appendChild(moveontext);
    
            popup.appendChild(popuptext);
            popup.appendChild(moveonbtn);
            popupbackground.appendChild(popup);
            mainsurface.appendChild(popupbackground);

            document.getElementById("moveon-btn").onclick = function() {
                popup.remove();
                popupbackground.remove();
                title.remove();
                question.remove();
                gamecontent.innerHTML = "";
                question.textContent = data[0].question[questionindex];
                if (questionindex < data[0].question.length) {
                    PrintQuestion();
                } else{
                    title.innerHTML = "Sie haben es geschafft!<br>Sie haben das Lernset abgeschlossen"
                    title.style.fontSize = "5rem";
                    title.style.marginTop = "8.5rem";
                    title.style.marginLeft = "6rem";
                    surface.appendChild(title);
                }   
            }
        }
    }
}



