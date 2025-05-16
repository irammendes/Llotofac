document.addEventListener('DOMContentLoaded', function() {
    // Initialize heatmap
    initHeatmap();
    
    // Game generator form submission
    document.getElementById('game-generator').addEventListener('submit', function(e) {
        e.preventDefault();
        generateGames();
        addUserPoints(10); // Add 10 points for generating games
    });
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

function initHeatmap() {
    const wheel = document.getElementById('heatmap');
    wheel.innerHTML = '';
    
    // Create 25 balls with heat levels (in a real app, this would come from backend)
    for (let i = 1; i <= 25; i++) {
        const ball = document.createElement('div');
        ball.className = 'number-ball';
        
        // Random heat level for demo (in real app, based on actual data)
        const heatLevel = Math.floor(Math.random() * 5);
        switch(heatLevel) {
            case 0: ball.classList.add('cold'); break;
            case 1: ball.classList.add('cool'); break;
            case 2: ball.classList.add('neutral'); break;
            case 3: ball.classList.add('warm'); break;
            case 4: ball.classList.add('hot'); break;
        }
        
        ball.textContent = i;
        ball.addEventListener('click', function() {
            alert(`Dezena ${i} selecionada para análise.`);
        });
        wheel.appendChild(ball);
    }
}

function generateGames() {
    // In a real app, this would call an API to generate games based on parameters
    console.log('Generating games based on form parameters...');
    
    // Demo: Show success message
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show';
    alert.innerHTML = `
        <strong>Sucesso!</strong> Seus jogos foram gerados com base nas estratégias selecionadas.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.querySelector('main').prepend(alert);
}

function addUserPoints(points) {
    // In a real app, this would update user points in the backend
    const pointsElement = document.querySelector('#user-profile .badge');
    const currentPoints = parseInt(pointsElement.textContent.replace('Pontos: ', '').replace(',', ''));
    pointsElement.textContent = `Pontos: ${(currentPoints + points).toLocaleString()}`;
    
    // Check for achievements
    checkAchievements(currentPoints + points);
}

function checkAchievements(totalPoints) {
    // In a real app, this would check backend for unlocked achievements
    if (totalPoints >= 1000) {
        // Unlock "Estrategista Mestre" achievement
        console.log('Achievement unlocked: Estrategista Mestre');
    }
}
