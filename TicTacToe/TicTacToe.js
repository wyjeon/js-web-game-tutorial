var body = document.body;
var table = document.createElement("table");
var rows = []; //줄들
var cells = []; //칸들
var turn = "X";
var result = document.createElement("div");

var cb = function(e) {
  var whichRow = rows.indexOf(e.target.parentNode);
  console.log("몇줄? ", whichRow);
  var whichCell = cells[whichRow].indexOf(e.target);
  console.log("몇칸? ", whichCell);

  //빈칸 확인
  if(cells[whichRow][whichCell].textContent !== "") {//빈칸이 아닐 경우
    console.log("빈칸이 아닙니다.");  
  } else { // 빈칸일 경우
    console.log("빈칸입니다.");
    cells[whichRow][whichCell].textContent = turn; //칸에 X를 표시
    
    // 세칸 확인
    var full = false;
    
    //가로 줄 검사
    if(
      cells[whichRow][0].textContent === turn && 
      cells[whichRow][1].textContent === turn && 
      cells[whichRow][2].textContent === turn
    ) {
      full = true;
    }
    
    //세로 줄 검사
    if(
      cells[0][whichCell] === turn && 
      cells[1][whichCell] === turn && 
      cells[2][whichCell] === turn
    ) {
      full = true;
    }

     // 대각선 검사
     if (whichRow - whichCell === 0) { // 대각선 검사 필요한 경우
      if (
        cells[0][0].textContent === turn &&
        cells[1][1].textContent === turn &&
        cells[2][2].textContent === turn
      ) {
        full = true;
      }
    }
    if (Math.abs(whichRow - whichCell) === 2) { // 대각선 검사 필요한 경우
      if (
        cells[0][2].textContent === turn &&
        cells[1][1].textContent === turn &&
        cells[2][0].textContent === turn
      ) {
        full = true;
      }
    }

    //다찼으면
    if(full) {
      console.log(turn + "님의 승리!!");
      result.textContent = turn + '님이 승리!';
      //초기화
      turn = "X";
      cells.forEach(function(row) {
        row.forEach(function(cell) {
          cell.textContent = "";
        });
      });
    } else { //다 안 찼으면 턴을 넘김
      if(turn === "X") {
        turn = "O";
      } else {
        turn = "X";
      }
    }     
  }
};

// 3x3 칸 준비
for(var i = 1; i <=3 ; i+=1) {
  var row = document.createElement("tr");
  rows.push(row);
  cells.push([]);
  for (var j = 1; j <=3 ; j+=1) {
    var cell = document.createElement("td");
    cell.addEventListener("click", cb);
    cells[i - 1].push(cell);
    row.appendChild(cell);
  }
  table.appendChild(row);
}

body.appendChild(table);
body.appendChild(result);

console.log("줄들: ", rows, "칸들: ", cells);

/*
console.log(e.target); //클릭된 것, 칸
console.log(e.target.parentNode); //클릭된 것의 부모 태그, 줄
console.log(e.target.children); //클릭된 것의 자식 태그
*/


