document.getElementById('convert').addEventListener('click', function () {
	var from = document.getElementById('fromCurrency').value;
	var to = document.getElementById('toCurrency').value;
	var amount = document.getElementById('amount').value;

	const url = 'https://currency-converter18.p.rapidapi.com/api/v1/convert?from=' + from + '&to=' + to + '&amount=' + amount;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '67d23fb0b5mshea67329f6a1d2c2p1c807ejsncdbdea6529d3',
			'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
		}
	};

	fetch(url, options)
		.then(response => response.json())
		.then(data => {
			console.log(data);
			document.getElementById('result').innerText = `${amount} ${from} = ${data.result.convertedAmount} ${to}`;
		})
		.catch(error => console.error('Error:', error));
});



