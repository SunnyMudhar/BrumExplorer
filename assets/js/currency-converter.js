document.getElementById('convert').addEventListener('click', function () {
	var from = document.getElementById('fromCurrency').value;
	var to = document.getElementById('toCurrency').value;
	var amount = document.getElementById('amount').value;
	

	const url = 'https://currency-converter18.p.rapidapi.com/api/v1/convert?from=' + from + '&to=' + to + '&amount=' + amount ;
	const options = {
			method: 'GET',
			headers: {
					'X-RapidAPI-Key': 'fed5220734mshf274d8836b368c9p12bc39jsn336134dee358',
					'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
			}
	};

	fetch(url, options)
			.then(response => response.json())
			.then(data => { 
					document.getElementById('result').innerText = `${amount} ${from} = ${Math.round(data.result.convertedAmount * 100) / 100} ${to}`;
			})
			.catch(error => console.error('Error:', error));
});