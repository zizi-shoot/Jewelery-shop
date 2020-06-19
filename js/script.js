'use strict';

let titleLinkAll = document.querySelectorAll('.title__link');
let headerBurger = document.querySelector('.header__burger');
let menuHeaderBurger = document.querySelector('.menu .header__burger');
let stockItemAll = document.querySelectorAll('.stock__item');
let cartStorage = document.querySelector('.cart-link__storage');
let cartStorageAll = document.querySelectorAll('.cart-link__storage');
let detailCardBtn = document.querySelector('.detail-card__btn');
let menuBtnAll = document.querySelectorAll('.menu-item__btn');
let cartLinkAll = document.querySelectorAll('.cart__link');

let menu = document.querySelector('.menu');
let menuNav = document.querySelector('.menu__nav');
let menuFooter = document.querySelector('.menu__footer');

let detCardImg = document.querySelector('.detail-card__img');
let detCardTitle = document.querySelector('.detail-card__title');
let detCardInfo = document.querySelector('.detail-card__info');
let detCardPrice = document.querySelector('.detail-card__price');

let stockCard = document.querySelector('.stock__detail-card');
let stockList = document.querySelector('.stock__list');

let searchBtn = document.querySelector('.search__btn');
let searchInput = document.querySelector('#city');
let searchForm = document.querySelector('.location__search');
let searchError = document.querySelector('.search__error');




getCartAmount();

titleLinkAll.forEach(e => e.addEventListener('click', (event) => event.preventDefault()));
cartLinkAll.forEach(e => e.addEventListener('click', (event) => event.preventDefault()));
headerBurger.addEventListener('click', openMenu);
menuHeaderBurger.addEventListener('click', closeMenu);
stockItemAll.forEach(e => e.addEventListener('click', addCartItem))
cartStorageAll.forEach(e => e.addEventListener('click', delCartItem));
stockItemAll.forEach(e => e.addEventListener('click', displayDetailCard))
detailCardBtn.addEventListener('click', moveToCart);
menuBtnAll.forEach(e => e.addEventListener('mouseover', activateMenuBtn));
cartLinkAll.forEach(e => e.addEventListener('mouseover', getCartAmount));


// !!Код для карты

let mapPlacemark;
let shopMap;
let cityArr = [
	{
		city: 'москва',
		coords: [55.755773068976765, 37.614608000000004],
		address: 'Манежная площадь, 1к2'
	},
	{
		city: 'санкт-петербург',
		coords: [59.93603406416603, 30.3147275],
		address: 'Малая Морская, 4'
	},
	{
		city: 'самара',
		coords: [53.207388571205435, 50.19790299999996],
		address: '​Дыбенко, 30'
	},
	{
		city: 'казань',
		coords: [55.82957756889806, 49.11858599999993],
		address: 'Ямашева проспект, 46'
	},
	{
		city: 'калининград',
		coords: [54.71805156995347, 20.5000935],
		address: 'Театральная, 30'
	}
]

searchBtn.addEventListener('click', searchShop);
ymaps.ready(init);



function init() {
	shopMap = new ymaps.Map('map', {
		center: [55.75576985630771, 37.61765359698488],
		zoom: 13,
	});
}

function searchShop(event) {
	event.preventDefault();
	let city = searchInput.value.toLowerCase();
	let cityNameArr = [];
	cityArr.forEach((e) => cityNameArr.push(e.city));
	if (searchInput.value === '') {
		searchError.innerHTML = 'Вы ничего не ввели! Пожалуйста укажите город.'
		displyaSearchError();
	} else if (!cityNameArr.includes(city)) {
		searchError.innerHTML = 'В таком городе у нас нет магазинов!';
		displyaSearchError();
	}

	setTimeout(() => {
		searchError.style.opacity = 0;
		searchForm.style.borderBottom = '1.8px solid #fff';
	}, 2000);

	cityArr.forEach(function (e) {
		if (e.city === city) {
			shopMap.setCenter(e.coords, 13);
			mapPlacemark = new ymaps.Placemark(shopMap.getCenter(), {
				balloonContentHeader: e.city.toUpperCase(),
				balloonContentBody: e.address,
			}, {
				iconLayout: 'default#image',
				iconImageHref: 'img/marker.svg',
				iconImageSize: [60, 60],
				iconImageOffset: [-5, -38],

			});
			shopMap.geoObjects.add(mapPlacemark);
		}
	});
	searchInput.value = '';
}

