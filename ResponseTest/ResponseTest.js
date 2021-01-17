const screen = document.querySelector("#screen");
let start;
let end;
const record = [];
let timeout;

screen.addEventListener('click', function() {
  if(screen.classList.contains("waiting")) {
    screen.classList.remove("waiting");
    screen.classList.add("ready");
    screen.textContent = "초록색이되면 클릭하세요";
    timeout = setTimeout(function () {
      start = new Date();
      screen.click();
    }, Math.floor(Math.random() * 1000) + 2000);
  } else if(screen.classList.contains("ready")) {
    if (!start) { //부정 클릭
      clearTimeout(timeout);
      screen.classList.remove("now");
      screen.classList.add("waiting");
      screen.textContent = "너무 성급하게 클릭했어요";
    } else { //정상 클릭
      screen.classList.remove("ready");
      screen.classList.add("now");
      screen.textContent = "클릭하세요";
    }
  } else if(screen.classList.contains("now")) {
    end = new Date();
    record.push(end-start);
    start = null; //게임 끝나면 시작 시간 초기화
    end = null;  //게임 끝나면 끝 시간 초기화

    screen.classList.remove("now");
    screen.classList.add("waiting");
    screen.textContent = "클릭해서 시작하세요";

    console.log(record / record.length);
  }
});