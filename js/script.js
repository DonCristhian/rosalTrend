window.addEventListener('DOMContentLoaded', function(){
    
    let slideImgs = document.querySelectorAll('#slide-img img');
    let slideInfos = document.querySelectorAll('.slide-info');
    const heroSection = document.querySelector(".hero-section");
    const heroSlideToggle = document.querySelector('.hero-slide-toggle');
    let productsSlide = document.querySelectorAll('.products-slide');
    let productImg = document.querySelectorAll('.product-img');
    let slideInfo = document.querySelectorAll(".slide-info.active")

    let heroImgsAnimate = [];

    let screenWidth, screenHeight;
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    

    slideImgs.forEach((e, index)=>{

        let nextImg = slideImgs[index === slideImgs.length -1 ? 0 : index + 1].getAttribute('src');
        
        let animation = new hoverEffect({
            parent: document.querySelector('#slide-img'),
            intensity: 0.3,
            image1: e.getAttribute('src'),
            image2: nextImg,
            displacementImage: 'images/distortion.jpg',
            hover: false,
        })

        heroImgsAnimate.push(animation);

    })


    slideImgs.forEach(e => e.remove());

    let currItem = 0;

    showSlideIndex = (index)=>{
        document.getElementById('hero-slide-index').innerHTML = `${index + 1}/${slideImgs.length}`;
    }

    nextSlide = () => {
        let hideArrows = document.createElement("DIV");

        hideArrows.classList.add("hideArrows");

        heroSlideToggle.appendChild(hideArrows);



        let prevItem = currItem;

        currItem = (currItem + 1) % heroImgsAnimate.length;

        

        // image Animation
        heroImgsAnimate[prevItem].next();
        
        // change slide info
        document.querySelector('.slide-info.active').classList.remove('active');
        slideInfos[currItem].classList.add('active');


        showSlideIndex(currItem);

        setTimeout(() => {
            let canvas = document.querySelectorAll('#slide-img canvas');
            document.querySelector('#slide-img').appendChild(canvas[0]);
            heroImgsAnimate[prevItem].previous();
            heroSlideToggle.removeChild(hideArrows);
        }, 1200);

        if(window.innerWidth <= 768){
            calcHeightHeroSection();
            
            heroSection.style.paddingBottom = slideInfos[currItem].offsetHeight + "px";
        }

    }

    prevSlide = () =>{
        currItem = currItem - 1 < 0 ? heroImgsAnimate.length - 1 : currItem - 1;

        let hideArrows = document.createElement("DIV");

        hideArrows.classList.add("hideArrows");

        heroSlideToggle.appendChild(hideArrows);

        // image Animation
        heroImgsAnimate[currItem].next();
        
        // change slide info
        document.querySelector('.slide-info.active').classList.remove('active');
        slideInfos[currItem].classList.add('active');

        showSlideIndex(currItem);

        setTimeout(() => {
            let canvas = document.querySelectorAll('#slide-img canvas');
            document.querySelector('#slide-img').insertBefore(canvas[canvas.length - 1 ], document.querySelector('#slide-img').firstChild);
            heroImgsAnimate[currItem].previous();
            heroSlideToggle.removeChild(hideArrows);
        }, 1200);

        if(window.innerWidth <= 768){
            calcHeightHeroSection();
            
            heroSection.style.paddingBottom = slideInfos[currItem].offsetHeight + "px";
        }

    }

    document.getElementById('hero-slide-toggle-next').addEventListener('click', () => nextSlide());

    document.getElementById('hero-slide-toggle-prev').addEventListener('click', () => prevSlide());


    let autoSlide = setInterval(nextSlide, 5000);

    heroSection.onmouseover = () => {

        clearInterval(autoSlide);

    }

    heroSection.onmouseleave = () => {

        autoSlide = setInterval(nextSlide, 5000);

    }

    productsSlide.forEach( e => {

        new Glide(e.querySelector('.glide'), {
            type: 'slider',
            starAt: 0,
            perView: 4,
            rewind: true,
            bound: true,
            animationDuration: 3000,
            breakpoints: {
                1200: {perView: 3},
                768: {perView: 2},
                600: {perView: 1},
            }
        }).mount()

       

    })

    

    productImg.forEach(e => { 

        let image1 = e.getAttribute('data-img-1');
        let image2 = e.getAttribute('data-img-2');

        e.style.backgroundImage = 'url(' + image1 + ')';
        e.style.width = e.parentElement.offsetWidth + 'px';
        e.style.height = e.parentElement.offsetWidth + 'px';

        // new hoverEffect({
        //     parent: e,
        //     intensity: 1.5,
        //     image1: e.getAttribute('data-img-1'),
        //     image2: e.getAttribute('data-img-2'),
        //     displacementImage: 'images/distortion.jpg'
        // })
       
        
        e.addEventListener('mouseenter', function(){
            this.children[0].style.backgroundImage = `url(${image2})`;
            this.classList.add("active");
            this.style.backgroundPosition = "-500px 0";
            this.style.backgroundBlendMode = "color";

        })

        e.addEventListener('mouseleave', function(){
            this.classList.remove("active");
            this.style.backgroundPosition = "center";
            this.classList.add("inactive");
            this.style.backgroundBlendMode = "initial";
            setTimeout(() => {
                this.classList.remove("inactive");
            }, 400);
            
            
         })
    })

    new Glide('.gallery-slide', {
        type: 'carousel',
        starAt: 0,
        perView: 8,
        breakpoints: {
            1200: {perView: 6},
            768: {perView: 4},
            600: {perView: 2},
        }
    }).mount()

    

    window.addEventListener("resize", function(){

        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;

        if(screenWidth <= 768){

            calcHeightHeroSection();

        }

    })

    

    const calcHeightHeroSection = function(){
        let heightArr = []
        slideInfo.forEach((e)=>{
            heightArr.push(e.offsetHeight);
        })
        var max = heightArr[0];

        for (var i = 0; i < heightArr.length ; i++) {
            if (heightArr[i] > max) {
                 console.log('Anterior maximo: ' + max + ', nuevo maximo: ' + heightArr[i]);
                    max = heightArr[i];
            }
        }
        heroSection.style.paddingBottom = max + "px";
    }

    if(screenWidth <= 768){
        calcHeightHeroSection();

    }

})


