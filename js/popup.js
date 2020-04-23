var link = document.querySelector(".login_link");
var popup = document.querySelector(".modal_login");
var close = document.querySelector(".modal_close");
var login = popup.querySelector("[name=login]");
var password = popup.querySelector("[name=password]");
var form = popup.querySelector("form");                 // находим форму = в ней все поля ввода = в тот момент когда юзер ее будет Submit = посмотреть что введеноБ и если ничего нету = пишем ошибку
var storage = localStorage.getItem("login")             // ищем, есть ли что то в localStorage

var isStorageSupport = true;                            // установили true так как считаем что localStorage работает
var storage = "";

try {                                                   //  запускаем код
    storage = localStorage.getItem("login");            // если браузер выполняя этот код обнаружит ошибкуб он запустит код ниже
} catch (err) {                                         // если не работает
    isStorageSupport = false;                           // ставим false 
}

link.addEventListener("click", function (evt) {         // отлов события при нажатии на ВХОД
    evt.preventDefault();                               // обнуляем все действия по умолчанию
    popup.classList.add("modal_show");                  // добавляем новый класс 
    
    if (storage) {                                      // Есть ли что то а переменной storage
        login.value = storage;                          // если в переменной storage есть значение то запиши в инпут
        password.focus();                               // если в login есть значение то focus на поле password
    } else {
        login.focus();                                  // если нет, тогда на login
    }
});

close.addEventListener("click", function (evt) {        // отлов события при нажатии на Х (закрыть)
    evt.preventDefault();                               // обнуляем все действия
    popup.classList.remove("modal_show");               // удаляем новый (добавленый класс) класс 
    popup.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {        // отлов события при отправки (submit) формы
    if (!login.value || !password.value) {              // если в поле login ИЛИ password ничего не введено - запускаем код в скобках {} // а если нету то условия не {} выполняем 
        evt.preventDefault();                           // обнуляем все действия по умолчанию
        popup.classList.add("modal-error");             // если ошибка добавим новый класс
        console.log("Нужно ввести логин и пароль");
    } else {                                            // если условие не верно false
        if  (isStorageSupport) {                        // если localStorage работает (isStorageSupport = true)
            localStorage.setItem("login", login.value); // создаем новую запись в хранилищею текущее значение login.value в ячейку с ключем login
        }
    }                               
});

window.addEventListener("keydown", function (evt) {     // отслеживаем нажатие на клавишу в window
    if (evt.keyCode === 27) {                           // keyCode 27 это Escape (берем из таблицы) = отслеживаем нажатие на клавишу Escape
        evt.preventDefault();                           // обнуляем все действия

        if (popup.classList.contains("modal_show")) {   // проверяем что попап открыт
            popup.classList.remove("modal_show");       // если открыт закрываем
            popup.classList.remove("modal-error");
        }
    }
});