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

    form.addEventListener('submit', function(event) {   // 'submit' на форму!
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader ('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);  //метод получающий все данные из инпутов формы
        
        let obj = {}; // объект, кот будет хранить данные заполнения форм
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);
        
        request.send(json);

        request.addEventListener('readystatechange', function() {
            if(request.readyState <4) {
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
    
    //last form
    
    let formLast = document.getElementById('form'),
        inputLast = formLast.getElementsByTagName('input'),
        statusMessages = document.createElement('div');

        statusMessages.classList.add('status');

    formLast.addEventListener('submit', function(event) {   // 'submit' на форму!
        event.preventDefault();
        formLast.appendChild(statusMessages);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader ('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(formLast);  //метод получающий все данные из инпутов формы
        
        let obj = {}; // объект, кот будет хранить данные заполнения форм
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);
        
        request.send(json);

        request.addEventListener('readystatechange', function() {
            if(request.readyState <4) {
                statusMessages.innerHTML = message.loading;
            } else if(request.readyState === 4 && request.status == 200) {
                statusMessages.innerHTML = message.success;
            } else {
                statusMessages.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < inputLast.length; i++) {
            inputLast[i].value = '';
        }
    });   
}); 