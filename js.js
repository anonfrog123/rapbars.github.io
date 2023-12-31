// Masonry

let grid = document.querySelector('.gallery');

new Masonry(grid);

// Infinite Scroll

let page = 2;

window.addEventListener('scroll', () => {
  if(window.scrollY + window.innerHeight >= document.body.offsetHeight) {
    loadGallery(page);
    page++;
  }
})

// Load Images

async function loadGallery(page) {
  let response = await fetch(`api/nfts?page=${page}`);
  let nfts = await response.json();
  
  nfts.forEach(nft => {
    let html = `
      <div class="nft">
        <img src="${nft.image}">
      </div>
    `;
    
    document.querySelector('.gallery').insertAdjacentHTML('beforeend', html); 
  })
  
  grid.reloadItems();
}

// Overlay

document.querySelectorAll('.nft').forEach(nft => {

  nft.addEventListener('click', async () => {
  
    let id = nft.getAttribute('data-id');
    
    let response = await fetch(`api/nfts/${id}`);
    let data = await response.json();
    
    let html = `
      <h3>${data.name}</h3>
      <p>${data.description}</p>
    `;

    document.querySelector('.overlay').innerHTML = html;
    document.querySelector('.overlay').style.display = 'block';

  })

})

// Close Overlay

document.querySelector('.overlay').addEventListener('click', () => {
  document.querySelector('.overlay').style.display = 'none';
})

// Search

document.getElementById('search').addEventListener('input', (e) => {

  let term = e.target.value;

  // Filter logic

  grid.reloadItems();

})

// Animations with AOS

AOS.init();