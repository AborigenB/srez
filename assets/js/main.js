'use strict';

// Выпадающее меню
let menuElements = document.querySelectorAll('.menu_element');

// console.log(menuElements);

menuElements.forEach(element => {
    let menu_btn = element.querySelector('.menu_btn');
    let menu_content = element.querySelector('.menu_content');
    element.addEventListener('mouseover', function(event){
        menu_btn.classList.add('active')
        menu_content.classList.add('active')
    })
    element.addEventListener('mouseout', function(event){
        menu_btn.classList.remove('active')
        menu_content.classList.remove('active')
    })
});

// вкладки

let tabs = document.querySelectorAll('.tab_btn');
let tabContent = document.querySelectorAll('.period');

tabs.forEach((item,index) => {
    item.addEventListener('click', function(event){
        document.querySelector('.tab_btn.active').classList.remove('active');
        item.classList.add('active');

        document.querySelector('.period.active').classList.remove('active');
        tabContent[index].classList.add('active');
    })
})

// при достижении

let modal = document.querySelector('.modal_phone');
let faqBlock = document.querySelector('.faq_section');

let observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          modal.classList.add("active");
        } else {
          modal.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.5,
    }
);
  
observer.observe(faqBlock);

// аккордеон

let faqList = document.querySelectorAll('.faq_item');

faqList.forEach((element,index)=>{
    element.addEventListener('click',function(event){
        let target = event.target.closest('.show');
        if(!target) return;

        target.classList.toggle('active');
        let thisTxt = element.querySelector('.faq-txt');
        if(thisTxt.closest('.active')){
            thisTxt.classList.remove('active');
        } else {
            thisTxt.classList.add('active');
        }
    })
})

// слайдер

let sliderBody = document.querySelector('.slider_body');
let sliderNav = document.querySelector('.slider_nav');
let sliderElemList = Array.from(document.querySelectorAll('.slider_elem'));
let sliderDots = Array.from(document.querySelectorAll('.slider_dot'));

sliderNav.addEventListener('click', function(event){
    let target = event.target.closest('.slider_arrow');
    if(!target) return;

    let currentElem = sliderBody.querySelector('.slider_elem.active');
    let currentIndex = sliderElemList.indexOf(currentElem);

    currentElem.classList.remove('active');
    document.querySelector('.slider_dot.dot_active').classList.remove('dot_active');

    changeImg(target,currentIndex);

    let newImage = document.querySelector('.slider_elem.active');
    let newIndex = sliderElemList.indexOf(newImage);

    scrollSlider(newIndex);
})

function scrollSlider(index){
    document.querySelector('.slider_elements').style.transform = `translateX(${-index*1596}px)`
}

function changeImg(arrow,currentIndex){
    if(arrow.classList.contains('left')){
        if(currentIndex == 0){
            sliderElemList.at(-1).classList.add('active');
            sliderDots.at(-1).classList.add('dot_active');
        }else{
            sliderElemList[currentIndex-1].classList.add('active');
            sliderDots[currentIndex-1].classList.add('dot_active');
        }
    }else{
        if(currentIndex == sliderElemList.length - 1){
            sliderElemList[0].classList.add('active');
            sliderDots[0].classList.add('dot_active');
        }else{
            sliderElemList[currentIndex+1].classList.add('active');
            sliderDots[currentIndex+1].classList.add('dot_active');
        }
    }
}

document.querySelector('.slider_dots').addEventListener('click', function(event){
    let targetDot = event.target.closest('.slider_dot');
    if(!targetDot) return;
    if(targetDot.classList.contains('dot_active')) return;

    document.querySelector('.slider_dot.dot_active').classList.remove('dot_active');
    targetDot.classList.add('dot_active');
    document.querySelector('.slider_elem.active').classList.remove('active');

    sliderElemList[targetDot.dataset.index].classList.add('active');
    scrollSlider(targetDot.dataset.index);
})

// modal

let modalNew = document.querySelector('.modal3sec');

setTimeout(() => modalNew.classList.add('active'), 3000);

document.querySelector('.exit').addEventListener('click',function(event){
    modalNew.classList.remove('active');
})
