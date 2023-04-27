var queryForm = function(settings) {
    var reset = settings && settings.reset ? settings.reset : false;
    var self = window.location.toString();
    var querystring = self.split("?");
    if (querystring.length > 1) {
        var pairs = querystring[1].split("&");
        for (i in pairs) {
            var keyval = pairs[i].split("=");
            if (reset || sessionStorage.getItem(keyval[0]) === null) {
                sessionStorage.setItem(keyval[0], decodeURIComponent(keyval[1]));
            }
        }
    }
    var hiddenFields = document.querySelectorAll("input[type=hidden]");
    for (var i = 0; i < hiddenFields.length; i++) {
        var param = sessionStorage.getItem(hiddenFields[i].name);
        if (param) document.getElementsByName(hiddenFields[i].name)[0].value = param;
        if (param) document.getElementsByName(hiddenFields[i].name)[1].value = param;
    }
}

setTimeout(function() { queryForm(); }, 1000);


const form = document.getElementById('mainform');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("https://webhooks.integrately.com/a/webhooks/fa7f2a59d9324f38adcf9519145cdc6a", {
        method: "post",
        body: formData
    }).then(function(response) {
        return response.text();
    }).then(function(text) {
        console.log(text);
    }).catch(function(error) {
        console.error(error);
    })

    form.reset();

    setTimeout(function() { window.location = 'thankyou.html' }, 1000);
});