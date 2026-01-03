async function loadTopics() {
    const res = await fetch("http://localhost:5000/api/questions/topics");
    const topics = await res.json();
    const container = document.getElementById("topics");

    topics.forEach(topic => {
        const btn = document.createElement("button");
        btn.innerText = topic;
        btn.onclick = () => startQuiz(topic);
        container.appendChild(btn);
    });
}

let questions, index = 0, score = 0;

async function startQuiz(topic) {
    const res = await fetch(`http://localhost:5000/api/questions/questions/${topic}`);
    questions = await res.json();
    document.getElementById("topics").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    if (index < questions.length) {
        document.getElementById("question").innerText = questions[index].question;
        const options = document.getElementById("options");
        options.innerHTML = "";
        questions[index].options.forEach(option => {
            const btn = document.createElement("button");
            btn.innerText = option;
            btn.onclick = () => checkAnswer(option);
            options.appendChild(btn);
        });
    } else {
        submitScore();
    }
}

function checkAnswer(answer) {
    if (answer === questions[index].answer) score++;
    index++;
    loadQuestion();
}

async function submitScore() {
    const username = localStorage.getItem("username");
    await fetch("http://localhost:5000/api/auth/submit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, score })
    });
    alert(`Quiz completed! Your score: ${score}`);
    window.location.href = "user.html";
}

loadTopics();
