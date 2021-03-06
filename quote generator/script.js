const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = []

function loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}

function complete(){
    quoteContainer.hidden = false
    loader.hidden = true
}

function newQuote(){
    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    authorText.textContent = quote.author || 'Uknown author'
    quote.text.length > 50 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote')
    quoteText.textContent = quote.text 
    complete()
}

async function getQuotes(){
    loading()
    const apiUrl = 'https://type.fit/api/quotes' 
    try {
       const response = await fetch(apiUrl)
       const data = await response.json()
       apiQuotes = data
       newQuote()
    }catch (error){
        console.log(error);
    }
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/`
    window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

tweetQuote()

getQuotes()

