document.addEventListener('DOMContentLoaded', () => {
    // Assuming you have a predefined list of teams
    const teams = [
        { id: 1, name: "Qatar", players: ["Player 1", "Player 2"] },
        { id: 2, name: "Ecuador", players: ["Player 3", "Player 4"] },
        // Add other teams here
    ];

    const teamsListContainer = document.getElementById('teams-list');

    teams.forEach(team => {
        const teamElement = document.createElement('div');
        teamElement.innerHTML = `
            <h2>${team.name}</h2>
            <button onclick="showPlayers(${team.id})">View Players</button>
            <div id="players-${team.id}" style="display:none;"></div>
        `;
        teamsListContainer.appendChild(teamElement);
    });
});

function showPlayers(teamId) {
    const team = teams.find(t => t.id === teamId);
    const playersContainer = document.getElementById(`players-${teamId}`);
    
    if (playersContainer.style.display === "none") {
        playersContainer.style.display = "block";
        playersContainer.innerHTML = team.players.map(player => `<p>${player}</p>`).join('');
    } else {
        playersContainer.style.display = "none";
    }
}