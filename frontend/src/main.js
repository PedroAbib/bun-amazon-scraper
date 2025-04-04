import './style.css';
import bunLogo from './bun.svg';
import viteLogo from '/vite.svg';
import mock from './mock.json';

document.querySelector('#app').innerHTML = `
  <div>
    <div id='credit-container'>
      <span id='credit'>Made with</span>
      <a class='logo-link' href="https://bun.sh/" target="_blank">
        <img src="${bunLogo}" class="logo" alt="Bun logo" />
      </a>
      <span id='credit'>and</span> 
      <a class='logo-link' href="https://vite.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
      <span id='credit'>by&nbsp;</span>
      <a href='https://github.com/PedroAbib' target='_blank'>Pedro</a>
    </div>
    <form id='searchForm'>
      <input type='text' id='searchInput' placeholder='Search Amazon...'>
      <input type='submit' id='searchSubmit' value='Search'>
    </form>

    <p id='warning'></p>
    <div id='results'></div>
  </div>
`

document.addEventListener('DOMContentLoaded', () => {

  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('results');
  const warning = document.getElementById('warning');

  const renderProducts = (products) => {
    if (products.length === 0) {
      resultsContainer.innerHTML = '<p>No products found.</p>';
      return;
    }
    
    resultsContainer.innerHTML = '';

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
        <a href='${product.productUrl}' target='_blank'>
          <div id='product-image-container'>
            <img id='product-image' src='${product.imageUrl}' alt='${product.title}' />
          </div>
          
          <div id='product-title-container'>
            <h3>${product.title}</h3>
          </div>
          
          <div id='product-details-container'>
            <div id='product-price'>
              <span id='price-symbol'>${product.priceSymbol}</span>
              <span id='price-whole'>${product.priceWhole}</span>
              <span id='price-fraction'>${product.priceFraction}</span>
            </div>

            <div id='product-details'>
              <p id='product-rating'>⭐ ${product.rating}</p>
              <p id='product-reviews'>${product.reviews} reviews</p>
            </div>
          </div>
        </a>
      `;
      resultsContainer.appendChild(productCard);
    });
  };

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const keyword = searchInput.value.trim();

    if (!keyword) {
      warning.innerHTML = 'Please enter a product!';

      setTimeout(() => {
        warning.innerHTML = '';
      }, 3000);

      return;
    } else {
      resultsContainer.innerHTML = `<div class="loader"></div>`;

      try {
        warning.innerHTML = '';
  
        const response = await fetch(`http://localhost:3001/api/scrape?keyword=${encodeURIComponent(keyword)}`);
        if (!response.ok) throw new Error('Failed to fetch products.');
  
        const data = await response.json();
        const products = data.products;

        renderProducts(products);
  
      } catch (error) {
        console.warn('Real fetch failed, using mock data:', error);
  
        warning.innerHTML = 'Amazon connection failed, using mock data instead. Please, try again later.';
        
        const products = mock;
  
        console.log('Mock data used:', products);
  
        renderProducts(products);

      } finally {
        loader.remove();
      }
    }
  });
});
