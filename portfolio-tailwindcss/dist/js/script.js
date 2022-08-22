const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', ()=>{
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
})

window.onscroll = function(){
    const header = document.querySelector('header');
    const fixesNav = header.offsetTop;

    if(window.pageYOffset > fixesNav){
        header.classList.add('navbar-fixed');
    }else{
        header.classList.remove('navbar-fixed');
    }
}