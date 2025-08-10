
document.addEventListener("DOMContentLoaded", function () {

    const menuItems = document.querySelectorAll('.menu-items li a');
    const checkbox = document.getElementById('checkbox');

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            menuItems.forEach(i => i.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');

            if (window.innerWidth <= 768) {
                checkbox.checked = false;
            }
        });
    });

    let nextbtn = document.getElementById('next');
    let prevbtn = document.getElementById('prev');
    let projects = document.querySelector('.projects');
    let listItem = document.querySelector('.projects .list');
    let thumbnail = document.querySelector('.projects .thumbnail');

    let timeRunning = 1000;
    let runTimeOut;

    let autoTimer = 10000;
    let autoRun = setTimeout(() => {
        nextbtn.click();
    }, autoTimer);

    prevbtn.onclick = function () {
        showSlider('prev');
    };
    nextbtn.onclick = function () {
        showSlider('next');
    };

    function showSlider(type) {
        let itemSlider = document.querySelectorAll('.projects .list .project-item');
        let itemThumbnail = document.querySelectorAll('.projects .thumbnail .item');

        if (type === 'next') {
            listItem.appendChild(itemSlider[0]);
            thumbnail.appendChild(itemThumbnail[0]);
            projects.classList.add('next');
        } else {
            listItem.prepend(itemSlider[itemSlider.length - 1]);
            thumbnail.prepend(itemThumbnail[itemThumbnail.length - 1]);
            projects.classList.add('prev');
        }
        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            projects.classList.remove('next');
            projects.classList.remove('prev');
        }, timeRunning);

        clearTimeout(autoRun);
        autoRun = setTimeout(() => {
            nextbtn.click();
        }, autoTimer);
    }

    const tagline = document.querySelector('.tagline');
    const text = tagline.textContent.replace('|', '');
    tagline.textContent = '';

    let i = 0;
    const typewriter = setInterval(() => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typewriter);
            tagline.textContent = text;
        }
    }, 50);
    
    const form = document.querySelector('form');
    const popup = document.getElementById('popup');
    const closePopup = document.querySelector('.close-popup');

    if (form) {
        form.addEventListener('submit', function (e) {
            popup.style.display = 'block';

            setTimeout(() => {
                const tempForm = document.createElement('form');
                tempForm.action = form.action;
                tempForm.method = 'POST';
                tempForm.style.display = 'none';
                Array.from(form.elements).forEach(element => {
                    if (element.name) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = element.name;
                        input.value = element.value;
                        tempForm.appendChild(input);
                    }
                });

                document.body.appendChild(tempForm);
                tempForm.submit();
            }, 3000);
            e.preventDefault();
        });
    }
    if (closePopup) {
        closePopup.addEventListener('click', function () {
            popup.style.display = 'none';
        });
    }

    popup.addEventListener('click', function (e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});

