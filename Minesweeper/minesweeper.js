//스코프 해결
const tbody = document.querySelector("#table tbody");
const dataset = [];

document.querySelector("#exec").addEventListener("click", function() {
  tbody.innerHTML = "" // 게임 초기화
  const hor = parseInt(document.querySelector("#hor").value);
  const ver = parseInt(document.querySelector("#ver").value);
  const mine = parseInt(document.querySelector("#mine").value);
  console.log(hor, ver, mine);

  //지뢰 위치 뽑기
  const candidate = Array(hor * ver)
    .fill()
    .map(function (element, index){
      return index;
    });
  const shuffle = [];
  while(candidate.length > 80) {
    var value = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(value);
  }
  console.log("셔플:", shuffle);

  //지뢰 테이블 생성
  for (let i = 0; i < ver; i++) {
    const arr = [];
    const tr = document.createElement("tr");
    dataset.push(arr);
    for (let j = 0; j < hor; j++) {
      arr.push(1);
      
      // 깃발(!) 찍기
      const td = document.createElement("td");
      td.addEventListener("contextmenu", function(event) {
        event.preventDefault();
        const parnetTr = event.currentTarget.parentNode;
        const parnetTbody = event.currentTarget.parentNode.parentNode;

        //클로저 해결
        const row = Array.prototype.indexOf.call(parnetTbody.children, parnetTr);
        const col = Array.prototype.indexOf.call(parnetTr.children, event.currentTarget); 
        
        if(event.currentTarget.textContent === "" || event.currentTarget.textContent === "X") {
          event.currentTarget.textContent = "!"; // 화면
        } else if(event.currentTarget.textContent === "!") {
          event.currentTarget.textContent = "?"; 
        } else if(event.currentTarget.textContent === "?") {
          if(dataset[row][col] === 1) {
            event.currentTarget.textContent = ""; 
          } else if(dataset[row][col] === 'X') {
            event.currentTarget.textContent = "X"; 
          }
        }
        
        console.log(row, col);
      });

      // 주변 지뢰 개수 세기
      td.addEventListener("click", function(event) {
        // 클릭했을때 주변 지뢰 개수
        const parnetTr = event.currentTarget.parentNode;
        const parnetTbody = event.currentTarget.parentNode.parentNode;

        //클로저 해결
        const row = Array.prototype.indexOf.call(parnetTr.children, event.currentTarget); 
        const col = Array.prototype.indexOf.call(parnetTbody.children, parnetTr);
        
        if(dataset[col][row] === "X") {
          event.currentTarget.textContent = "펑";
        } else {
          let 주변 = [
            dataset[col][row-1], dataset[col][row+1],
          ];
          if (dataset[col-1]) {
            주변 = 주변.concat([dataset[col-1][row-1], dataset[col-1][row], dataset[col-1][row+1]]);
          }
          if (dataset[col+1]) {
            주변 = 주변.concat([dataset[col+1][row-1], dataset[col+1][row], dataset[col+1][row+1]]);
          }
          event.currentTarget.textContent = 주변.filter(function(v) {
            return v === "X"
          }).length;
        }
      });

      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  console.log("데이터 셋:", dataset);

  // 지뢰 심기
  for (let k = 0; k < shuffle.length; k++) {
    const row = Math.floor(shuffle[k] / 10);
    const col = shuffle[k] % 10;
    tbody.children[col].children[row].textContent = "X"; // 화면
    dataset[col][row] = "X"; //데이터
  }

  
});