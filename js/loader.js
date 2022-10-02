function showLoader() {
  const loader = document.createElement('div');
  loader.classList.add('loader', 'animate__animated', 'animate__fadeIn');
  loader.innerHTML = `
             <div class="loader-control vh-100 fixed-top">
				<div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem">
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>
    `;
  document.body.append(loader);
}

function hideLoader() {
  const currentDisplayLoader = document.querySelector('.loader');
  currentDisplayLoader.classList.replace('animate__fadeIn', 'animate__fadeOut');
  currentDisplayLoader.addEventListener('animationend', () => {
    currentDisplayLoader.remove();
  });
}

export { showLoader, hideLoader };
