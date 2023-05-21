const content = document.getElementById("content");
const surface = document.getElementById("surface");
let currentsize = 45;
let timer = 0;
let timer2 = 0;
check = 0;

fetch("http://localhost:3000/get", {
    headers: {
        "content-type": "application/json",
        credentials: "same-origin",
      },
})
.then(response => response.json())
.then(data => {
    PrintData(data)
});

function PrintData(data) {
    data.forEach((element => {
        if(timer < 4) {
            const div = document.createElement("div");
            div.classList.add("lernset");
            content.appendChild(div);

            const lernsets = document.createElement("div");
            lernsets.classList.add("lernsettext");
            lernsets.textContent = element.name;
            lernsets.id = element.name+"lernset";
            div.appendChild(lernsets);

            const deletebtn = document.createElement("div");
            deletebtn.classList.add("delete-btn");
            deletebtn.id = element.name;
            div.appendChild(deletebtn);

            const deleteb = document.createElement("div");
            deleteb.classList.add("fa-solid");
            deleteb.classList.add("fa-trash");
            deletebtn.appendChild(deleteb);

            document.getElementById(lernsets.id).onclick = function() {
                CreateGame(lernsets.textContent);
            }
            
            document.getElementById(deletebtn.id).onclick = function() {
                DeleteData(deletebtn.id);
            }

            timer++;
        }
        
    }))

    const morebtn = document.createElement("div");
    morebtn.classList.add("more-btn");
    morebtn.id = "morebtn";

    const mbtn = document.createElement("i");
    mbtn.classList.add("fa-solid");
    mbtn.classList.add("fa-bars");

    if(data.length > 4 ) 
    {
        content.appendChild(morebtn);
        morebtn.appendChild(mbtn);
    }

    document.getElementById("morebtn").onclick = AdjustSets;



    function AdjustSets() {
        
        morebtn.style.background = "black";
        mbtn.style.color = "white";
        currentsize += 18;
        document.getElementById("surface").style.height = `${currentsize}rem`
        let newcontent = document.createElement("div");
        newcontent.classList.add("content-surface-r");
        rowid = 0;
        newcontent.id = "row" + rowid;
        newcontent.style.marginRight = "10.5rem";
        
        //Create all the others elements
        data.slice(4).forEach(element => {

            document.getElementById("morebtn").onclick = DisappearSets;
                
            const div = document.createElement("div");
            div.classList.add("lernset");
            lernsetid = 0;
            div.id = "lernset" + lernsetid;
            lernsetid++;
            div.style.animation = "fadeIn 2s";
            newcontent.appendChild(div);

            const lernsets = document.createElement("div");
            lernsets.classList.add("lernsettext");
            lernsets.textContent = element.name;
            lernsets.id = element.name+"lernset";
            div.appendChild(lernsets);

            const deletebtn = document.createElement("div");
            deletebtn.classList.add("delete-btn");
            deletebtn.id = element.name;
            div.appendChild(deletebtn);

            const deleteb = document.createElement("div");
            deleteb.classList.add("fa-solid");
            deleteb.classList.add("fa-trash");
            deletebtn.appendChild(deleteb);

            timer2++;
            console.log(timer2);
            
            
            //Create new line after every 4th element
            if(timer2 % 4 === 0) {
                currentsize += 16;
                document.getElementById("surface").style.height = `${currentsize}rem`;
                console.log(currentsize);

                surface.appendChild(newcontent);
                newcontent = document.createElement("div");
                newcontent.classList.add("content-surface-r");
                rowid++;
                newcontent.id = "row" + rowid
                newcontent.style.marginRight = "10.5rem";
                console.log("Abstand");
                
            }
            //Create last line
            if (timer2 % 4 !== 0) {
            surface.appendChild(newcontent);
            newcontent.style.marginRight = "10.5rem";
            console.log("Halbfinal "+timer2);
            }
            console.log("Final "+timer2);

            document.getElementById(lernsets.id).onclick = function() {
                CreateGame(lernsets.textContent);
            }
            
            document.getElementById(deletebtn.id).onclick = function() {
                DeleteData(deletebtn.id);
            }
        })
        timer2 = 0;
    }
    


    function DisappearSets() { 
        
        document.getElementById("morebtn").onclick = AdjustSets;
        
        morebtn.style.background = "white";
        mbtn.style.color = "black";
        currentsize = 45;
        document.getElementById("surface").style.height = `${currentsize}rem`;
        document.getElementById("surface").style.transition = "0.25s";

        let i = 0;
        let o = 0;
        let checkid = 0;
        let checkid2 = 0;

        while(i < lernsetid) {
            document.getElementById("lernset" + checkid).remove();
            checkid++;
            i++;
        }
        while(o <= rowid) {
            document.getElementById("row" + checkid2).remove();
            checkid2++;
            o++;
        }
 
    }



    function DeleteData(id) {
        console.log(id)
        
        fetch("http://localhost:3000/delete/" + id , {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                credentials: "same-origin",
            },
        }).then(() => location.reload());
    }



    function CreateGame(id) {
        localStorage.setItem("lernsetname", id);
        
        window.location.href = "game.html";
        
    }

}


