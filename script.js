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


var wicket = 0 ;
var currTeam = 1 ;
var balls = 0 ;
var over = 0 ;
var score = 0 ;
var scoreT1 ;
var scoreT2 ;
var wicketT1 ;

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

        ballShow.textContent=balls;
        flipAnimation(ballShow);
        console.log("Balls : " , balls);

        ballsUpdate();

        overUpgrade();
        checkWinner();
        team2Score()
    }
}

function team2Score(){
    if(currTeam==2){
        heading.textContent = `${scoreT1 - score} runs to be socred in ${2*6-balls} balls` ;
        checkWinner();
    }
}

function ballsUpdate(){
    balls++;
    ballShow.textContent=balls;
}

function scoreUpdate(){
    score++;
    runsShow.textContent=score;
    team2Score();
}

function overUpgrade(){
    if(balls%6==0){
        over++;
        console.log("over : " , over);
        if(over==2 ){
            if(currTeam==2){
                scoreT2 = score ;
                if(scoreT2 < scoreT1 ){
                    heading.textContent = `Team 2 lost the match by ${scoreT1-scoreT1} runs !` ;
                }
                else{
                    heading.textContent = `Team 1 won the match by ${11-wicketT1} wickets .`;
                }
                
                btn.textContent = "New Game" ;
                btn.addEventListener("click" , ()=>{
                    reset();
                    newGame();
                    enable();
                });
            }
            else{
                wicketT1 = wicket ;
                scoreT1 = score ;                
                heading.textContent = `Team 1 scored ${scoreT1} runs in ${balls} balls and ${wicketsShow.innerText} wickets are gone !!!`;
            }
            disable();
        }
        board.innerHTML="";
        console.log("Board cleared");
    }
}

function checkWinner(){
    if(score>=scoreT1 && currTeam==2){
        heading.textContent = `Team 2 won by ${11-wicketsShow.innerText} wickets. Hurray !!`;
        btn.textContent = "New Game";
        btn.addEventListener("click" , ()=>{
            enable();
            board.innerHTML="";
            console.log("Board cleared");
            scoreT1 = score = 0 ;
            btn.textContent = "Team 1 playing";
            wicket = 0 ;
        });
        disable();
    }

    if(score<scoreT1 && balls == 12){
        heading.textContent = "Team 1 won the match !!";        
    }
}

dot.addEventListener("click",()=>{
    ballsUpdate();
    overUpgrade();
    checkWinner();
    team2Score()
})

out.addEventListener('click', ()=>{

    wicket++;
    wicketsShow.textContent = wicket ;
    flipAnimation(wicketsShow);

    ballsUpdate();
    flipAnimation(ballShow);
    overUpgrade();


    if(wicket===10){
        console.log("All Out");
        heading.innerText = "All Out";
    }
    
    checkWinner();
    team2Score()
})




wide.addEventListener("click" , ()=>{

    scoreUpdate();
    flipAnimation(runsShow); 
    checkWinner();
    team2Score();
});

noBall.addEventListener("click",()=>{
    scoreUpdate();
    flipAnimation(runsShow);
    overUpgrade();
    checkWinner();
    team2Score()
});


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
}

btn.addEventListener("click" , ()=>{
    if((currTeam === 1) && (wicket==10 || over==2 || balls==over*6) ){
        currTeam=2 ;
        enable();
        btn.textContent="Team 2 playing";
    }
})

function enable(){
    reset();
    
    divs.forEach(div => {
        div.classList.remove("disabledDiv"); 
    });

    others.forEach(other =>{
        other.classList.remove("disabledDiv");
    })
};

//to reset for team 2:
function reset(){
    score=0;
    balls=0;
    over=0;
    wicket=0;
    heading.textContent="";
    runsShow.textContent=0;
    wicketsShow.textContent=0;
    ballShow.textContent=0;
}

function newGame(){
    reset();
    scoreT1=0;
    scoreT2 = 0 ;
    wicketT1=0;
    btn.textContent="Team 1 playing";
}


