'use strict';


document.querySelectorAll('.title__link').forEach(e => { e.addEventListener('click', (event) => event.preventDefault()) });
document.querySelectorAll('.stock__item').forEach(e => { e.addEventListener('click', addCartItem) })
document.querySelector('.header__burger').addEventListener('click', openMenu);
document.querySelector('.menu .header__burger').addEventListener('click', closeMenu);
document.querySelectorAll('.cart__storage').forEach(e => { e.addEventListener('click', delCartItem) });
document.querySelectorAll('.head-links__cart').forEach(e => { e.addEventListener('mouseover', displayCart) });
document.querySelectorAll('.head-links__cart').forEach(e => { e.addEventListener('mouseout', hideCart) });
document.querySelectorAll('.stock__item').forEach(e => { e.addEventListener('click', displayDetailCard) })
document.querySelector('.detail-card__btn').addEventListener('click', moveToCart);

function moveToCart() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
	displayCart();
	hideDetailCard();
}

function displayDetailCard() {
	document.querySelector('.stock__detail-card').style.left = '50%';
	document.querySelector('.stock__list').style.pointerEvents = 'none';
	setTimeout(hideDetailCard, 5000);
	setTimeout(returnAction, 5000);
}

function returnAction() {
	document.querySelector('.stock__list').style.pointerEvents = 'auto';
}

function hideDetailCard() {
	document.querySelector('.stock__detail-card').style.left = '-50%'
}

function hideCart(event) {
	if (event.target.className == 'cart__wrapper') {
		document.querySelector('.cart__wrapper').style.display = 'none';
	}
}

function displayCart() {
	if (document.querySelector('.cart__storage').children.length > 0) {
		document.querySelector('.cart__wrapper').style.display = 'flex';
	}

}

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
	getCartAmount();
}

function delCartItem(event) {
	if (event.target.tagName == 'BUTTON') {
		event.target.closest('li').remove();
		getCartAmount();
		if (document.querySelector('.cart__storage').children.length === 0) {
			document.querySelector('.cart__wrapper').style.display = 'none';
		}
	}
}

function getCartAmount() {
	let cartAmount = document.querySelector('.cart__storage').children.length;
	document.querySelectorAll('.cart__link').forEach(e => e.setAttribute('data-amount', cartAmount));
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

