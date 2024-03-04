document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Получаем значения введенные пользователем
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');

    // Проверяем, правильно ли заполнены поля
    if (!emailInput.checkValidity() || !passwordInput.checkValidity()) {
        // Если поля заполнены неправильно, добавляем класс для отображения красной рамки
        emailInput.classList.add('error-border');
        passwordInput.classList.add('error-border');
    } else {
        // Если поля заполнены правильно, удаляем класс, если он был добавлен ранее
        emailInput.classList.remove('error-border');
        passwordInput.classList.remove('error-border');
    }
});