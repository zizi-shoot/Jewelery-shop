'use strict'

document.querySelector('.header__burger').addEventListener('click', openMenu);
document.querySelector('.menu .header__burger').addEventListener('click', closeMenu);
document.querySelector('.stock__item').addEventListener('click', increaseCart)

function increaseCart() {
	let cartAmount = +document.querySelector('.cart__link').getAttribute('data-amount');
	cartAmount++;
	document.querySelector('.cart__link').setAttribute('data-amount', cartAmount);
}



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


