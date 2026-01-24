const checkbox = document.getElementById('speaker');
const container = document.getElementById('topicContainer');
const topicInput = document.getElementById('topic');

checkbox.addEventListener('change', (event) => {
  if (event.target.checked) {
    container.style.display = 'block';
    topicInput.required = true;
  } 
  else {
    container.style.display = 'none';
    topicInput.required = false;
  }
});




document.getElementById('regForm').addEventListener("submit", function(event) {
    event.preventDefault();

    const regForm = document.getElementById('regForm');

    const userInfo = [
        "ФИО: " + regForm.elements['userName'].value,
        "Контактный телефон: " + regForm.elements['phone'].value,
        "Адрес электронной почты: " + regForm.elements['email'].value,];

        const option = regForm.querySelector(`#section option[value=${regForm.elements['section'].value}]`);
        userInfo.push("Секция конференции: " + (option ? option.text : "Not found"));
        
        userInfo.push("Дата рождения: " + regForm.elements['birth'].value);


        if (document.querySelector('input[type="checkbox"]').checked) {
            userInfo.push("Выступает: да");
            userInfo.push("Тема: " + regForm.elements['topic'].value);
        }
        else {
            userInfo.push("Выступает: нет");
        }


    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    window.location.href = "confRegDone.html";
});



