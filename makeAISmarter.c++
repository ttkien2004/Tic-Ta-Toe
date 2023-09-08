//Implement AI to find the best move for player
#include <bits/stdc++.h>
using namespace std;

char player = 'x', computer = 'o';
struct Move{
    int i;
    int j;
};
bool isMoveLeft(char arr[3][3]){
    for(int i = 0; i < 3; i++){
        for(int j = 0; j < 3; j++){
            if(arr[i][j] == '-') return true;
        }
    }
    return false;
}
int evaluate(char arr[3][3]){
    //Check the columns
    for(int i = 0; i < 3; i++){
        if(arr[0][i] == arr[1][i] && arr[1][i] == arr[2][i]){
            if(arr[0][i] == 'x') return 10;
            else if(arr[0][i] == 'o') return -10;
        }
    }
    //Check the rows
    for(int i = 0; i < 3; i++){
        if(arr[i][0] == arr[i][1] && arr[i][1] == arr[i][2]){
            if(arr[i][0] == 'x') return 10;
            else if(arr[i][0] == 'o') return -10;
        }
    }
    //Check the diagonals
    if(arr[0][0] == arr[1][1] && arr[1][1] == arr[2][2]){
        if(arr[0][0] == 'x') return 10;
        else if(arr[0][0] == 'o') return -10;
    }else if(arr[1][1] == arr[0][2] && arr[1][1] == arr[2][0]){
        if(arr[1][1] == 'x') return 10;
        else if(arr[1][1] == 'o') return -10;
    }
    return 0;
}

int miniMax(char arr[3][3], int depth, bool isMax){
    int score = evaluate(arr);

    if(score == 10) return score;
    else if(score == -10) return score;
    else if(!isMoveLeft(arr)) return 0;

    if(isMax){
        int best = -1000;
        for(int i = 0; i < 3; i++){
            for(int j = 0; j < 3; j++){
                if(arr[i][j] == '-'){
                    arr[i][j] = computer;
                    best = max(best, miniMax(arr,depth+1,false));
                    arr[i][j] = '-';
                }
            }
        }
        return best;
    }else{
        int best = 1000;
        for(int i = 0; i < 3; i++){
            for(int j = 0; j < 3; j++){
                if(arr[i][j] == '-'){
                    arr[i][j] = player;
                    best = min(best, miniMax(arr,depth+1,true));
                    arr[i][j] = '-';
                }
            }
        }
        return best;
    }
}
Move findBestMove(char arr[3][3]){
    int bestVal = -1000;
    Move bestMove;
    bestMove.i = -1;
    bestMove.j = -1;
    for(int i = 0; i < 3; i++){
        for(int j = 0; j < 3; j++){
            if(arr[i][j] == '-'){
                arr[i][j] = player;
                int moveVal = miniMax(arr,0,false);
                arr[i][j] = '-';
                if(moveVal > bestVal){
                    bestVal = moveVal;
                    bestMove.i = i;
                    bestMove.j = j;
                }
            }
        }
    }
    return bestMove;
}

int main(){
    char arr[3][3] = {
        {'o','o','x'},
        {'-','o','-'},
        {'x','x','-'}
    };
    Move bestMove = findBestMove(arr);
    cout << "The best move you can go is: " << bestMove.i << " " << bestMove.j;
}