function displyaSearchError() {
	searchForm.style.borderBottom = '1.8px solid rgb(255, 107, 107)';
	searchError.style.opacity = 1;
}
//  !!Конец кода для карты

function activateMenuBtn(event) {
	let menuBtnAllActive = document.querySelectorAll('.menu-item__btn--active');
	menuBtnAllActive.forEach(e => e.classList.remove('menu-item__btn--active'));
	event.target.classList.add('menu-item__btn--active');
}

function getCartAmount() {
	let cartAmount = document.querySelector('.cart-link__storage').children.length;
	cartLinkAll.forEach(e => e.setAttribute('data-amount', cartAmount));
	if (cartAmount === 0) {
		cartLinkAll.forEach(e => e.style.pointerEvents = 'none');
	} else {
		cartLinkAll.forEach(e => e.style.pointerEvents = 'auto')
	}
}

function openMenu() {
	menu.style.bottom = 0;
	menuNav.style.right = 0;
	menuFooter.style.top = 0;
}

function closeMenu() {
	menu.style.bottom = '100vh';
	menuNav.style.right = '100vw';
	menuFooter.style.top = '200vh';
}

function addCartItem() {
	getItemInfo.call(this);

	let nameStorage = localStorage.getItem('name');
	let priceStorage = localStorage.getItem('price');
	let imgStorage = localStorage.getItem('img');
	let imgAltStorage = localStorage.getItem('imgAlt');
	let item = document.createElement('li');

	item.className = 'cart-storage__item';
	item.innerHTML = `<article class="cart-storage__article storage-article">
											<img src="${imgStorage}" alt="${imgAltStorage}" class="storage-article__img">
											<h2 class="storage-article__title">${nameStorage}</h2>
											<p class="storage-article__price">${priceStorage}</p>
											<button class="storage-article__btn"></button>
										</article>`;
	cartStorage.append(item);
	getCartAmount();
}

function delCartItem(event) {
	if (event.target.tagName == 'BUTTON') {
		event.target.closest('li').remove();
		getCartAmount();
	}
}

function displayDetailCard() {
	getItemInfo.call(this);

	let nameStorage = localStorage.getItem('name');
	let descriptionStorage = localStorage.getItem('description');
	let priceStorage = localStorage.getItem('price');
	let imgStorage = localStorage.getItem('img');
	let imgAltStorage = localStorage.getItem('imgAlt');

	detCardImg.setAttribute('src', imgStorage);
	detCardImg.setAttribute('alt', imgAltStorage);
	detCardTitle.innerHTML = nameStorage;
	detCardInfo.innerHTML = descriptionStorage;
	detCardPrice.innerHTML = priceStorage;
	stockCard.style.left = '50%';
	stockList.style.pointerEvents = 'none';
	setTimeout(hideDetailCard, 5000);
}

function hideDetailCard() {
	stockCard.style.left = '-50%';
	stockList.style.pointerEvents = 'auto';
}

function moveToCart() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
	hideDetailCard();
}

function getItemInfo() {
	let name = this.querySelector('.title__link').innerHTML;
	let price = this.querySelector('p:last-of-type').innerHTML;
	let description = this.querySelector('p:first-of-type').innerHTML;
	let img = this.querySelector('img').getAttribute('src');
	let imgAlt = this.querySelector('img').getAttribute('alt');

	localStorage.setItem('name', name);
	localStorage.setItem('description', description);
	localStorage.setItem('price', price);
	localStorage.setItem('img', img);
	localStorage.setItem('imgAlt', imgAlt);
}








