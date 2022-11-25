
let quotesData;

const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];

function getQuotes() {
    return $.ajax({
        headers: { Accept: 'application/json' },
        url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        success: function (jsonQuotes) {
            if (typeof jsonQuotes === 'string') { quotesData = JSON.parse(jsonQuotes); }
        }
    });
}

let ran = num => Math.floor(num.length * Math.random())

let getQuote = () => {
    let randomQuote = quotesData.quotes[ran(quotesData.quotes)];

    // enlace de twitter 
    $('#tweet-quote').attr('href',
        'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + randomQuote.quote + '" ' + randomQuote.author));

    $('.quote-text, .quote-author').animate({ opacity: 0 }, 500,
        function () {
            $(this).animate({ opacity: 1 }, 500);
            $('#text').text(randomQuote.quote);
            $('#author').html(randomQuote.author);
        }
    );

    let color = ran(colors)

    $('body').animate({ backgroundColor: colors[color], color: colors[color] }, 1000);
    $('.button').animate({ backgroundColor: colors[color] }, 1000);
}

$(document).ready(function () {
    getQuotes().then(() => { getQuote(); });
    $('#new-quote').on('click', getQuote);
});
