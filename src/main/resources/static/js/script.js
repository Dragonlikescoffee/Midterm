// scripts.js
const games = [
  { id: 1, title: "Adventure Quest", price: 29.99, category: "adventure", image: "game1.jpg" },
  { id: 2, title: "Mystery Island", price: 19.99, category: "puzzle", image: "game2.jpg" },
  { id: 3, title: "Battlefield X", price: 39.99, category: "action", image: "game3.jpg" },
  // Additional game data can go here
];

function displayGames(filteredGames) {
  const gamesList = document.getElementById('games-list');
  gamesList.innerHTML = ""; // Clear previous content
  
  filteredGames.forEach(game => {
    const gameCard = `
      <div class="game-card">
        <img src="${game.image}" alt="${game.title}">
        <h3>${game.title}</h3>
        <p>$${game.price}</p>
        <button onclick="addToCart(${game.id})">Add to Cart</button>
      </div>
    `;
    gamesList.innerHTML += gameCard;
  });
}

function filterGames() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const categorySelect = document.getElementById('category-select').value;

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchInput);
    const matchesCategory = categorySelect === "all" || game.category === categorySelect;
    return matchesSearch && matchesCategory;
  });

  displayGames(filteredGames);
}

// Initial display of all games on page load
displayGames(games);
