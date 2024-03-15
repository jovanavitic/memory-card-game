const cards = document.querySelectorAll(".card");
// console.log(cards)

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false; //we need to prevent the user from clicking on the other cards until the first two cards unflip


function flipCard(e){
	let clickedCard = e.target; //getting user clicked card
	if(clickedCard != cardOne && !disableDeck){
		clickedCard.classList.add("flip");

		if (!cardOne){
			return cardOne = clickedCard;
		}

		cardTwo = clickedCard;
		// ukoliko je cardOne prazno, popunjavamo je sa clicked card
		// ukoliko nije, ne popunjavamo
		// zatim popunimo cardTwo
		disableDeck = true;
		let cardOneImg = cardOne.querySelector("img").src;
		let cardTwoImg = cardTwo.querySelector("img").src;
		matchCards(cardOneImg, cardTwoImg);
	}	
}

function matchCards(img1, img2){
	if (img1 === img2){ // if two cards img matched
		matchedCard++; // povecavamo ovu promenljvu svaki put kad mecujemo karte
		if (matchedCard == 8) { //if matched value is 8b that means that user has matched all the cards, 8 * 2 = 16
			setTimeout(() =>{
				return suffleCard(); // f-ju pozivamo posle 1 sekunde
			}, 1000); // kada se dodje do kraja pozivamo ovu f-ju, a naredni kd ne zelimo da izvrsimo zato stavljamo return
		}
		cardOne.removeEventListener("click", flipCard);
		cardTwo.removeEventListener("click", flipCard);
		cardOne = cardTwo = ""; //setting both values to blank;
		return disableDeck = false; // returning if the two cards are matched so the bottom codes won't run
	}

	//if two card not matched
	setTimeout(()=>{
		//adding shake class to both card after 400ms
		cardOne.classList.add("shake");
		cardTwo.classList.add("shake");
	}, 400);

	setTimeout(()=>{
		//removing both shake and flip classes from the both card after 1.2 seconds
		cardOne.classList.remove("shake", "flip");
		cardTwo.classList.remove("shake", "flip");
		cardOne = cardTwo = ""; //setting both card values to blank
		disableDeck = false;
	}, 1200);

	

}

function suffleCard(){
	matchedCard = 0;
	cardOne = cardTwo = "";
	disableDeck = false;
	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
	arr.sort(() => Math.random() > 0.5 ? 1 : -1); //sorting array item randomly

	// removing flip class from all cards and passing random image to each card
	cards.forEach((card, index) => {
		card.classList.remove("flip"); // now it is unfliping if all the cards are mathed
		let imgTag = card.querySelector("img");
		imgTag.src = `images/img-${arr[index]}.png`;
		card.addEventListener("click", flipCard);
	})
}

suffleCard();

cards.forEach(card => { //adding click event to all cards
	card.addEventListener("click", flipCard);
});

// suffleCard() will be called two times, when user refresh browser, and when user mathes all the cards

