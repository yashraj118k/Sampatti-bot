// Collapsible
var coll = document.getElementsByClassName("collapsible");
this.messages=[];
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

// Gets the first message
// function firstBotMessage() {
//     let firstMessage = "Welcome to SampattiBot, "+name+". These were the schemes recommended to you: "
//     document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

//     let time = getTime();

//     $("#chat-timestamp").append(time);
//     document.getElementById("userInput").scrollIntoView(false);
// }

// firstBotMessage();


//Gets the text text from the input box and processes it
function getResponse() {
    var textField = document.querySelector('input');
        let text1 = textField.value;
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(r => r.json())
       
          .then(r => {
            let msg2 = { name: "SamBot", message: r.answer };
            this.messages.push(msg2);
            userQuery(text1);
            setTimeout(() => {botResponse(r.answer)}, 1500);

            })
        .catch((error) => {
            console.error('Error:', error);
            userQuery("error")
          });
    
    
}


// // Handles sending text via button clicks
function userQuery(query) {
    let userHtml = '<p class="userText"><span>' + query + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}


function botResponse(reply) {
    let botHtml = '<p class="botText"><span>' + reply + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(botHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

function sendButton() {
    getResponse();
}

function heartButton() {
    botResponse("Thank you for liking my services");
}

function voiceSearch(){
    var button = document.getElementById("voice-search");
    button.style.color = "blue";
    botResponse("Listening...");
    const recognition=new webkitSpeechRecognition();
    recognition.continuous=false;
    recognition.lang="hi";
    recognition.interimResults=false;
    recognition.maxAlternatives=1;
    const synth=window.speechSynthesis;
    recognition.start();
    recognition.onresult=(e)=>{
        let transcript=e.results[e.results.length-1][0].transcript.trim();
        let apiUrl = `https://api.mymemory.translated.net/get?q=${transcript}&langpair=hi-IN|en-GB`;
        fetch(apiUrl).then(res => res.json())
        .then(data => {
            userQuery(transcript);
            transcript= data.responseData.translatedText;
            recognition.stop();
            let text1 = transcript;
            if (text1 === "") {
                return botResponse("error");
            }
            let msg1 = { name: "User", message: text1 }
            this.messages.push(msg1);
            
            fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: JSON.stringify({ message: text1 }),
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(r => r.json())
           
              .then(r => {
                let msg2 = { name: "SamBot", message: r.answer };
                this.messages.push(msg2);
                this.output=r.answer;
                let apiUrl2 = `https://api.mymemory.translated.net/get?q=${output}&langpair=en-GB|hi-IN`;
                fetch(apiUrl2).then(res => res.json()).then(data => {
                    
                    output=data.responseData.translatedText;
                    let utter=new SpeechSynthesisUtterance();
                    console.log(utter);
                    utter.onend=()=>{
                    recognition.stop();
                    console.log("working");
                    };
                    utter.text=output;
                    utter.lang="hi"
                    console.log(utter.text);
                    synth.speak(utter);
                    botResponse(output);
                    button.style.color = '#333';
                
                });
                
                
    
            })
            .catch((error) => {
                console.error('Error:', error);
                utter.text="Error";
                synth.speak(utter);
              });
        
        
        
        });
        
    }
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});

