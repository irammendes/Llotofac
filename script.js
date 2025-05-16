document.addEventListener('DOMContentLoaded', () => {
    const gameTypeSelect = document.getElementById('game-type');
    const numbersGrid = document.getElementById('numbers');
    const selectedCount = document.getElementById('selected-count');
    const minNumbersSpan = document.getElementById('min-numbers');
    const generateButton = document.getElementById('generate');
    const clearButton = document.getElementById('clear');
    const resultsDiv = document.getElementById('results');
    const combinationsDiv = document.getElementById('combinations');

    let selectedNumbers = [];
    let gameConfig = {
        maxNumbers: 60,
        numbersToCombine: 6,
        minNumbers: 6
    };

    // Configurações dos jogos
    const games = {
        megasena: { maxNumbers: 60, numbersToCombine: 6, minNumbers: 6 },
        lotofacil: { maxNumbers: 25, numbersToCombine: 15, minNumbers: 15 },
        quina: { maxNumbers: 80, numbersToCombine: 5, minNumbers: 5 }
    };

    // Inicializar números
    function initNumbers() {
        numbersGrid.innerHTML = '';
        for (let i = 1; i <= gameConfig.maxNumbers; i++) {
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('number');
            numberDiv.textContent = i.toString().padStart(2, '0');
            numberDiv.addEventListener('click', () => toggleNumber(i, numberDiv));
            numbersGrid.appendChild(numberDiv);
        }
        updateSelectedCount();
        updateMinNumbers();
    }

    // Alternar seleção de número
    function toggleNumber(number, element) {
        if (selectedNumbers.includes(number)) {
            selectedNumbers = selectedNumbers.filter(n => n !== number);
            element.classList.remove('selected');
        } else {
            selectedNumbers.push(number);
            element.classList.add('selected');
        }
        updateSelectedCount();
    }

    // Atualizar contagem de números selecionados
    function updateSelectedCount() {
        selectedCount.textContent = selectedNumbers.length;
        generateButton.disabled = selectedNumbers.length < gameConfig.minNumbers;
    }

    // Atualizar texto de números mínimos
    function updateMinNumbers() {
        minNumbersSpan.textContent = `(Mínimo: ${gameConfig.minNumbers})`;
    }

    // Mudar tipo de jogo
    gameTypeSelect.addEventListener('change', () => {
        const game = gameTypeSelect.value;
        gameConfig = games[game];
        selectedNumbers = [];
        initNumbers();
    });

    // Gerar combinações
    generateButton.addEventListener('click', () => {
        if (selectedNumbers.length < gameConfig.minNumbers) {
            alert(`Selecione pelo menos ${gameConfig.minNumbers} números!`);
            return;
        }
        const combinations = generateCombinations(selectedNumbers, gameConfig.numbersToCombine);
        displayCombinations(combinations);
    });

    // Limpar seleção
    clearButton.addEventListener('click', () => {
        selectedNumbers = [];
        initNumbers();
        resultsDiv.classList.remove('show');
        combinationsDiv.innerHTML = '';
    });

    // Função para gerar combinações
    function generateCombinations(numbers, k) {
        const result = [];
        function combine(current, start) {
            if (current.length === k) {
                result.push([...current].sort((a, b) => a - b));
                return;
            }
            for (let i = start; i < numbers.length; i++) {
                current.push(numbers[i]);
                combine(current, i + 1);
                current.pop();
            }
        }
        combine([], 0);
        return result;
    }

    // Exibir combinações
    function displayCombinations(combinations) {
        combinationsDiv.innerHTML = '';
        if (combinations.length === 0) {
            combinationsDiv.textContent = 'Nenhuma combinação gerada.';
            return;
        }
        combinations.forEach((combo, index) => {
            const comboDiv = document.createElement('div');
            comboDiv.classList.add('combination');
            comboDiv.textContent = `Jogo ${index + 1}: ${combo.map(n => n.toString().padStart(2, '0')).join(' - ')}`;
            combinationsDiv.appendChild(comboDiv);
        });
        resultsDiv.classList.add('show');
    }

    // Inicializar
    initNumbers();
});
