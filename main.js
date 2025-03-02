const subjects = {
    history: {
        quizQuestions: [
            {
                question: "Ai là người thành lập nước Việt Nam Dân Chủ Cộng Hòa?",
                options: ["Trần Hưng Đạo", "Hồ Chí Minh", "Lê Lợi", "Nguyễn Huệ"],
                answer: "Hồ Chí Minh"
            },
            {
                question: "Chiến thắng Điện Biên Phủ diễn ra vào năm nào?",
                options: ["1945", "1954", "1975", "1986"],
                answer: "1954"
            }
        ],
        essayQuestions: [
            {
                question: "Trình bày nguyên nhân và ý nghĩa của chiến thắng Điện Biên Phủ?",
                answer: "Chiến thắng này có ý nghĩa quan trọng, kết thúc chiến tranh Đông Dương và mở đường cho Hiệp định Geneva."
            },
            {
                question: "Nêu những điểm chính trong Tuyên ngôn Độc lập năm 1945 của Việt Nam?",
                answer: "Tuyên ngôn Độc lập khẳng định quyền tự do của dân tộc Việt Nam, chấm dứt ách thống trị của thực dân Pháp."
            }
        ]
    },
    geography: {
        quizQuestions: [
            {
                question: "Sông nào dài nhất Việt Nam?",
                options: ["Sông Hồng", "Sông Cửu Long", "Sông Đồng Nai", "Sông Đà"],
                answer: "Sông Cửu Long"
            },
            {
                question: "Thành phố nào có dân số đông nhất Việt Nam?",
                options: ["Hà Nội", "Hải Phòng", "TP. Hồ Chí Minh", "Đà Nẵng"],
                answer: "TP. Hồ Chí Minh"
            }
        ],
        essayQuestions: [
            {
                question: "Nêu đặc điểm khí hậu Việt Nam?",
                answer: "Việt Nam có khí hậu nhiệt đới gió mùa, có hai mùa rõ rệt là mùa mưa và mùa khô."
            },
            {
                question: "Tại sao miền Trung Việt Nam thường chịu ảnh hưởng của bão?",
                answer: "Do vị trí địa lý tiếp giáp biển Đông và nằm trong vùng chịu ảnh hưởng của dải hội tụ nhiệt đới."
            }
        ]
    }
};

let currentSubject = "history";
let currentQuestionIndex = 0;
let currentEssayIndex = 0;

// Hiển thị câu hỏi trắc nghiệm
function loadQuizQuestion() {
    const subjectData = subjects[currentSubject];
    const questionElement = document.getElementById("quiz-question");
    const optionsContainer = document.getElementById("quiz-options");
    const resultElement = document.getElementById("quiz-result");

    resultElement.innerText = "";
    const currentQuestion = subjectData.quizQuestions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkQuizAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkQuizAnswer(selectedOption) {
    const subjectData = subjects[currentSubject];
    const resultElement = document.getElementById("quiz-result");

    if (selectedOption === subjectData.quizQuestions[currentQuestionIndex].answer) {
        resultElement.innerText = "✅ Chính xác!";
        resultElement.style.color = "green";
    } else {
        resultElement.innerText = "❌ Sai rồi!";
        resultElement.style.color = "red";
    }

    setTimeout(() => {
        currentQuestionIndex = (currentQuestionIndex + 1) % subjectData.quizQuestions.length;
        loadQuizQuestion();
    }, 2000);
}

// Hiển thị câu hỏi tự luận
function loadEssayQuestion() {
    const subjectData = subjects[currentSubject];
    const questionElement = document.getElementById("essay-question");
    questionElement.innerText = subjectData.essayQuestions[currentEssayIndex].question;
}

// Chấm bài tự luận
document.getElementById("submit-essay").addEventListener("click", () => {
    const subjectData = subjects[currentSubject];
    const essayAnswer = document.getElementById("essay-answer").value.trim();
    const resultElement = document.getElementById("essay-result");

    const correctAnswer = subjectData.essayQuestions[currentEssayIndex].answer.toLowerCase();
    const userAnswer = essayAnswer.toLowerCase();

    if (essayAnswer.length < 10) {
        resultElement.innerText = "❌ Câu trả lời quá ngắn!";
        resultElement.style.color = "red";
        return;
    }

    // So sánh câu trả lời của người dùng với đáp án mẫu
    if (userAnswer.includes(correctAnswer)) {
        resultElement.innerText = "✅ Đúng!";
        resultElement.style.color = "green";
    } else {
        resultElement.innerText = "❌ Sai!";
        resultElement.style.color = "red";
    }

    setTimeout(() => {
        currentEssayIndex = (currentEssayIndex + 1) % subjectData.essayQuestions.length;
        document.getElementById("essay-answer").value = "";
        resultElement.innerText = "";
        loadEssayQuestion();
    }, 3000);
});

// Chuyển đổi môn học
function changeSubject(subject) {
    currentSubject = subject;
    currentQuestionIndex = 0;
    currentEssayIndex = 0;
    loadQuizQuestion();
    loadEssayQuestion();
}

// Hiển thị phần trắc nghiệm
function showQuiz() {
    document.getElementById("quiz-section").classList.remove("hidden");
    document.getElementById("essay-section").classList.add("hidden");
    loadQuizQuestion();
}

// Hiển thị phần tự luận
function showEssay() {
    document.getElementById("quiz-section").classList.add("hidden");
    document.getElementById("essay-section").classList.remove("hidden");
    loadEssayQuestion();
}

// Ẩn tất cả phần khi tải trang
document.getElementById("quiz-section").classList.add("hidden");
document.getElementById("essay-section").classList.add("hidden");
