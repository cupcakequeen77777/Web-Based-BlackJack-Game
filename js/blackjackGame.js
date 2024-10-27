// Document owned and created by Omar Syed
class BlackjackGame {
    constructor() {
        this.deck = new Deck();
        this.playerHand = [];
        this.dealerHand = [];
        this.isGameOver = false;
        this.dealerHidden = true;  
        this.dealInitialCards();
        this.updateScores();
        this.addEventListeners();
    }

    dealInitialCards() {
        this.playerHand.push(this.deck.drawCard(), this.deck.drawCard());
        this.dealerHand.push(this.deck.drawCard(), this.deck.drawCard());
        this.renderHands();
        this.updateScores();
    }

    addEventListeners() {
        document.getElementById('hit-button').addEventListener('click', () => this.hit());
        document.getElementById('stand-button').addEventListener('click', () => this.stand());
        document.getElementById('restart-button').addEventListener('click', () => this.restartGame());
    }

    hit() {
        if (this.isGameOver) return;
        this.playerHand.push(this.deck.drawCard());
        this.renderHands();
        this.updateScores();
        if (this.calculateScore(this.playerHand) > 21) {
            this.endGame('You busted! Dealer wins.');
        }
    }

    stand() {
        if (this.isGameOver) return;
        this.dealerHidden = false;  
        while (this.calculateScore(this.dealerHand) < 17) {
            this.dealerHand.push(this.deck.drawCard());
        }
        this.renderHands();
        this.updateScores();
        this.determineWinner();
    }

    determineWinner() {
        const playerScore = this.calculateScore(this.playerHand);
        const dealerScore = this.calculateScore(this.dealerHand);
        if (dealerScore > 21 || playerScore > dealerScore) {
            this.endGame('You win!');
        } else if (playerScore < dealerScore) {
            this.endGame('Dealer wins.');
        } else {
            this.endGame('It\'s a tie.');
        }
    }

    endGame(message) {
        this.isGameOver = true;
        document.getElementById('game-status').textContent = message;
        document.getElementById('hit-button').disabled = true;
        document.getElementById('stand-button').disabled = true;
        document.getElementById('restart-button').disabled = false;
    }

    restartGame() {
        this.deck = new Deck();
        this.playerHand = [];
        this.dealerHand = [];
        this.isGameOver = false;
        this.dealerHidden = true;  
        document.getElementById('game-status').textContent = '';
        document.getElementById('hit-button').disabled = false;
        document.getElementById('stand-button').disabled = false;
        document.getElementById('restart-button').disabled = true;
        this.dealInitialCards();
        this.updateScores();
    }

    calculateScore(hand) {
        let score = 0;
        let aceCount = 0;
        for (const card of hand) {
            if (['J', 'Q', 'K'].includes(card.value)) {
                score += 10;
            } else if (card.value === 'A') {
                score += 11;
                aceCount++;
            } else {
                score += parseInt(card.value);
            }
        }
        while (score > 21 && aceCount > 0) {
            score -= 10;
            aceCount--;
        }
        return score;
    }

    renderHands() {
        const dealerCardsDiv = document.getElementById('dealer-cards');
        const playerCardsDiv = document.getElementById('player-cards');
        dealerCardsDiv.innerHTML = '';
        playerCardsDiv.innerHTML = '';


        for (let i = 0; i < this.dealerHand.length; i++) {
            if (i === 1 && this.dealerHidden) {
                dealerCardsDiv.innerHTML += `<div class="card hidden-card">Hidden</div>`;
            } else {
                dealerCardsDiv.innerHTML += `<div class="card">${this.dealerHand[i].value} of ${this.dealerHand[i].suit}</div>`;
            }
        }

        
        for (const card of this.playerHand) {
            playerCardsDiv.innerHTML += `<div class="card">${card.value} of ${card.suit}</div>`;
        }

        this.updateScores();
    }

    updateScores() {
        document.getElementById('player-score').textContent = `Score: ${this.calculateScore(this.playerHand)}`;
        if (this.dealerHidden) {
            document.getElementById('dealer-score').textContent = `Score: ?`;
        } else {
            document.getElementById('dealer-score').textContent = `Score: ${this.calculateScore(this.dealerHand)}`;
        }
    }
}

window.onload = () => {
    new BlackjackGame();
};
