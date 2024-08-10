var board = document.querySelector(".board");
var out = document.querySelector("#out");
var one = document.querySelector("#one");
var two = document.querySelector("#two");
var three = document.querySelector("#three");
var four = document.querySelector("#four");
var five = document.querySelector("#five");
var six = document.querySelector("#six");
var wide = document.querySelector("#wide");
var noBall = document.querySelector("#noBall");
var dot = document.querySelector("#dot");
let heading = document.querySelector(".heading");
let divs = document.querySelectorAll(".run");
let others = document.querySelectorAll(".other");
let btn = document.querySelector(".enableBtn");
let runsShow = document.querySelector(".run-Value");
let wicketsShow = document.querySelector(".wicket-Value");
let ballShow = document.querySelector(".balls-Value");


var wicket = 0;
var currTeam = 1 ;
var balls = 0 ;
var over = 0 ;
var score=0;

function flipAnimation(element) {
    gsap.fromTo(element, 
        {
            rotateX: 0,
            backgroundColor: "#ffffff", // Initial background color
        },
        {
            duration: 0.5,
            rotateX: -180,
            transformOrigin: "50% 100%",
            ease: "power1.inOut",
            height:"10px",
            width: "100%",
            backgroundColor: "#eaeaea", // Color during the flip
            onComplete: function() {
                element.style.transform = 'rotateX(0deg)';
                element.style.backgroundColor = "#ffffff"; // Reset to original color
            }
        }
    );
}

function show(e){
    var newDiv = document.createElement('div');
    newDiv.textContent = e.textContent;
    newDiv.className = 'myClass';
    board.appendChild(newDiv);
    if(e.textContent==='1' || e.textContent==='2' || e.textContent==='3' || e.textContent==='4' || e.textContent==='5' || e.textContent==='6'){
        score+=parseInt(e.textContent); 
        runsShow.textContent = score ;
        flipAnimation(runsShow); 
        balls++;
        ballShow.textContent=balls;
        flipAnimation(ballShow);
        console.log("Balls : " , balls);
        overUpgrade();
    }
    console.log("Score : " , score);
}

function overUpgrade(){
    if(balls%6==0){
        over++;
        console.log("over : " , over);
        if(over==2){
            console.log("Match completed for the current team");
            let scoreT1 = score ;
            heading.textContent = `Team ${currTeam} scored ${scoreT1} runs in ${balls} balss and ${wicket} wickets are gone !!!`;
            disable();
        }
        board.innerHTML="";
        console.log("Board cleared");
    }
}

dot.addEventListener("click",()=>{
    balls++;
    ballShow.textContent=balls;
})

out.addEventListener('click', ()=>{
    balls++;
    ballShow.textContent=balls;
    flipAnimation(ballShow);
    wicket++;
    wicketsShow.textContent = wicket ;
    flipAnimation(wicketsShow);
    if(wicket===10){
        console.log("All Out");
        heading.innerText = "All Out";
    }
})

wide.addEventListener("click" , ()=>{
    score++;
    runsShow.textContent=score ;
    flipAnimation(runsShow); 
    balls++;
    ballShow.textContent=balls;
    flipAnimation(ballShow);
});

noBall.addEventListener("click",()=>{
    score++;
    runsShow.textContent = score ;
    flipAnimation(runsShow);
    balls++;
    ballShow.textContent=balls;
    flipAnimation(ballShow);
})


function disable(){
    divs.forEach(div => {
        div.classList.add("disabledDiv"); 
    });

    others.forEach(other =>{
        other.classList.add("disabledDiv");
    })

    if(currTeam == 1){
        btn.innerText = "Start playing for Team 2"
    }

    if(currTeam==2){
        btn.innerText = "Start New Game";
    }

}

btn.addEventListener("click" , ()=>{
    if(currTeam === 1){
        currTeam=2 ;
        enable();
    }
    if(currTeam === 2){
        enable();
    }
})

function enable(){
    score=0;
    balls=0;
    over=0;
    heading.textContent="";
    runsShow.textContent=0;
    wicketsShow.textContent=0;
    ballShow.textContent=0;
    currTeam=1;
    divs.forEach(div => {
        div.classList.remove("disabledDiv"); 
    });

    others.forEach(other =>{
        other.classList.remove("disabledDiv");
    })

    btn.textContent="Team 2 playing"
    

};


