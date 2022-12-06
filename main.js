import './style.scss';
import 'animate.css';
import { showLoader, hideLoader } from './js/loader';
import createItem from './js/item';
import { addToCart } from './js/cart';
import * as bootstrap from 'bootstrap';

export let products = [];
export const productsRow = document.querySelector('.products-row');
export const cartBtn = document.getElementById('cart');
export const cartCounter = document.querySelectorAll('.cart-counter');
export const cartBox = document.querySelector('#cartBox');
export const totalCosts = document.querySelector('.total-costs');

//loading animation
showLoader();

fetch('https://fakestoreapi.com/products')
  .then((res) => res.json())
  .then((json) => {
    products = json;
    hideLoader();

    products.forEach((element) => {
      productsRow.append(createItem(element));
    });

    productsRow.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart')) {
        addToCart(e);
      }
    });
  });
