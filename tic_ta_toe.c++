#include <bits/stdc++.h>
using namespace std;

//Implementation of Tic-ta-toe-game
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
int main(){
    //Implementation of board game:
    char play[3][3] = {
        {'x','-','o'},
        {'-','x','o'},
        {'-','-','o'}
    };
    cout << "The optimal value of board game is: " << evaluate(play);
}