let slides = document.querySelectorAll('.slides-item');
const prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    slid = document.querySelector(".dot_menu"),
    indicators = document.createElement('ol'),
    dots = [];

let slider = [],
    idRight = 1,
    indexRightDot = 0,
    indexLeftDot = 0,
    active = 0,
    sum = 0,
    lock = 0,
    img0 = -500,
    img1 = 0,
    img2 = 500,
    move = 0,
    timerStep = 0;

//сбор в массив всех путей картинок и удаление слайдов из index
for (let i = 0; i < slides.length; i++) {
    slider[i] = slides[i].src;
    slides[i].remove();
}
//функция отрисовки блоков для слайдов
function draw(position) {
    let img = document.createElement('img');
    img.src = slider[step];
    img.classList.add('slides-item');
    img.style.left = position + 'px';
    document.querySelector('.slides').appendChild(img);
    if (step + 1 === slider.length) {
        step = 0;
    } else {
        step++;
    }
}
//функция создание навигационных точек
function createDots() {
    indicators.classList.add('carousel-indicators');
    slid.append(indicators);
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.id = i;
        dot.classList.add('slide');
        dot.setAttribute('data-slide-to', i + 1);
        if (i === 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }
}
//добовление стрелкам событий
function addEventButton() {
    next.addEventListener('click', left);
    prev.addEventListener('click', right);
}
//функция вызывающая движение слайдов влево
function left() {
    if (lock === 0) {
        lock = 1;
        move = setInterval(runLeft, 1);
    }
}
//функция одного шага слайдов влево
function runLeft() {
    let slides2 = document.querySelectorAll('.slides-item');
    slides2[1].style.left = img1 + 'px';
    img1 = img1 - 5;
    slides2[2].style.left = img2 + 'px';
    img2 = img2 - 5;
    timerStep++;
    if (timerStep === 100) {//слайдер завершил движение
        idLeft++;
        idRight++;
        if (idRight === slides.length) {
            idRight = 0;
        }
        if (idLeft === slides.length) {
            idLeft = 0;
        }
        timerStep = 0;
        clearInterval(move);
        slides2[0].src = slides[idLeft].src;
        slides2[1].src = slides2[2].src;
        slides2[2].src = slides[idRight].src;
        img1 = 0;
        img2 = 500;
        slides2[1].style.left = img1 + 'px';
        slides2[2].style.left = img2 + 'px';
        lock = 0;
        dotActive();

    }
}
//функция сдвига слайдов  вправо
function right() {
    if (lock === 0) {
        lock = 1;
        move = setInterval(runRight, 1);
    }
}
//функция одного шага слайдов вправо
function runRight() {
    let slides2 = document.querySelectorAll('.slides-item');
    slides2[0].style.left = img0 + 'px';
    img0 = img0 + 5;
    slides2[1].style.left = img1 + 'px';
    img1 = img1 + 5;
    timerStep++;
    if (timerStep === 100) {//слайдер завершил движение
        idLeft--;
        idRight--;
        if (idRight < 0) {
            idRight = slides.length - 1;
        }
        if (idLeft < 0) {
            idLeft = slides.length - 1;
        }
        timerStep = 0;
        clearInterval(move);
        slides2[1].src = slides2[0].src;
        slides2[2].src = slides[idRight].src;
        slides2[0].src = slides[idLeft].src;
        img0 = -500;
        img1 = 0;
        slides2[0].style.left = img0 + 'px';
        slides2[1].style.left = img1 + 'px';
        lock = 0;
        dotActive();
    }
}
//функция определения активной точки
function dotActive() {
    let slides2 = document.querySelectorAll('.slides-item');
    dots.forEach(dot => dot.style.opacity = '.5');
    for (let i = 0; i < slides.length; i++) {
        if (slides2[1].src === slides[i].src) {
            dots[i].style.opacity = 1;
            active = i;
        }
    }
}
//добавление точкам возможности перемещения слайдов
function dotStep(event) {
    if (event.target.id !== active) {//проверка не равена ли нажатая точка активному слайду
        removeDotEvent();
        next.removeEventListener('click', left);
        prev.removeEventListener('click', right);

        for (let i = 0; i < dots.length; i++) {
            if (event.target.id === dots[i].id) {//определяем нажатаю точку
                if (event.target.id > active) {//определение стороны в которую будет двигатся слайдер
                    sum = event.target.id - active;

                    function dotLeft() {
                        if (sum === 0) {//окончание движения
                            dotAddEvent();
                            clearInterval(indexLeftDot);
                            addEventButton();
                        } else {
                            left();
                            sum--;
                        }
                    }

                    indexLeftDot = setInterval(dotLeft, 420);
                } else {
                    sum = active - event.target.id;

                    function dotRight() {
                        if (sum === 0) {//окончание движения
                            dotAddEvent();
                            clearInterval(indexRightDot);
                            addEventButton();
                        } else {
                            right();
                            sum--;
                        }
                    }
                }
                indexRightDot = setInterval(dotRight, 420);
            }
        }
    }
}
//добавление точкам событий
function dotAddEvent() {
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', dotStep);
    }
}
//удаление событий у точек
function removeDotEvent() {
    for (let i = 0; i < dots.length; i++) {
        dots[i].removeEventListener('click', dotStep);
    }
}

let step = slides.length - 1,
    idLeft = slides.length - 1;
draw(img0);
draw(img1);
draw(img2);
createDots();
addEventButton();
dotAddEvent();
