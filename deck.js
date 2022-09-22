const SYMBOLS = ["♠", "♣", "♥", "♦"];
const VALUES = [
	"A",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"J",
	"Q",
	"K",
];

class Deck {
	constructor(cards = createDeck()) {
		this.cards = cards;
	}

	getCardNumber() {
		return this.cards.length;
	}

	drawCard(numberToDraw) {
		let drawedCard = [];
		for (let i = 0; i < numberToDraw; i++) {
			drawedCard.push(this.cards.shift());
		}
		return drawedCard;
	}

	shuffle() {
		this.cards.forEach((card, index) => {
			const newIndex = Math.floor(Math.random() * (index + 1));
			const oldCard = this.cards[index];
			const newCard = this.cards[newIndex];
			this.cards[index] = newCard;
			this.cards[newIndex] = oldCard;
		});
		return this.cards;
	}
}

class Card {
	constructor(symbol, value) {
		this.symbol = symbol;
		this.value = value;
	}
}

function createDeck() {
	return SYMBOLS.flatMap((symbol) => {
		return VALUES.map((value) => {
			return new Card(symbol, value);
		});
	});
}

module.exports = { Deck, Card };
