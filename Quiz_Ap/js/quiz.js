const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".button_btn .exit");
const continue_btn = info_box.querySelector(".button_btn .continue");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .time_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

const option_list = document.querySelector(".option_list");


// if start quiz button clicked
start_btn.onclick = () =>{
    info_box.classList.add("activeInfo");
}

// Exit button clicked
exit_btn.onclick = () =>{
    info_box.classList.remove("activeInfo");
}

// Continue button clicked
continue_btn.onclick = () =>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestion(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

// Question
let que_count = 0; 
let que_number = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".button_btn .exit");
const exit_quiz = result_box.querySelector(".button_btn .continue");

restart_quiz.onclick = () =>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    let que_count = 0; 
    let que_number = 1;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQuestion(que_count);
    queCounter(que_number);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue)
    next_btn.style.display = "none";
}


exit_quiz.onclick = () =>{
    window.location.reload();
}

// If next button clicked
next_btn.onclick = () => {
    if(que_count < question.length - 1){
        que_count++;
        que_number++;
        showQuestion(que_count);
        queCounter(que_number);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left"
    }
    else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Question Complete");
        showResultBox();
    }
}

function showQuestion(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = "<span>" + question[index].number+ ". " + question[index].question +"</span>";
    let option_tag = '<div class="option"><span>' + question[index].option[0] + '</span></div>'
                    +'<div class="option"><span>' + question[index].option[1] + '</span></div>'
                    +'<div class="option"><span>' + question[index].option[2] + '</span></div>'
                    +'<div class="option"><span>' + question[index].option[3] + '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
        
    }
}

let tickIcon = '<div class="icon tick"><i class="fa fa-check-circle-o"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fa fa-times-circle-o"></i></div>';


function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let conrectAns = question[que_count].answer;
    let allOption = option_list.children.length;
    if(userAns == conrectAns) {
        userScore +=1;
        answer.classList.add("correct");
        console.log("Answer is Conrect");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }
    else{
        answer.classList.add("incorrect");
        console.log("Answer is Inconrect"); 
        answer.insertAdjacentHTML("beforeend", crossIcon);

        // if answer is inconrrect then auto selected the conrrect answer
        for (let i = 0; i < allOption; i++) {
            if(option_list.children[i].textContent == conrectAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
            
        }
    }

    // user selected disable answer
    for (let i = 0; i < allOption; i++) {
            option_list.children[i].classList.add("disabled");        
    }
    next_btn.style.display = "block";
}

function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 3){
        let scoreTag = '<span>and Congratulation! You got <p>' + userScore + '</p><p>out of</p>'+ question.length +'</span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>and Nice! You got <p>' + userScore + '</p><p>out of</p>'+ question.length +'</span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and Sorry! You got only <p>' + userScore + '</p><p>out of</p>'+ question.length +'</span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";

            timeOff.textContent = "Time Off"

            let conrectAns = question[que_count].answer;
            let allOption = option_list.children.length;

            for (let i = 0; i < allOption; i++) {
                if(option_list.children[i].textContent == conrectAns){
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
                
            }
            for (let i = 0; i < allOption; i++) {
                option_list.children[i].classList.add("disabled");        
        }
        next_btn.style.display = "block";
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}





function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".que_total");
    let totalQuesCountTag = '<span><p>' + index +'</p>Of<p>'+ question.length +'</p>Question</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}