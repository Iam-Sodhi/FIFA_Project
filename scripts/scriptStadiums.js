document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/stadiums.json')  // Fetch the stadium data from a JSON file
        .then(response => response.json())
        .then(stadiums => {
            console.log(stadiums)
            const stadiumsListContainer = document.getElementById('stadiums-list');

            stadiums.forEach(stadium => {
                const stadiumCard = document.createElement('div');
                stadiumCard.className = 'stadium-card col-md-4 mb-4'; // Bootstrap column class
                stadiumCard.innerHTML = `
                    <div class="card">
                        <img src="${stadium.image}" alt="${stadium.name} Image" class="card-img-top" />
                        <div class="card-body">
                            <h5 class="card-title">${stadium.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Location: ${stadium.location}</h6>
                            <p class="card-text">Capacity: ${stadium.capacity}</p>
                        </div>
                    </div>
                `;
                stadiumsListContainer.appendChild(stadiumCard);
            });
        })
        .catch(error => console.error('Error fetching stadiums:', error));
});
