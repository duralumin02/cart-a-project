import { excerpt } from './utilities';

export default function createItemUi({ id, title, image, description, price }) {
  let itemDiv = document.createElement('div');
  itemDiv.classList.add('col-12', 'col-md-4', 'col-lg-3');
  itemDiv.innerHTML = `
                    <div class="card product-card" id="${id}">
						<div class="card-body d-flex flex-column" id="${id}">
                            <div class="mb-3">
                            	<img src="${image}" class="product-img"></img>
							</div>
							<p class="card-title fw-bold text-truncate mt-4">${title}</p>
							<p class="product-description">
								${excerpt(description)}
							</p>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
								<p class="mb-0 text-primary fw-semibold ">$ <span>${price}</span></p>
								<button class="btn btn-sm btn-outline-primary add-to-cart"><i class="bi bi-cart-plus me-2 pe-none"></i>Add cart</button>
							</div>
						</div>
					</div>
            `;
  return itemDiv;
}
