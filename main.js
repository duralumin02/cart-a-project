import './style.scss';
import 'animate.css';
import { showLoader, hideLoader } from './js/loader';

let products = [];
let productsRow = document.querySelector('.products-row');
const cartBtn = document.getElementById('cart');
//loading animation
showLoader();

fetch('https://fakestoreapi.com/products')
  .then((res) => res.json())
  .then((json) => {
    products = json;
    hideLoader();

    products.forEach((e) => {
      let itemDiv = document.createElement('div');
      itemDiv.classList.add('col-12', 'col-md-4', 'col-lg-3');
      itemDiv.innerHTML = `
                    <div class="card">
						<div class="card-body d-flex flex-column product-card">
                            <div class="mb-3">
                            	<img src="${e.image}" class="product-img"></img>
							</div>
							<p class="card-title fw-bold text-truncate mt-4">${e.title}</p>
							<p class="product-description">
								${e.description.substring(0, 100)}
							</p>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
								<p class="mb-0 text-primary fw-semibold ">$ <span>${e.price}</span></p>
								<button class="btn btn-sm btn-outline-primary add-to-cart"><i class="bi bi-cart-plus me-2 pe-none"></i>Add cart</button>
							</div>
						</div>
					</div>
            `;
      productsRow.append(itemDiv);
    });

    productsRow.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart')) {
        let currentProductCard = e.target.closest('.product-card');
        let currentImg = currentProductCard.querySelector('.product-img');

        let newImg = new Image();
        newImg.src = currentImg.src;
        newImg.style.height = 80 + 'px';
        newImg.style.position = 'fixed';
        newImg.style.zIndex = 2000;
        newImg.style.transition = 0.8 + 's';
        newImg.style.top = currentImg.getBoundingClientRect().top + 'px';
        newImg.style.left = currentImg.getBoundingClientRect().left + 'px';
        document.body.append(newImg);

        setTimeout(() => {
          newImg.style.transform = 'rotate(360deg)';
          newImg.style.height = 0 + 'px';
          newImg.style.top = cartBtn.getBoundingClientRect().top + 15 + 'px';
          newImg.style.left = cartBtn.getBoundingClientRect().left + 20 + 'px';
        }, 100);

        setTimeout(() => {
          cartBtn.classList.add('animate__tada');
          cartBtn.addEventListener('animationend', () => {
            cartBtn.classList.remove('animate__tada');
          });
        }, 400);
      }
    });
  });
