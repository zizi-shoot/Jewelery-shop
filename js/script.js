'use strict'

document.querySelector('.header__burger').addEventListener('click', openMenu);
document.querySelector('.menu .header__burger').addEventListener('click', closeMenu);

function openMenu() {
	document.querySelector('.menu').style.bottom = 0;
	document.querySelector('.menu__nav').style.right = 0;
	document.querySelector('.menu__footer').style.top = 0;
}

function closeMenu() {
	document.querySelector('.menu').style.bottom = '100vh';
	document.querySelector('.menu__nav').style.right = '100vw';
	document.querySelector('.menu__footer').style.top = '200vh';
	
}
