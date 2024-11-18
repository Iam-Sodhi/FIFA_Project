document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded, fetching teams data...');
    fetch('../data/teams.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(teams => {
            console.log('Teams data fetched:', teams);

            const teamsListContainer = document.getElementById('teams-list');

            teams.forEach(team => {
                console.log(`Creating card for team: ${team.name}`);

                // Create team card
                const teamCard = document.createElement('div');
                teamCard.className = 'team-card col-md-3 mb-4';
                teamCard.innerHTML = `
                    <div class="card h-100">
                        <img src="${team.flag}" alt="${team.name} Flag" class="card-img-top" />
                        <div class="card-body">
                            <h5 class="card-title">${team.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Captain: ${team.captain}</h6>
                            <button type="button" class="btn btn-primary view-players-btn" data-id="${team.id}">View Players</button>
                        </div>
                    </div>
                `;
                teamsListContainer.appendChild(teamCard);

                // Attach click event to dynamically open modal
                teamCard.querySelector('.view-players-btn').addEventListener('click', () => {
                    console.log(`"View Players" button clicked for team: ${team.name}`);
                    openTeamModal(team);
                });
            });
        })
        .catch(error => console.error('Error fetching teams:', error));
});

// Function to open modal dynamically
function openTeamModal(team) {
    console.log(`Opening modal for team: ${team.name}`);
    // Check if the modal already exists
    let modal = document.getElementById(`modal-${team.id}`);
    if (!modal) {
        console.log(`Creating modal for team: ${team.name}`);

        // Create modal for the team if it doesn't exist
        modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = `modal-${team.id}`;
        modal.tabIndex = '-1';
        modal.setAttribute('aria-labelledby', `modalLabel-${team.id}`);
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel-${team.id}">${team.name} Players</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="list-group">
                            ${team.players.map(player => `<li class="list-group-item">${player}</li>`).join('')}
                        </ul>
                    </div>
                       <div class="modal-footer">
                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Log modal creation
    console.log(`Modal created or found for team: ${team.name}`, modal);

    // Show the modal using Bootstrap's API
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}
