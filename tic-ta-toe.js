let player = 'x', ai = 'o';

let boardGame = [
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-']
];
let button = [];

document.querySelector('.mid').innerHTML = '';

function isMoveLeft(arr){
    for(let i = 0; i < 3; i++)    {
        for(let j = 0; j < 3; j++){
            if(arr[i][j] === '-') return true;
        }        
    }
    return false;
}

function evaluate(arr){
    //Checking the columns
    for(let i = 0; i < 3; i++){
        if(arr[0][i] === arr[1][i] && arr[0][i] === arr[2][i] && arr[0][i] !== '-'){
            if(arr[0][i] === player) return 10;
            else if(arr[0][i] === ai) return -10;
        }
    }
    //Checking the rows
    for(let i = 0; i < 3; i++){
        if(arr[i][0] === arr[i][1] && arr[i][0] === arr[i][2]
            && arr[i][0] !== '-'){
            if(arr[i][0] === player) return 10;
            else if(arr[i][0] === ai) return -10;
        }
    }
    //Checking the diagonal
    if(arr[1][1] === arr[0][0] && arr[2][2] === arr[1][1]
        && arr[0][0] !== '-'){
        if(arr[1][1] === player ) return 10;
        else if(arr[1][1] === ai) return -10;
    }else if(arr[2][0] === arr[1][1] && arr[0][2] === arr[1][1]
        && arr[0][0] !== '-'){
        if(arr[1][1] === player ) return 10;
        else if(arr[1][1] === ai) return -10;
    }
    return 0;
}

function miniMax(arr, depth, isMax){
    let score = evaluate(arr);
    if(score === 10) return score;
    else if(score === -10) return score;
    else if(!isMoveLeft(arr)) return 0;

    if(isMax){
        let best = -1000;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(arr[i][j] === '-'){
                    arr[i][j] = player;
                    best = Math.max(best, miniMax(arr,depth+1,false));
                    arr[i][j] = '-';
                }
            }
        }
        return best;
    }else{
        let best = 1000;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(arr[i][j] === '-'){
                    arr[i][j] = ai;
                    best = Math.min(best, miniMax(arr,depth+1,true));
                    arr[i][j] = '-';
                }
            }
        }
        return best;
    }
}

function findBestWay(arr){
    let bestVal = 1000;

    let bestMove = {
        i: -1,
        j: -1
    };
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(arr[i][j] === '-'){
                arr[i][j] = ai;
                let score = miniMax(arr,0,true);                
                arr[i][j] = '-';
                if(score < bestVal){
                    bestMove.i = i;
                    bestMove.j = j;
                    bestVal = score;
                }
            }
        }
    }
    return bestMove;
}

function playGame(arr){    
    AIMove = findBestWay(arr);
    let i = AIMove.i;
    let j = AIMove.j;    
    console.log(AIMove);
    let check = document.querySelector(`.i${i}j${j}`);
    if(check.innerText === ''){
        check.innerHTML = 'O';
        arr[i][j] = 'o';
    }
}
function checkIsWinner(arr){
    let score = evaluate(arr);
    const check = document.querySelector('.mid');
    if(score === 10) {        
        check.innerHTML = 'You have won';                       
    }else if(score === -10){
        check.innerHTML = 'You have lost';           
    }            
}

function refresh(){
    document.querySelector('.mid').innerHTML = '';
    for(let i = 1; i <= 9; i++){
        document.querySelector(`.child${i}`).innerHTML = '';
    }
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 2; j++){
            document.querySelector(`.i${i}j${j}`).innerHTML = '';
        }
    }
    boardGame = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
    ];    
    button = [];            
}

function startGame(arr){    
    createButton();
    console.log(button);
    
    for(let i = 1; i <= 9; i++){
        let b = document.querySelector(`.child${i}`);
        b.addEventListener('click', () => {
            startToPlay(arr,button[i].x, button[i].y,i);
        })
    };
    // const b1 = document.querySelector('.child1');
    // b1.addEventListener('click', () => {
    //     startToPlay(arr,button[1].x,button[1].y,1);
    // });

    // const b2 = document.querySelector('.child2');
    // b2.addEventListener('click', () => {
    //     startToPlay(arr,button[2].x,button[2].y,2);
    // });

    // const b3 = document.querySelector('.child3');
    // b3.addEventListener('click', () => {
    //     startToPlay(arr,button[3].x,button[3].y,3);
    // });

    // const b4 = document.querySelector('.child4');
    // b4.addEventListener('click', () => {
    //     startToPlay(arr,button[4].x,button[4].y,4);
    // });

    // const b5 = document.querySelector('.child5');
    // b5.addEventListener('click', () => {
    //     startToPlay(arr,button[5].x,button[5].y,5);
    // });

    // const b6 = document.querySelector('.child6');
    // b6.addEventListener('click', () => {
    //     startToPlay(arr,button[6].x,button[6].y,6)    ;
    // });

    // const b7 = document.querySelector('.child7');
    // b7.addEventListener('click', () => {
    //     startToPlay(arr,button[7].x,button[7].y,7)  ;
    // });

    // const b8 = document.querySelector('.child8');
    // b8.addEventListener('click', () => {
    //     startToPlay(arr,button[8].x,button[8].y,8);
    // });

    // const b9 = document.querySelector('.child9');
    // b9.addEventListener('click', () => {
    //     startToPlay(arr,button[9].x,button[9].y,9);
    // });        
}

function startToPlay(arr, i, j, id){    
    const check = document.querySelector(`.child${id}`);
    if(check.innerText === ''){
        check.innerHTML = 'X';
        arr[i][j] = 'x';
    }
    if(!isMoveLeft(arr)){
        document.querySelector('.mid').innerHTML = 'TIE!!!';
    }else{
        playGame(arr);
        checkIsWinner(arr);
    }        
}

function createButton(){
    let x = 0;    
    for(let i = 1; i <= 9; i++){
        for(let j = 0; j < 3; j++){
            let obj = {
                x: 0,
                y: 0
            }
            obj.x = x;
            obj.y = j;
            button[i] = obj;
            ++i;
        }
        --i;
        ++x;
    }    
}
