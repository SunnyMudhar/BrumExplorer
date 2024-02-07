var from = "EUR";
var to = "GBP";
var amount = "10";

const url = 'https://currency-converter18.p.rapidapi.com/api/v1/convert?from=' + from + '&to=' + to + '&amount=' + amount ;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '67d23fb0b5mshea67329f6a1d2c2p1c807ejsncdbdea6529d3',
		'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
	}
};

fetch(url, options)
.then(function (response) {
	return response.json();
}).then(function (data) {
	console.log(data.result.convertedAmount);
});