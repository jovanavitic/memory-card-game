const cards = document.querySelectorAll(".card");
// console.log(cards)

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false; //we need to prevent the user from clicking on the other cards until the first two cards unflip

//promenljive za tajmer
let timeLeft = 60; // postavljamo koliko sekundi korisnik ima da zavrsi igru (npr.45)
let timerInterval = null;


function startTimer() {
	const timerDisplay = document.getElementById("timer");
	timerInterval = setInterval(() => {
		timeLeft--;
		timerDisplay.textContent = timeLeft;
		if (timeLeft <= 0){
			clearInterval(timerInterval); //prekidamo brojanje
			endGame(false); // pozivamo funkciju
		}
	}, 1000); //na svakih 1s se desava ova f-ja

}

function endGame(win) {
	const message = document.getElementById("game-message");

	if (win) {
        message.textContent = "🎉 You win!";
    } else {
        message.textContent = "😢 You lost!";
        setTimeout(() => {
            resetGame(); //resetuj igru 5 sekundi nakon poraza
        }, 5000);
    }

    disableDeck = true;
}

// funkcija za resetovanje tajmera i igre
function resetGame(){
	clearInterval(timerInterval); // zaustavljamo prethodni tajmer
	timeLeft = 60;
	document.getElementById("timer").textContent = timeLeft; //azuriranje prikaza vremena
	timerInterval = null;

	disableDeck = false;
	document.getElementById("game-message").textContent = ""; // ciscenje poruke

	matchedCard = 0;

	shuffleCards(); // nakon sto resetujemo tajmer pozivamo funkciju koja mesa karte
}



function flipCard(e){
	let clickedCard = e.target; //getting user clicked card

	 if (!timerInterval) {
        startTimer(); // pokrećemo tajmer se samo jednom
    }

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
			
			clearInterval(timerInterval); // zaustavljamo tajmer
            endGame(true); // korisnik je uspešno završio igru

			setTimeout(() =>{
				return resetGame(); // f-ju pozivamo posle 5 sekundi
			}, 5000); // kada se dodje do kraja pozivamo ovu f-ju, a naredni kd ne zelimo da izvrsimo zato stavljamo return
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

function shuffleCards(){
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

shuffleCards();

cards.forEach(card => { //adding click event to all cards
	card.addEventListener("click", flipCard);
});

// shuffleCards() will be called two times, when user refresh browser, and when user mathes all the cards

