import './style.css';
import bunLogo from './bun.svg';
import viteLogo from '/vite.svg';
import mock from './mock.json';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    
    <a href="https://bun.sh/" target="_blank">
      <img src="${bunLogo}" class="logo" alt="Bun logo" />
    </a>

    <form id='searchForm'>
      <input type='text' id='searchInput' placeholder='Enter a product here...'>
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

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const keyword = searchInput.value.trim();

    if (!keyword) {
      alert('Please enter a product!');
      return;
    }

    resultsContainer.innerHTML = "<p>Loading...</p>"

    try {
      const response = await fetch(`http://localhost:3001/api/scrape?keyword=${encodeURIComponent(keyword)}`);
      if (!response.ok) throw new Error('Failed to fetch products.');

      const data = await response.json();
      const products = data.products;

      if (products.length === 0) {
        resultsContainer.innerHTML = '<p>No products found.</p>';
        return;
      }

      resultsContainer.innerHTML = '';
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
          <img src='${product.imageUrl}' alt='${product.title}' />
          <h3>${product.title}</h3>
          <p>⭐ ${product.rating}</p>
          <p>${product.reviews} reviews</p>
        `;
        resultsContainer.appendChild(productCard);
      });

    } catch (error) {
      console.warn('Real fetch failed, using mock data:', error);

      warning.innerHTML = 'Warning'
      
      const products = mock;

      console.log('Mock data used:', products);
      

      if (products.length === 0) {
        resultsContainer.innerHTML = '<p>No products found.</p>';
        return;
      }

      if (Array.isArray(products) && products.length > 0) {
        resultsContainer.innerHTML = '';
        products.forEach(product => {
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');
          productCard.innerHTML = `
            <img src='${product.imageUrl}' alt='${product.title}' id='product-image'/>
            <h3>${product.title}</h3>
            <p>⭐ ${product.rating}</p>
            <p>${product.reviews} reviews</p>
          `;
          resultsContainer.appendChild(productCard);
        });
      } else {
        resultsContainer.innerHTML = '<p>No products found.</p>';
      }
      
      
      // resultsContainer.innerHTML = '<p>Error fetching products. Please try again later.</p>';
      // console.error('Error:', error);
    }
  })
})
