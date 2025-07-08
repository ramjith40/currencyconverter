document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('convert').addEventListener('click', convertCurrency);
});

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from').value;
    const toCurrency = document.getElementById('to').value;
    const resultElement = document.getElementById('result');
    const errorElement = document.getElementById('error');
    
    // Reset display
    resultElement.style.display = 'none';
    errorElement.style.display = 'none';
    
    // Validate input
    if (isNaN(amount) || amount <= 0) {
        errorElement.textContent = 'Please enter a valid positive amount';
        errorElement.style.display = 'block';
        return;
    }
    
    try {
        // Fetch exchange rate from API (using free API as example)
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (!data.rates || !data.rates[toCurrency]) {
            throw new Error('Unable to get exchange rate');
        }
        
        const exchangeRate = data.rates[toCurrency];
        const convertedAmount = (amount * exchangeRate).toFixed(2);
        
        resultElement.innerHTML = `
            ${amount} ${fromCurrency} = <strong>${convertedAmount} ${toCurrency}</strong><br>
            <small>1 ${fromCurrency} = ${exchangeRate} ${toCurrency}</small>
        `;
        resultElement.style.display = 'block';
        
    } catch (error) {
        errorElement.textContent = 'Error converting currency. Please try again later.';
        errorElement.style.display = 'block';
        console.error('Conversion error:', error);
    }
}