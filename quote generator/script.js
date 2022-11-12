const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


let apiQuotes= []

// Show loading
function loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}

// Hide loading
function complete(){
    loader.hidden = true
    quoteContainer.hidden = false
}


function newQuote(){
    loading()
    const quote = apiQuotes[Math.floor(Math.random()  *apiQuotes.length)]
    // console.log(quote);
    if(quote.textContent > 120){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text
    complete()


    if(quote.author === null){
        authorText.textContent = 'Unknown'
    }else{
        authorText.textContent = quote.author
    }
}

async function getQuotes(){
    const apiUrl = ('https://type.fit/api/quotes')
    try {
        loading()
        const response = await fetch(apiUrl)
        apiQuotes= await response.json()
    //    console.log(data[12]);
    newQuote()
    complete()
        
    } catch (error) {
        console.log(error);
    }
}
getQuotes()

// Tweet Quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// Event listeners

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)
