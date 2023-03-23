
const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game_info");
const btn = document.querySelector(".btn");


let currentpalyer;
let gamegrid;

const winingposition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]

function init() {
    console.log("ji");
    currentpalyer = 'X';
    gamegrid = ["", "", "", "", "", "", "", "", ""];
    btn.classList.remove("active")
    gameinfo.innerText = `Current Player - ${currentpalyer}`
    boxes.forEach(function (box, index) {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList.remove("win");
    })
}
init();

boxes.forEach(function (box, index) {
    // console.log(index);
    box.addEventListener('click', () => {
        handleClcik(index);
        // console.log(index);
    })
})

function handleClcik(index) {
    if (gamegrid[index] === "") {
        boxes[index].innerText = currentpalyer;
        boxes[index].style.pointerEvents = "none";
        gamegrid[index] = currentpalyer;
        swapturn();
        checkgameover();
    }
}

function swapturn() {
    if (currentpalyer === 'X') currentpalyer = 'O';
    else currentpalyer = 'X';
    gameinfo.innerText = `Current Player - ${currentpalyer}`
}

function checkgameover() {
    let ans = "";
    winingposition.forEach((position) => {
        if (gamegrid[position[0]] !== "" && gamegrid[position[1]] !== "" && gamegrid[position[2]] !== "" &&
            gamegrid[position[0]] === gamegrid[position[1]] && gamegrid[position[1]] === gamegrid[position[2]]) {
            if (gamegrid[position[0]] === 'X')
                ans = 'X';
            else
                ans = 'O';


            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    })
    if (ans !== "") {
        gameinfo.innerText = `Winning Player - ${ans}`
        btn.classList.add("active");
        boxes.forEach((box) => {
            box.style.pointerEvents = "none"
        })
    }
    let fillCount = 0 ;
    gamegrid.forEach(function(index){
        if(index!=""){
            fillCount++;
        }
    });

    if(fillCount === 9){
        gameinfo.innerText = `Game Tied !`
        btn.classList.add("active");
    }
    

}

btn.addEventListener('click', init);