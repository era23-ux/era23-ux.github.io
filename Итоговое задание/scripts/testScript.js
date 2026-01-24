document.getElementById("testForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const testForm = document.getElementById('testForm');

    const correctAnswers = [
        "<",
        JSON.stringify(["br", "img"].sort()),
        "h1",
        "Q4A1hypertext",
        "Q5A3backend",
        "Q6A2frontend"
    ];

    const correctAnswersDisplay = [
        "<",
        "br,img",
        "h1",
        "язык гипертекстовой разметки",
        "язык программирования, обычно использующийся для бэкенд-разработки",
        "язык программирования, обычно использующийся для фронтенд-разработки"
    ]

    const userAnswers = [
        testForm.elements['Q1'].value,
        JSON.stringify(Array.from(testForm.querySelectorAll('input[name="Q2"]:checked')).map(cb => cb.value).sort()),
        testForm.elements['Q3'].value,
        testForm.elements['Q4'].value,
        testForm.elements['Q5'].value,
        testForm.elements['Q6'].value,
    ];

    let score = 0;
    let wrongAnswers = [];

    userAnswers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
            score++;
        }
        else {
            let userAnswerDisplay;
            if (!answer || answer === "[]") {
                userAnswerDisplay = "нет ответа";
            }
            else if (index === 0) {
                userAnswerDisplay = answer;
            }
            else if (index === 2) {
                const option = testForm.querySelector(`#Q3 option[value=${answer}]`);
                userAnswerDisplay = option ? option.text : "Not found";
            }
            else if (index === 1) {
                userAnswerDisplay = [];
                const checkboxes = testForm.querySelectorAll('input[type="checkbox"]');

                checkboxes.forEach(checkbox => {
                    if (answer.includes(checkbox.value)) {
                        const checkboxId = checkbox.id;
                        const label = testForm.querySelector(`label[for="${checkboxId}"]`);
                        if (label) {
                            userAnswerDisplay.push(label.textContent.trim());
                        }
                    }
                })
            }
            else {
                const input = testForm.querySelector(`input[value="${answer}"]`);
                userAnswerDisplay = input?.labels?.[0]?.textContent.trim();
            }

            wrongAnswers.push(`Вопрос ${index+1}. Ваш ответ: ${userAnswerDisplay}. Правильный ответ: ${correctAnswersDisplay[index]}.`);
        }
    })


    localStorage.setItem('userScore', score);
    localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers));

    window.location.href = "testResults.html";
});

