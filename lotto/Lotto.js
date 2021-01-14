const candidate = Array(45) // 길이가 45인 빈 배열
  .fill()
  .map(function (element, index) { // mapping
    return index + 1;
  });

const shuffle = [];
while(candidate.length > 0) { // 기준 값이 변할 때는 while문
  const value = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
  shuffle.push(value);
}

const bonusNum = shuffle[shuffle.length - 1];
const winNum = shuffle
  .slice(0, 6)
  .sort(function(p, c) {
    return p - c;
  });

const result = document.getElementById("result");

function color(num, result) {
  const ball = document.createElement("div");
    ball.textContent = num;
    ball.style.display = "inline-block"; // css 조작
    ball.style.border = "1px solid black";
    ball.style.borderRadius = "10px"; // border-radius
    ball.style.width = "20px";
    ball.style.height = "20px";
    ball.style.textAlign = "center";
    ball.style.fontSize = "12px";
    ball.ClassName = "ball";
    let bg;
    if(num<=10) {
      bg = 'red';
    } else if(num<=20) {
      bg = 'orange';
    } else if(num<=30) {
      bg = 'yellow';
    } else if(num<=40) {
      bg = 'blue';
    } else {
      bg = 'green';
    }
    ball.style.backgroundColor = bg;
    result.appendChild(ball)
}

for(let i=0 ; i < winNum.length ; i += 1) {
  (function c(j) {
    setTimeout(function () {
      color(winNum[j], result)
    }, (j+1) *1000);
  })(i); 
}

setTimeout(function cb() {
  const a = document.querySelector(".bonus");
  color(bonusNum, a);
}, 7000)




