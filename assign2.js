// Built on Sample Code for Assignment 2
$(document).ready(function () {
    const cards = ['images/arr.JPG', 'images/hw.JPG', 'images/stb.JPG', 'images/shb.JPG', 'images/ew.JPG', 'images/dt.JPG', 'images/arr.JPG', 'images/hw.JPG', 'images/stb.JPG', 'images/shb.JPG', 'images/ew.JPG', 'images/dt.JPG'];
    let flippedCards = [], matchedPairs = 0;
    let timerInterval;
    let totalSeconds = 0;
    let started = false;
    let moves = 0;

    // Add an onClick event listener when the restart button to clear or start a game. 
    $('#restart').on('click', function () {
        resetTimer();
        resetScore();
        if ($('#restart').text() === "Restart Game") {
            $('#restart').text("Start Game");
            started = false;
            $('#win-msg').hide();
        } else {
            $('#restart').text("Restart Game");
            started = true;
            moves = 0;
            startTimer();
        }

        initializeGame();
    });

    initializeGame();
    $('#restart').show();
    $('#win-msg').hide();



    // Initializes the game by shuffling cards and setup the game board (grid)
    function initializeGame() {
        $('#game-board').empty().append(
            shuffleArray(cards).map(card => `
            <div class="card" data-card="${card}">
            <div class="card-inner">
                <div class="card-front" style="background-image: url('${card}')"></div>
                <div class="card-back"></div>
            </div>
            </div>
        `).join('')
        );

        $('.card').on('click', handleCardFlip);

        flippedCards = [];
        matchedPairs = 0;
    }

    // When a card is flipped, we add the flipped class to the card (see CSS stylesheet)
    // Then, we check for a match if two cards were flipped.
    function handleCardFlip() {
        if ($(this).hasClass('flipped') || flippedCards.length === 2 || !started) return;

        $(this).addClass('flipped');
        flippedCards.push($(this));
        moves++;

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 800);
        }
    }

    // Check to see when two flipped cards match, increment the matched pairs count. 
    // If all pairs match, then display a winning message. Otherwise, flip card back.
    function checkForMatch() {
        const [firstCard, secondCard] = flippedCards;

        if (firstCard.data('card') === secondCard.data('card')) {
            matchedPairs++;
            $('#score').text(matchedPairs);

            if (matchedPairs === cards.length / 2) {
                stopTimer();
                started = false;
                $('#win-msg').append(`<br>Moves: ${moves}, Time: ${$('#timer').text()}`);
                $('#win-msg').show();
            }
        } else {
            firstCard.removeClass('flipped');
            secondCard.removeClass('flipped');
        }
        flippedCards = [];
    }

    // Shuffle the arraing and randomize. Then, return the shuffled array.
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            totalSeconds++;

            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            // Format seconds with leading zero
            const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

            // Update the timer display
            $('#timer').text(`${minutes}:${formattedSeconds}`);
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function resetTimer() {
        stopTimer();
        totalSeconds = 0;
        $('#timer').text('0:00');
    }

    function resetScore() {
        matchedPairs = 0;
        $('#score').text(matchedPairs);
    }
});
