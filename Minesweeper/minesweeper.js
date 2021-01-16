//스코프 해결
const tbody = document.querySelector("#table tbody");
let dataset = [];
let flag = false;
let open = 0; //열은칸

document.querySelector("#exec").addEventListener("click", function() {
  tbody.innerHTML = ""; // 게임 초기화
  dataset = []; //데이터 셋 초기화
  document.querySelector("#result").textContent = "";
  flag = false;
  open = 0;

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
  while(candidate.length > hor * ver - mine) {
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
      arr.push(0);
      
      // 깃발(!) 찍기
      const td = document.createElement("td");
      td.addEventListener("contextmenu", function(event) {
        event.preventDefault();
        if(flag) { //중단플래그
          return;
        }
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
        console.log(open);
        if(flag) { //중단플래그
          return;
        }
        // 클릭했을때 주변 지뢰 개수
        const parnetTr = event.currentTarget.parentNode;
        const parnetTbody = event.currentTarget.parentNode.parentNode;

        //클로저 해결
        const row = Array.prototype.indexOf.call(parnetTr.children, event.currentTarget); 
        const col = Array.prototype.indexOf.call(parnetTbody.children, parnetTr);
        if(dataset[col][row] === 1) {
          return;
        }

        event.currentTarget.classList.add("opened");
        open +=1; 

        if(dataset[col][row] === "X") { // 지뢰클릭
          event.currentTarget.textContent = "펑";
          document.querySelector("#result").textContent = "실패!";
          flag = true;
        } else { // 지뢰가 아닌 경우
          dataset[col][row] = 1;
          let 주변 = [
            dataset[col][row-1], dataset[col][row+1],
          ];
          if (dataset[col-1]) {
            주변 = 주변.concat([dataset[col-1][row-1], dataset[col-1][row], dataset[col-1][row+1]]);
          }
          if (dataset[col+1]) {
            주변 = 주변.concat([dataset[col+1][row-1], dataset[col+1][row], dataset[col+1][row+1]]);
          }
          let 주변지뢰개수 = 주변.filter(function(v) {
            return v === "X"
          }).length;
          event.currentTarget.textContent = 주변지뢰개수 || "";
          dataset[col][row] = 1;
          if(주변지뢰개수 === 0) {
            //주변 8칸 동시 오픈(재귀함수)
            console.log('주변을 엽니다');
            let 주변칸 = [];
            if (tbody.children[col-1]) {
              주변칸 = 주변칸.concat([
                tbody.children[col - 1].children[row - 1],
                tbody.children[col - 1].children[row],
                tbody.children[col - 1].children[row + 1],
              ]);
            }
            주변칸 = 주변칸.concat([
              tbody.children[col].children[row - 1],
              tbody.children[col].children[row + 1],
            ]);

            if (tbody.children[col+1]) {
              주변칸 = 주변칸.concat([
                tbody.children[col + 1].children[row - 1],
                tbody.children[col + 1].children[row],
                tbody.children[col + 1].children[row + 1],
              ]);
            }
            주변칸.filter(function (v) {
              return !!v;
            }).forEach(function(옆칸) {
              const parnetTr = event.currentTarget.parentNode;
              const parnetTbody = event.currentTarget.parentNode.parentNode;
              const 옆칸줄 = Array.prototype.indexOf.call(parnetTr.children, event.currentTarget); 
              const 옆칸칸 = Array.prototype.indexOf.call(parnetTbody.children, parnetTr);
              if (dataset[옆칸줄][옆칸칸] !== 1) {
                옆칸.click();
              }
            });
          }
        }
        if(open === hor * ver - mine) {
          flag = true;
          document.querySelector("#result").textContent = "승리!";
        }
      });
      
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  console.log("데이터 셋:", dataset);

  // 지뢰 심기
  for (let k = 0; k < shuffle.length; k++) {
    const row = Math.floor(shuffle[k] / ver);
    const col = shuffle[k] % ver;
    tbody.children[col].children[row].textContent = "X"; // 화면
    dataset[col][row] = "X"; //데이터
  }

});