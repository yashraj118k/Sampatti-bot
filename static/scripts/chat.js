// Collapsible
var coll = document.getElementsByClassName("collapsible");

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
function firstBotMessage() {
    let firstMessage = "Welcome to SampattiBot. How may I help you?"
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();

// Retrieves the response
function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

//Gets the text text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();

    if (userText == "") {
        userText = "Guide me for financial services";
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    // //Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
}

function buttonSendText2(sampleText) {
    let botHtml = '<p class="botText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(botHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
}

function sendButton() {
    getResponse();
}

function heartButton() {
    buttonSendText2("Thank you for liking my services")
}
// function voicesearch(){
//     buttonSendText2("Thank you for liking my services")
// }
function voiceSearch(){
    buttonSendText2("Listening...")
}
function schemeresponse(clicked_id){
    buttonSendText("Tell me about "+clicked_id+" .")
    setTimeout(() => {buttonSendText2("Getting details of "+clicked_id+" scheme.")}, 1500);
    // buttonSendText2("Getting details of "+clicked_id+" scheme.")
    if(clicked_id=="Atal Yojna"){
        setTimeout(() => {buttonSendText2("Atal Pension Yojana, formerly known as Swavalamban Yojana is a government-backed pension scheme in India, primarily targeted at the unorganised sector. It was mentioned in the year 2015 Budget speech by the Finance Minister Arun Jaitley. It was launched by Prime Minister Narendra Modi on 9 May 2015 in Kolkata.")}, 3500);
    }
    if(clicked_id=="UJALA"){
        setTimeout(() => {buttonSendText2("UJALA scheme was launched by PM Narendra Modi on 1st May 2015 under the government of India. The Ujala Scheme was established by replacing the Bachat Lamp Yojana is a joint initiative of Public Sector Undertaking of the Government of India, Energy Efficiency Services Limited (EESL) under the Union Ministry of Power and the Electricity Distribution Company.")}, 3500);
    }
    if(clicked_id=="PMKVY"){
        setTimeout(() => {buttonSendText2("Pradhan Mantri Kaushal Vikas Yojana (PMKVY) is the flagship scheme of the Ministry of Skill Development & Entrepreneurship (MSDE) implemented by National Skill Development Corporation. The objective of this Skill Certification Scheme is to enable a large number of Indian youth to take up industry-relevant skill training that will help them in securing a better livelihood. Individuals with prior learning experience or skills will also be assessed and certified under Recognition of Prior Learning (RPL).")}, 3500);
    }
    if(clicked_id=="PMSBY"){
        setTimeout(() => {buttonSendText2("Pradhan Mantri Suraksha Bima Yojana(PMSBY)The Scheme is available to people in the age group 18 to 70 years with a bank account who give their consent to join / enable auto-debit on or before 31st May for the coverage period 1st June to 31st May on an annual renewal basis. Aadhar would be the primary KYC for the bank account. The risk coverage under the scheme isRs.2 lakh for accidental death and full disability and Rs. 1 lakh for partial disability. The premium of Rs. 20 per annum is to be deducted from the account holder’s bank account through ‘auto-debit’ facility in one installment.")}, 3500);
    }
    if(clicked_id=="PMJJVY"){
        setTimeout(() => {buttonSendText2("Pradhan Mantri Jeevan Jyoti Bima Yojana(PMJJBY)The PMJJBY is available to people in the age group of 18 to 50 years having a bank account who give their consent to join / enable auto-debit. Aadhar would be the primary KYC for the bank account. The life cover of Rs. 2 lakhs shall be for the one year period stretching from 1st June to 31st May and will be renewable. Risk coverage under this scheme is for Rs. 2 Lakh in case of death of the insured, due to any reason. The premium is Rs. 436 per annum which is to be auto-debited in one installment f rom the subscriber’s bank account as per the option given by him on or before 31st May of each annual coverage period under the scheme. ")}, 3500);
    }
}


// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});