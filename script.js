var board = document.querySelector(".board")
var out = document.querySelector("#out");
var one = document.querySelector("#one")
var two = document.querySelector("#two")
var three = document.querySelector("#three")
var four = document.querySelector("#four")
var five = document.querySelector("#five")
var six = document.querySelector("#six")
var wide = document.querySelector("#wide")
var noBall = document.querySelector("#noBall")
var dot = document.querySelector("#dot")

var wicket =0;

var score=0;
function show(e){
    
    var newDiv = document.createElement('div');
    newDiv.textContent = e.textContent;
    newDiv.className = 'myClass';
    board.appendChild(newDiv);
    if(e.textContent==='1' || e.textContent==='2' || e.textContent==='3' || e.textContent==='4' || e.textContent==='5' || e.textContent==='6'){
        score+=parseInt(e.textContent); 
    }
    console.log(score)
    
}




out.addEventListener('click', ()=>{
    wicket++;
    console.log(wicket)
    if(wicket===10){
        console.log("All Out")
    }
})