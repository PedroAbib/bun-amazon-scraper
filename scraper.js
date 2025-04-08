import axios from "axios";
import { JSDOM } from "jsdom";

/**
 * Function that scrapes products from Amazon based on a given keyword.
 * 
 * @param {string} keyword - The searched product. 
 * @returns {Promise<Array>} An array of products related to the given keyword.
 * Each product is an object containing: title, priceSymbol, priceWhole, priceFraction,
 * rating, reviews, imageUrl and productUrl.
 */
export async function scrape(keyword) {

    // By using encodeURIComponent I'm able to ensure that spaces or special characters will be handled and fit
    // for the URL.
    const searchTerm = keyword;

    // Here I declare the amazon search URL with the keyword parameter that will be used by Axios.
    const url = `https://www.amazon.com/s?k=${searchTerm}`;

    // Defining this header allows me to simulate a browser's request when using Axios, so that Amazon doesn't
    // block the scrape request.
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
    };

    // Here I first make the GET request, storing it into a const, then I create a DOM object with JSDOM using
    // the response data from that request, then I declare a document from that DOM, allowing me to manipulate
    // the page's HTML.
    const response = await axios.get(url, { headers });
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    // With the document, I'm able to use the querySelectorAll method to return a NodeList with information of
    // the items on the page selected by '.s-result-item'. This will allow me to iterate through all of its
    // information.
    const items = document.querySelectorAll('.s-result-item');

    // Declaring the products array, so I'm able to store them here before iterating, building and finally
    // returning it.
    const products = [];

    // Now, for each 'item' found with the '.s-result-item' selector in the document, I can extract the
    // information I need to create an object before adding each to my products array.
    items.forEach(item => {
        try{
            // Here I search for the elements that correspond to the task's required product details, then
            // I store them to be able to build a product later with each information.

            // Storing title:
            const titleElement = item.querySelector('h2 a span') || item.querySelector('h2 span');
            const title = titleElement ? titleElement.textContent.trim() : 'N/A';

            // Storing price symbol:
            const priceSymbolElement = item.querySelector('.a-price-symbol');
            const priceSymbol = priceSymbolElement ? priceSymbolElement.textContent.trim() : 'Unavailable';

            // Storing price whole value:
            const priceWholeElement = item.querySelector('.a-price-whole');
            const priceWhole = priceWholeElement ? priceWholeElement.textContent.trim().replace(/\.$/, '') : '';

            // Storing price fraction value:
            const priceFractionElement = item.querySelector('.a-price-fraction');
            const priceFraction = priceFractionElement ? priceFractionElement.textContent.trim() : '';
            
            // Storing rating:
            const ratingElement = item.querySelector('.a-icon-star-small .a-icon-alt');
            const rating = ratingElement ? ratingElement.textContent.trim().split(' ')[0] : 'N/A';

            // Storing reviews:
            const reviewsElement = item.querySelector('.a-size-small .a-link-normal .a-size-base');
            const reviews = reviewsElement ? reviewsElement.textContent.trim() : 'N/A';
            
            // Storing image url:
            const imageElement = item.querySelector('img.s-image');
            const imageUrl = imageElement ? imageElement.getAttribute('src') : 'N/A';

            // Storing product url:
            const productUrlElement = item.querySelector('h2 a') || item.querySelector('a.a-link-normal');
            const productUrl = productUrlElement ? `https://www.amazon.com${productUrlElement.getAttribute('href')}` : 'N/A';

            // In case the title is valid, I can build an object that represents the product, then I add it
            // to the products array.
            if (title !== 'N/A') {
                products.push({
                    title,
                    priceSymbol,
                    priceWhole,
                    priceFraction,
                    rating,
                    reviews,
                    imageUrl,
                    productUrl
                });     
            }
        } catch (error) {
            // In case something goes wrong, the application doesn't break and debug information is caught.
            console.error('Error building item:', error);
        }
    });
    
    // Finally, after scraping all the products information and adding them to the products array, I can
    // then return it.
    return products;
}