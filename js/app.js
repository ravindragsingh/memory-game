/*
 * Create a list that holds all of your cards
 */

cards = [
    "fa-diamond", "fa-diamond",
    "fa-paper-plane-o", "fa-paper-plane-o",
    "fa-bolt", "fa-bolt",
    "fa-cube", "fa-cube",
    "fa-anchor", "fa-anchor",
    "fa-leaf", "fa-leaf",
    "fa-bicycle", "fa-bicycle",
    "fa-bomb", "fa-bomb"
]



// refreshing the page

function refresh() {
    location.reload()
}
moves = 0;
cardMatch = 0; // number of pairs = 8

//data-card added to use it for matching cards
function generateCard(card) {
    return `<li class ="card" data-card =" ${card}"><i class = "fa ${card}"></i></li>`;
}

//generating HTML
function initGame() {
    var deck = document.querySelector('.deck')
    var cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    })
    deck.innerHTML = cardHTML.join(''); // joining in HTML
}
initGame();

// start rating

// function generateStar(star) {
//     return `<li class ="star" data-star =" ${star}"><i class = "fa ${star}"></i></li>`;
// }

// //generating HTML
// function starGame() {
//     var stars = document.querySelector('.stars')
//     var starHTML = shuffle(starsAll).map(function(star) {
//         return generateStar(star);
//     })
//     stars.innerHTML = starHTML.join(''); // joining in HTML
// }
// starGame();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var allCards = document.querySelectorAll('.card');
var openCards = [];

allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
        moves = moves + 1;

        //Starting the timer on click 


        var seconds = 00;
        var sec = 00;
        var mins = 00;
        setInterval(function() {
            var a = new Date();
            document.getElementById("timer").innerHTML = mins + ":" + seconds + " : " + sec;
            sec++;

            if (sec == 2) {
                seconds++;
                if (seconds == 60) {
                    mins++;
                    seconds = 00;
                }
                sec = 00;
            }
        }, 500);
        //timer ends


        document.getElementById("move").innerHTML = moves;

        //  displaying star logic
        if (moves < 9) {
            starsAll = [
                    "fa-star", "fa-star", "fa-star"
                ]
                // start rating

            function generateStar(star) {
                return `<li class ="star" data-star =" ${star}"><i class = "fa ${star}"></i></li>`;
            }

            //generating HTML
            function starGame() {
                var stars = document.querySelector('.stars')
                var starHTML = shuffle(starsAll).map(function(star) {
                    return generateStar(star);
                })
                stars.innerHTML = starHTML.join(''); // joining in HTML
            }
            starGame();

            console.log("3 star");
        } else {

            if (moves > 8 && moves < 17) {

                starsAll = [
                        "fa-star", "fa-star"
                    ]
                    // start rating

                function generateStar(star) {
                    return `<li class ="star" data-star =" ${star}"><i class = "fa ${star}"></i></li>`;
                }

                //generating HTML
                function starGame() {
                    var stars = document.querySelector('.stars')
                    var starHTML = shuffle(starsAll).map(function(star) {
                        return generateStar(star);
                    })
                    stars.innerHTML = starHTML.join(''); // joining in HTML
                }
                starGame();
                console.log("2 star");
            } else {

                starsAll = [
                        "fa-star"
                    ]
                    // start rating

                function generateStar(star) {
                    return `<li class ="star" data-star =" ${star}"><i class = "fa ${star}"></i></li>`;
                }

                //generating HTML
                function starGame() {
                    var stars = document.querySelector('.stars')
                    var starHTML = shuffle(starsAll).map(function(star) {
                        return generateStar(star);
                    })
                    stars.innerHTML = starHTML.join(''); // joining in HTML
                }
                starGame();
                console.log("1 star")
            }
        }

        // makins sure open and show cards are not clickable
        if (!card.classList.contains('.open') || !card.classList.contains('.show') || !card.classList.contains('.match')) {
            //console.log(card); //logging what is being clicked
            //now lets push that card which is clicked in the array later compare the length of the array to 2
            // so that not more than 2 are being clicked

            openCards.push(card);
            card.classList.add('open', 'show');
            // after open and show check if the card matches with the preious open
            //console.log(card.classList);


            if (openCards.length == 2) {
                if (openCards[0].dataset.card == openCards[1].dataset.card) {

                    console.log("this is a match")
                    cardMatch++;
                    openCards[0].classList.add('match');
                    openCards[0].classList.add('show');
                    openCards[0].classList.add('open');
                    openCards[1].classList.add('match');
                    openCards[1].classList.add('show');
                    openCards[1].classList.add('open');
                    openCards = [];

                    // Match winning
                    if (cardMatch == 8) {
                        alert(`You have won the match in ${moves} moves`)

                    }

                }

                // if cards match then dont do this
                else {
                    setTimeout(function() {
                        openCards.forEach(function(card) {
                            card.classList.remove('open', 'show');
                        })
                        openCards = [];
                    }, 500)

                }
            }

            // else {

            // }
        }

    })
})



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */