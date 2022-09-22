const { Deck } = require("./deck.js");
const prompt = require("prompt-sync")({ sigint: true });

const CARD_VALUE_MAP = {
	A: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	10: 0,
	J: 0,
	Q: 0,
	K: 0,
};

let playerCards, dealerCards
let totalEarn = 0;
let stop = false;


startGame()
function startGame(){

    
    while(!stop){
        
    const bet = getBet();
    const deck = new Deck();
    deck.shuffle();
    const playerCards = deck.drawCard(2)
    console.log('playerCards', playerCards)
    const dealerCards = deck.drawCard(2);
    console.log("dealerCards", dealerCards);
    
    if(isRoundWinner(playerCards, dealerCards)){
        console.log(`You won!!!, received ${bet} chips`);
        totalEarn += bet
    } else if(isRoundWinner(dealerCards, playerCards )){
        totalEarn -= bet
        console.log(`You loose!!!, lost ${bet} chips`);
    } else {
        console.log(`tie!`);
    }
}
}

function getBet() {
    const bet = Number(prompt("please input your bet"));
	return bet;
}

function isRoundWinner(cardOneList, cardTwoList) {
    let cardOneScore= 0; 
    let cardTwoScore= 0;

    cardOneList.forEach(card=> {
        cardOneScore += CARD_VALUE_MAP[card.value];
    })
    cardTwoList.forEach((card) => {
			cardTwoScore += CARD_VALUE_MAP[card.value];
		});

    console.log("cardOneScore= ", cardOneScore);
    console.log("cardTwoScore= ", cardTwoScore);

	return cardOneScore > cardTwoScore ;
}