window.addEventListener('DOMContentLoaded', function() { //Its starts work when the
    'use strict';                                        //main Dom tree will be loaded
    
    //tabs
    
    // let tab = document.querySelectorAll('.info-header-tab'),
    //     info = document.querySelector('.info-header'),
    //     tabContent = document.querySelectorAll('.info-tabcontent');

    class Tab {
        constructor(tab, info, tabContent) {
            this.tab = tab = document.querySelectorAll(tab);
            this.info = document.querySelector(info);
            this.tabContent = document.querySelectorAll(tabContent);
            this.info.addEventListener('click', function(e) {
                let target = e.target;
                if (target && target.classList.contains('info-header-tab')) {
                    for (let i = 0; i < tabWork.tab.length; i++ ) {
                        if (target == tabWork.tab[i]) {
                            tabWork.hideTabContent(0); //все табы закроются
                            tabWork.showTabContent(i); //нужный нам откроется
                            break; //чтобы цикл не гонял по кругу
                        }
                    }
                }
            });
        }
        hideTabContent (a) {
            for (let i = a; i < this.tabContent.length; i++) {
                this.tabContent[i].classList.remove('show');
                this.tabContent[i].classList.add('hide');
            }
        }
        showTabContent(b) {
            if (this.tabContent[b].classList.contains('hide')) {
                this.tabContent[b].classList.remove('hide');
                this.tabContent[b].classList.add('show');
    
            }
        }
    }
    let tabWork = new Tab('.info-header-tab', '.info-header', '.info-tabcontent');
    tabWork.hideTabContent(1); // скрываются все tabContent кроме первого

    //timer

    let deadline = '2020-12-22';
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60), //floor- округление
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(t / (1000 * 60 * 60)); 
        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            function addZero(num) {
                if (num <= 9) {
                    return '0'+num;
                } else {
                    return num;
                }
            }
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
            }
        }
    }
    setClock('timer', deadline);

    //Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
    
    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden'; //makes impossible to scroll
    });
    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // Form
    //for modal

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });

    // function sendForm(elem) {
    //     elem.addEventListener('submit', function(e) {   // 'submit' на форму!
    //         e.preventDefault();
    //         elem.appendChild(statusMessage);

    //         let formData = new FormData(elem);  //метод получающий все данные из инпутов формы
            
    //         // let obj = {}; // объект, кот будет хранить данные заполнения форм
    //         // formData.forEach(function(value, key) {
    //         //     obj[key] = value;
    //         // });
    //         // let json = JSON.stringify(obj);
            
    //         // request.send(json);

    //         function postData(data) {
    //             return new Promise(function(resolve, reject) {
    //                 let request = new XMLHttpRequest();

    //                 request.open('POST', 'server.php');

    //                 request.setRequestHeader ('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');

    //                 request.onreadystatechange = function() {
    //                     if(request.readyState <4) {
    //                         resolve();
    //                     } else if(request.readyState === 4) {
    //                         if (request.status == 200  && request.status <300) {
    //                             resolve();
    //                         } else {
    //                             reject();
    //                         }
    //                     }
    //                 };
    //                 request.send(data);
    //             });
    //         } // end post data

    //         function clearInput() {
    //             for (let i = 0; i < input.length; i++) {
    //                 input[i].value = '';
    //             }
    //         }
            
    //         postData(formData)
    //             .then(()=> statusMessage.innerHTML = message.loading)
    //             .then(()=> statusMessage.innerHTML = message.success)
    //             .сath(()=> statusMessage.innerHTML = message.failure)
    //             .then(clearInput);
    //     });
    
    // }
    // sendForm(form);
    // sendForm(formBottom);

    // Slider
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        // for (let i = 0; i < slides.length; i++) {
        //     slides[i].style.display = 'none';
        // }
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlide(n) {
        showSlides(slideIndex +=n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    prev.addEventListener('click', function() {
        plusSlide(-1);
    });

    next.addEventListener('click', function() {
        plusSlide(1);
    });

    dotsWrap.addEventListener('click', function(e){ // здесь используем делигирование. Главное проверять потом, что мы используем событие именно уже на дочерних элементах  
        for (let i = 0; i < dots.length + 1 ; i++) { // +1 -тк 4 кнопка должна работать
            if (e.target.classList.contains('dot') && e.target == dots[i-1]) { // -1  тк учитываем индекс кнопок(начинаются с 0)
                currentSlide(i);
            }
        }
    });

    //Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function() {
        personsSum = +this.value;
        total = (daysSum + personsSum)*4000;

        if(restDays.value == '' || this.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function() {
        daysSum = +this.value;
        total = (daysSum + personsSum)*4000;

        if(persons.value == ''|| this.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });

});