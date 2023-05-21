const surface = document.getElementById("surface");
document.getElementById("plus-btn").onclick = CreateAnswers;
document.getElementById("submit-btn").onclick = Submit;
let btntimer = 0;
let size = 45;
let inputtimer = 1;
let inputtimercheck = 0;
let submitquestion = [];
let submitanswer = [];

function CreateAnswers() {

    document.getElementById("plus-btn").remove();
    document.getElementById("submit-btn").remove();

    const newcontent = document.createElement("div");
    newcontent.classList.add("content-surface-r");
    newcontent.style.justifyContent = "left";
    surface.appendChild(newcontent);

    const input = document.createElement("input");
    input.maxLength = "35";
    input.style.width = "25rem";
    input.style.height = "1.7rem";
    input.style.fontSize = "1.4rem";
    input.style.marginLeft = "4.5rem";
    input.style.marginBottom = "1rem";
    input.id = "input1"+inputtimer;
    newcontent.appendChild(input);

    const input2 = document.createElement("input");
    input2.maxLength = "35";
    input2.style.width = "25rem";
    input2.style.height = "1.7rem";
    input2.style.fontSize = "1.4rem";
    input2.style.marginLeft = "5rem";
    input2.style.marginBottom = "1rem";
    input2.id = "input2"+inputtimer;
    newcontent.appendChild(input2);
    inputtimer++;

    const btnsurface = document.createElement("div");
    btnsurface.classList.add("content-surface-r");
    btnsurface.style.justifyContent = "left";
    surface.appendChild(btnsurface);

    const plusbtn = document.createElement("div");
    plusbtn.id = "plus-btn";

    const plus = document.createElement("i");
    plus.classList.add("fa-plus");
    plus.classList.add("fa-solid");
    plusbtn.appendChild(plus);
    btnsurface.appendChild(plusbtn);

    const submitbtn = document.createElement("div");
    submitbtn.id = "submit-btn";

    const submit = document.createElement("i");
    submit.classList.add("fa-check");
    submit.classList.add("fa-solid");
    submitbtn.appendChild(submit);
    btnsurface.appendChild(submitbtn);

    document.getElementById("plus-btn").onclick = CreateAnswers;
    document.getElementById("submit-btn").onclick = Submit;
    btntimer++;

    if(btntimer == 4) {
        size += 12;
        document.getElementById("surface").style.height = `${size}rem`
        btntimer = 0;
    }
}

function Submit() {

    let submitname = document.getElementById("nameinput").value;
    

    while(inputtimercheck < inputtimer) {
        submitquestion.push(document.getElementById(`input1${inputtimercheck}`).value);
        submitanswer.push(document.getElementById(`input2${inputtimercheck}`).value);

        inputtimercheck++ ;
        console.log(submitquestion)
        console.log(submitanswer)
        console.log(inputtimercheck)
    console.log(inputtimer)

    }

    fetch("http://localhost:3000/post", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            credentials: "same-origin",
        },
        body: JSON.stringify({
            name: submitname,
            question: submitquestion,
            answer: submitanswer
        })
    });
}