//Мы хотим написать примерно такое приложение: https://jsfiddle.net/v90zqtLf/2/

//Пользователь может выбрать интервал от 59 минут 59 секунд до 0 секунд. При помощи клавиш "Plus" и "Minus". Если время на таймере равно 00:00 то кнопка "Start" переводится в режим не активна.
//После нажатия кнопки "Start" начинается отсчет с уменьшением значения времени. При достижений таймером значения 00:00, счет останавливается.
//Пока идёт отсчёт времени кнопка "Start" заменяется клавишей "Pausa", а кнопки "Plus" и "Minus" стают не активными. При нажатий на кнопку "Plus" можно остановить отсчёт. После чего кнопки "Start", "Plus" и "Minus" снова активируются. Mожно провести корекцию временй и запуцтить таимер с установленного временй.

const minutesNode = document.querySelector(".j-minutes");
const secondsNode = document.querySelector(".j-seconds");
const plusNode = document.querySelector(".j-plus");
const minusNode = document.querySelector(".j-minus");
const startNode = document.querySelector(".j-start");
const pauseNode = document.querySelector(".j-pause");
const messageNode = document.querySelector(".j-message")
let time = 0

//Обработка входной велёчины при уходе за граничьные значения.
const spanTime=(value)=>{
    if (value>3599){
        return 0;
    }
    if (value<0){
        return 3599;
    }
    return value;
}

//Обрзует из входной величены строку минимум из двух символов.
const strFormat = (value) => {
    if (value >= 10) {
        return `${value}`;
    }
    return `0${value}`;
}

const strMessageSuccessfully = () => {
    messageNode.innerHTML = "Таймер успешно завершил свою работу!"
};


const strMessageEmpty = () => {
    messageNode.innerHTML = ""
};

//Активация и деактивация кнопки "Start"
const btDisabled = value => {
    if (time <= 0) {
        startNode.disabled = true;
    }
    else {
        startNode.disabled = false;
    }
}

//Преобразование входной велечины в минуты и секунды, с последующим выводом в браузер.
const timeToString = (time)=>{
    btDisabled(time);
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time - minutes * 60);

    minutesNode.innerHTML = strFormat(minutes);
    secondsNode.innerHTML = strFormat(seconds);
}

//Инициализация времени, после перезагрузки браузера.
timeToString(spanTime(time));

//Обработка мажатие клавиши плюс
plusNode.addEventListener("click", () => {
    strMessageEmpty()
    time = time+1;
    time=spanTime(time);
    timeToString(time);
});

//Обработка мажатие клавиши мину
minusNode.addEventListener("click", () => {
    strMessageEmpty()
    time=time-1;
    time=spanTime(time);
    timeToString(time);
});

//Управление видимостью клавиш "Start" и "Stop"
const btVisibleToggle= () => {
    startNode.classList.toggle("bt-visible");
    pauseNode.classList.toggle("bt-visible");
};

//Запук таймера.
startNode.addEventListener("click", () => {
    btVisibleToggle();
    plusNode.disabled = true;
    minusNode.disabled = true;
    timeInterval=setInterval(() => {
        time=time-1;
        timeToString(time);
        if (time <= 0) {
            plusNode.disabled = false;
            minusNode.disabled = false;
            clearInterval(timeInterval);
            timeInterval=null;
            btVisibleToggle();
            strMessageSuccessfully();
        }
    }, 1000);
});

//Остановка таймера.
pauseNode.addEventListener("click", () => {
    plusNode.disabled = false;
    minusNode.disabled = false;
    clearInterval(timeInterval);
    timeInterval = null;
    btVisibleToggle();
});
