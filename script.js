const quiz = [
    {
        question: "1. HTML stands for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "2. Which HTML tag is used to create a hyperlink?",
        options: [
            "<a>",
            "<link>",
            "<href>",
            "<h1>"
        ],
        correctAnswer: "<a>"
    },
    {
        question: "3. Which CSS property is used to change text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "background-color"
        ],
        correctAnswer: "color"
    },
    {
        question: "4. Which CSS property is used to change the background color?",
        options: [
            "bgcolor",
            "background",
            "background-color",
            "color"
        ],
        correctAnswer: "background-color"
    },
    {
        question: "5. Which JavaScript keyword is used to declare a variable?",
        options: [
            "var",
            "int",
            "string",
            "float"
        ],
        correctAnswer: "var"
    },
    {
        question: "6. Which symbol is used for single-line comments in JavaScript?",
        options: [
            "//",
            "/* */",
            "#",
            "<!-- -->"
        ],
        correctAnswer: "//"
    },
    {
        question: "7. Which HTML tag is used to insert an image?",
        options: [
            "<img>",
            "<image>",
            "<src>",
            "<picture>"
        ],
        correctAnswer: "<img>"
    },
    {
        question: "8. Which CSS property is used to make text bold?",
        options: [
            "font-style",
            "font-weight",
            "text-weight",
            "bold"
        ],
        correctAnswer: "font-weight"
    },
    {
        question: "9. Which function is used to display output in the browser console?",
        options: [
            "print()",
            "console.log()",
            "document.write()",
            "alert()"
        ],
        correctAnswer: "console.log()"
    },
    {
        question: "10. Which JavaScript method is used to select an element by its ID?",
        options: [
            "getElementById()",
            "querySelectorAll()",
            "getElementsByClassName()",
            "querySelector()"
        ],
        correctAnswer: "getElementById()"
    }
];

var index = 0;
var id;
var timeoutQuestion = [];
var rightAnswer = 0;
var wrongAnswer = 0;
var rightAnswer = 0;
var submittedCount = 0;

function getdata() {
    document.getElementById("question").innerText = quiz[index].question;
    document.getElementById("label1").innerText = quiz[index].options[0];
    document.getElementById("label2").innerText = quiz[index].options[1];
    document.getElementById("label3").innerText = quiz[index].options[2];
    document.getElementById("label4").innerText = quiz[index].options[3];
}

getdata();
updatebtn();


document.getElementById("next").onclick = function () {

    index++;
    getdata();

    updatebtn();
    settimer();
};

document.getElementById("prev").onclick = function () {

    while (index > 0 && timeoutQuestion[index - 1]) {
        index--;
    }

    if (!timeoutQuestion[index - 1]) {
        index--;
    }

    getdata();
    updatebtn();
    settimer();
};


setTimeout(() => {
    document.querySelectorAll('.timer span')[0].innerText = "00";
    document.querySelectorAll('.timer span')[1].innerText = "59";

}, 1000);

function updatebtn() {
    document.getElementById("prev").disabled = (index == 0);

    document.getElementById("next").disabled = (index === quiz.length - 1);
}

function settimer() {
    clearInterval(id);

    document.querySelectorAll('.timer span')[0].innerText = "01";
    document.querySelectorAll('.timer span')[1].innerText = "00";

    setTimeout(() => {
        document.querySelectorAll('.timer span')[0].innerText = "00";
        document.querySelectorAll('.timer span')[1].innerText = "59";

        id = setInterval(() => {
            if (document.querySelectorAll('.timer span')[1].innerText == 0 ) {
                if (document.querySelectorAll('.timer span')[0].innerText == 0) {
                    clearInterval(id);
                    if (index < quiz.length - 1) {

                        index++;
                        getdata();

                        settimer();
                    }
                    return;
                }
                document.querySelectorAll('.timer span')[0].innerText--;
                document.querySelectorAll('.timer span')[1].innerText = "59";
            }else {
                document.querySelectorAll('.timer span')[1].innerText--;
            }

        }, 1000)
    }, 1000);
}



settimer();

var rightAnswer = 0;

document.querySelectorAll("button")[1].onclick = function () {

    if (index >= quiz.length) {
        console.log("Quiz Finished");
        return;
    }

    let selected = document.querySelector('input[name="answer"]:checked');

    if (!selected) {
        console.log("Please select an answer");
        return;
    }

    let userAnswer = quiz[index].options[selected.value];

    if (userAnswer === quiz[index].correctAnswer) {
        rightAnswer++;
        console.log("Answer = true");
    } else {
        wrongAnswer++;
        console.log("Answer = false");
    }

    submittedCount++;  
    console.log("Right Answers:", rightAnswer);

    if (submittedCount == quiz.length) {
        showResult();
    }

    
};

function showResult() {

    clearInterval(id);

    let percentage = ((rightAnswer / quiz.length) * 100);

    document.body.innerHTML = `
        <div style="text-align:center; margin:400px 770px; padding:40px; width: 400px; border: 2px dashed black">

            <h1>Quiz Result</h1>

            <h2>Correct Answers : ${rightAnswer}</h2>

            <h2>Wrong Answers : ${wrongAnswer}</h2>

            <h2>Percentage : ${percentage}%</h2>

        </div>
    `;
     
}