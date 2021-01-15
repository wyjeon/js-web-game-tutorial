let imgCoord = '0'; 
let rsp = { //딕셔너리 자료구조
  "rock": "0px",
  "scissors": "-142px",
  "paper": "-284px",
};

function computer(imgCoord) {
  return Object.entries(rsp).find(function(v) { // Object.entries(), 객체를 배열로 바꿈
    return v[1] === imgCoord;
  })[0];
}

let interval;

function intervalMaker() {
  interval = setInterval(function () {
    if(imgCoord === rsp.rock) {
      imgCoord = rsp.scissors;
    } else if(imgCoord === rsp.scissors) {
      imgCoord = rsp.paper;
    } else {
      imgCoord = rsp.rock;
    }
    document.querySelector("#computer").style.background = "url(https://en.pimg.jp/023/182/267/1/23182267.jpg)" + imgCoord + " 0";
  }, 100);
}

intervalMaker();
let scores = {
  scissors: 1,
  rock: 0,
  paper: -1,
}

document.querySelectorAll(".btn").forEach(function(btn) {
  btn.addEventListener("click", function() {
    clearInterval(interval);
    setTimeout(function() {
      intervalMaker();
    }, 1000);
    const choice = this.textContent;
    let myScore = scores[choice];
    let comScore = scores[computer(imgCoord)];
    let diff = myScore - comScore;
    if(diff === 0) {
      console.log("비겼다.");
    } else if([-1, 2].includes(diff)) {
      console.log("이겼다.");
    } else {
      console.log("졌다.");
    }
  });
});