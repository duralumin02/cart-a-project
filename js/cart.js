import { cartBtn, products, cartBox, totalCosts, cartCounter } from '../main';

export const updateCardCounter = () => {
  cartCounter.forEach((c) => {
    c.innerHTML = parseInt(c.innerHTML) + 1;
  });
};

export const costsTotal = () => {
  const allCartQuantityCosts = document.querySelectorAll('.cart-quantity-cost');
  let total = [...allCartQuantityCosts].reduce((pv, cv) => pv + parseFloat(cv.innerHTML), 0);
  totalCosts.innerHTML = total.toFixed(2);
};

window.inc = (event, price) => {
  let currentCart = event.target.closest('.product-in-cart');
  let cartQuantity = currentCart.querySelector('.cart-quantity');
  let cartQuantityCost = currentCart.querySelector('.cart-quantity-cost');
  cartQuantity.valueAsNumber += 1;
  cartQuantityCost.innerHTML = (cartQuantity.valueAsNumber * price).toFixed(2);
  costsTotal();
};

export const createProductInCart = ({ title, image, price }) => {
  let div = document.createElement('div');
  div.classList.add('product-in-cart');
  div.innerHTML = `
        <div class="p-3 mb-3 border rounded-2">
          <div class="mb-2">
            <img src="${image}" alt="" class="product-incart-img">
            <p class="mb-0 small">${title}</p>
          </div>
          <div class="d-flex justify-content-between align-items-center">
              <div class="row justify-content-between align-items-center">
                   <div class="col-4">
                   <p class="mb-0">$ <span class="mb-0 cart-quantity-cost">${price}</span></p>
                  </div>
                   <div class="col-6">
                      <div class="input-group input-group-sm">
                        <button class="btn  btn-primary" onclick="dec(event,${price})"><i class="bi bi-dash pe-none"></i></button>
                        <input type="number" class="form-control text-end cart-quantity" value="1">
                        <button class="btn btn-primary" onclick="inc(event,${price})"><i class="bi bi-plus pe-none"></i></button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
  `;
  cartBox.append(div);
};

export const addToCart = (e) => {
  let currentProductCard = e.target.closest('.product-card');
  let currentProductId = currentProductCard.getAttribute('id');
  let productDetail = products.find((i) => i.id === parseInt(currentProductId));
  let currentImg = currentProductCard.querySelector('.product-img');

  let newImg = new Image();
  newImg.src = currentImg.src;
  newImg.style.height = 80 + 'px';
  newImg.style.position = 'fixed';
  newImg.style.zIndex = 2000;
  newImg.style.transition = 1 + 's';
  newImg.style.top = currentImg.getBoundingClientRect().top + 'px';
  newImg.style.left = currentImg.getBoundingClientRect().left + 'px';
  document.body.append(newImg);

  setTimeout(() => {
    newImg.style.transform = 'rotate(360deg)';
    newImg.style.top = cartBtn.getBoundingClientRect().top + 15 + 'px';
    newImg.style.left = cartBtn.getBoundingClientRect().left + 20 + 'px';
    newImg.style.height = 0 + 'px';
  }, 100);

  setTimeout(() => {
    cartBtn.classList.add('animate__tada');
    setTimeout(() => updateCardCounter(), 500);
    createProductInCart(productDetail);
    costsTotal();
    newImg.remove();
  }, 1000);

  cartBtn.addEventListener('animationend', () => {
    cartBtn.classList.remove('animate__tada');
  });
};
