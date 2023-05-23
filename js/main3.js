const inp = document.querySelector('.x');
let cardData = []; 

function block(data) {
    const html = `
    <article class="con">
        <img src="${data.default_image.thumbnail}" alt="Plant Image" class="plant-image" onclick="viewDetails(event)">
        <h2>Name:${data.common_name}</h2>
        <p><span id="${data.id}"></span></p>
        <p><span>info:${data.cycle}</span></p>
        <p><span>price: 10$ </span></p>
        <button class="add-to-cart" onclick="addToCart(event)">Добавить в корзину</button>
    </article>
  `;
    return html;
}

function addToCart(event) {
    const block = event.target.closest('.con');
    const img = block.querySelector('img').src;
    const name = block.querySelector('h2').textContent;
    const id = block.querySelector('p span[id]').id;

    const cartItem = {
        img,
        name,
        id
    };

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function viewDetails(event) {
    const block = event.target.closest('.con');
    const id = block.querySelector('p span[id]').id;

    localStorage.setItem('selectedItemId', id);
    window.location.href = '../html/index4.html';
}

const searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener('input', filterCards);

function filterCards() {
    const searchText = searchInput.value.toLowerCase();

    const filteredCards = cardData.filter((card) => {
        const name = card.common_name.toLowerCase();
        return name.includes(searchText);
    });

    renderCards(filteredCards);
}

function renderCards(cards) {
    clearContainer();

    cards.forEach((card) => {
        const html = block(card);
        inp.insertAdjacentHTML('beforeend', html);
    });
}

function clearContainer() {
    inp.innerHTML = '';
}

async function show() {
    try {
        const response = await fetch('https://perenual.com/api/species-list?page=1&key=sk-oC2o646648e8a363c981');
        const data = await response.json();
        cardData = [...data.data]; 
        renderCards(cardData);
        filterCards(); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

show();
