var body = document.body;
var candidate;
var array;

function selectNum() {
  candidate = [1,2,3,4,5,6,7,8,9];
  array = [];
  
  //랜덤한 4자리 숫자를 만들어낸다.
  for(var i = 0; i < 4 ; i+= 1) {
    var chosen = candidate.splice(Math.floor(Math.random()*(9-i)), 1)[0]; //splice(위치, 개수) //[0]: 배열의 첫 번째가 필요하다.
    array.push(chosen);
  }
}

selectNum();
console.log(array);

var result = document.createElement("h1");
body.append(result);
var form = document.createElement("form");
document.body.append(form);
var input = document.createElement("input");
form.append(input);
input.type = "text";
input.maxLength = 4;
var button = document.createElement("button");
button.textContent = "버튼";
form.append(button);

var count = 0; //틀린횟수

//사용자가 답을 입력한다.
form.addEventListener("submit", function (e) {
  e.preventDefault(); //submit의 기본동작인 새로고침을 막기위해 사용
  var answer = input.value;
  
  if(answer === array.join("")) { // 답이 맞을 경우 // 문자.split() -> 배열 // 배열.join() -> 문자
    result.textContent = "홈런";
    input.value = "";
    input.focus();
    selectNum();
    count = 0;

  } else { // 답이 틀릴 경우
    var answerArr = answer.split("");
    var strike = 0;
    var ball = 0;
    count += 1;

    if(count > 10) { // 10번 넘게 틀린 경우
      result.textContent = "실패! 답은:" + array.join(',');
      input.value = '';
      input.focus();
      selectNum();
      count = 0;
    } else { // 10번 미만으로 틀린 경우     
      for(var i = 0; i <= 3 ; i+= 1) {
        if(Number(answerArr[i]) === array[i]) { //같은 자리인지 확인
          strike += 1;
        } else if(array.indexOf(Number(answerArr[i])) > -1) { // 같은 자리는 아니지만, 숫자가 겹치는지 확인
          ball += 1;
        }
      }
      var tries = document.createElement("h2");
      tries.textContent = answerArr;
      body.append(tries);
    }

    result.textContent = strike + "스트라이크 " + ball + "볼";
    input.value = "";
    input.focus();
  }
});

