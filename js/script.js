'use strict'
let titleLinks = document.querySelectorAll('.title__link');
let stockItems = document.querySelectorAll('.stock__item');

stockItems.forEach(e => { e.addEventListener('click', addCartItem) })
titleLinks.forEach(e => { e.addEventListener('click', (event) => event.preventDefault()) });
stockItems.forEach(e => { e.addEventListener('click', increaseCart) });
document.querySelector('.header__burger').addEventListener('click', openMenu);
document.querySelector('.menu .header__burger').addEventListener('click', closeMenu);


function addCartItem() {
	let name = this.querySelector('.title__link').innerHTML;
	let description = this.querySelector('p:first-of-type').innerHTML;
	let price = this.querySelector('p:last-of-type').innerHTML;
	let img = this.querySelector('img').getAttribute('src');
	let imgAlt = this.querySelector('img').getAttribute('alt');

	localStorage.setItem('name', name);
	localStorage.setItem('description', description);
	localStorage.setItem('price', price);
	localStorage.setItem('img', img);
	localStorage.setItem('imgAlt', imgAlt);

	let nameStorage = localStorage.getItem('name');
	let descriptionStorage = localStorage.getItem('description');
	let priceStorage = localStorage.getItem('price');
	let imgStorage = localStorage.getItem('img');
	let imgAltStorage = localStorage.getItem('imgAlt');
	let item = document.createElement('li');

	item.className = 'cart-storage__item';
	item.innerHTML = `<article class="cart-storage__article storage-article">
											<img src="${imgStorage}" alt="${imgAltStorage}" class="storage-article__img">
											<div class="storage-article__wrapper">
												<h2 class="storage-article__title">${nameStorage}</h2>
												<p class="storage-article__description">${descriptionStorage}</p>
											</div>
											<p class="storage-article__price">${priceStorage}</p>
											<button class="storage-article__btn"></button>
										</article>`;
	document.querySelector('.cart-storage').append(item);
}

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


