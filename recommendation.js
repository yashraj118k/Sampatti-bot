document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('userInputForm').addEventListener('submit', function(event) {
        event.preventDefault(); // prevent form submission
        var age = document.getElementById('ageInput').value;
        var gender = document.getElementById('genderInput').value;
        var income = document.getElementById('incomeInput').value;
        var xhr = new XMLHttpRequest(); // create AJAX request
        xhr.open('POST', '/recommendation'); // send user inputs to server
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() { // handle server response
            if (xhr.status === 200) {
                document.getElementById('recommendationOutput').textContent = xhr.responseText;
            } else {
                alert('Error: ' + xhr.statusText);
            }
        };
        xhr.send(JSON.stringify({ age: age, gender: gender, income: income })); // send user inputs as JSON data
    });
});
