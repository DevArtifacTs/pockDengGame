const { Deck } = require("./deck.js");
const { CARD_VALUE_MAP } = require("./CARD_VALUE_MAP.js");
const prompt = require("prompt-sync")({ sigint: true });

const multiLinePrompt = (ask) => {
	const lines = ask.split(/\r?\n/);
	const promptLine = lines.pop();
	console.log(lines.join("\n"));
	return prompt(promptLine);
}; 

let playerCards, dealerCards, bet
let totalEarn = 0;
let isGameStart = true;
let isRemainCardIsAbleToPlay = true

startGame()
function startGame(){
    const deck = new Deck();
    while (isGameStart && isRemainCardIsAbleToPlay ) {

            isRemainCardIsAbleToPlay = isPlayable(deck.getCardNumber());
			// console.log("deck.length", deck.getCardNumber());
			// console.log("isRemainCardIsAbleToPlay", isRemainCardIsAbleToPlay);
			deck.shuffle();
			bet = getBet();
			playerCards = deck.drawCard(2);
			dealerCards = deck.drawCard(2);
			console.log("You got", cardDisplayer(playerCards));
			console.log("The dealer got", cardDisplayer(dealerCards));

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
        if (!isRemainCardIsAbleToPlay){
            throw new Error(`no card left, you got total ${totalEarn} chips`);
        } else {
            console.log(`You got total ${totalEarn} chips`);
        }
}

function getBet() {
    const bet = Number(multiLinePrompt("please input your bet \n"));
	return bet;
}

function getContinue(){
    let isContinue;
    let askingToContinue = true;
    while(askingToContinue){
        const userPrompt = multiLinePrompt("Wanna play more (Yes/No)? \n");
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

function getCardListTotalScore(cardList){
    let cardScore= 0;
    cardList.forEach((card) => {
			cardScore += CARD_VALUE_MAP[card.value];
		});
    return cardScore;
}

function isRoundWinner(cardOneList, cardTwoList) {
    let cardOneScore = getCardListTotalScore(cardOneList);
    let cardTwoScore = getCardListTotalScore(cardTwoList);
    // console.log("cardOneScore= ", cardOneScore);
    // console.log("cardTwoScore= ", cardTwoScore);
	return cardOneScore > cardTwoScore ;
}

function cardDisplayer(cardList){
    const actualCard = cardList.map(card => card.symbol + card.value)
    return actualCard;
}

function isPlayable(deckCards){
    if(deckCards < 0 ){
        return false
    } else {
        return true
    }
}

