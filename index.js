const { Deck } = require("./deck.js");
const { CARD_VALUE_MAP } = require("./CARD_VALUE_MAP.js");
const prompt = require("prompt-sync")({ sigint: true });

// const CARD_VALUE_MAP = {
// 	A: 1,
// 	2: 2,
// 	3: 3,
// 	4: 4,
// 	5: 5,
// 	6: 6,
// 	7: 7,
// 	8: 8,
// 	9: 9,
// 	10: 0,
// 	J: 0,
// 	Q: 0,
// 	K: 0,
// };

let playerCards, dealerCards, bet
let totalEarn = 0;
let isGameStart = true;


startGame()
function startGame(){

    const deck = new Deck();
    while (isGameStart) {
        deck.shuffle();
		bet = getBet();
		playerCards = deck.drawCard(2);
		dealerCards = deck.drawCard(2);
		// console.log("You got", playerCards.symbol + playerCards.value);
		// console.log("The dealer got", dealerCards.symbol + dealerCards.value);
		console.log("You got", playerCards);
		console.log("The dealer got", dealerCards);
		
        if (isRoundWinner(playerCards, dealerCards)) {
			console.log(`You won!!!, received ${bet} chips`);
			totalEarn += bet;
		} else if (isRoundWinner(dealerCards, playerCards)) {
			totalEarn -= bet;
			console.log(`You loose!!!, lost ${bet} chips`);
		} else {
			console.log(`tie!`);
		}
		isGameStart = getContinue();
		}
    console.log(`You got total ${totalEarn} chips`);
}

function getBet() {
    const bet = Number(prompt("please input your bet"));
	return bet;
}

function getContinue(){
    let isContinue;
    let askingToContinue = true;
    while(askingToContinue){
        const userPrompt = prompt("Wanna play more (Yes/No)?");
        // console.log("userPrompt= ", userPrompt);
        // console.log("userPrompt.toLowerCase()= ", userPrompt.toLowerCase());
        if (userPrompt.toLowerCase() === "yes") {
            isContinue = true
            askingToContinue = false
        } else if (userPrompt.toLowerCase() === "no") {
            isContinue = false;
            askingToContinue = false
        } else{
            askingToContinue = true
        }
    }
    return isContinue;
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

