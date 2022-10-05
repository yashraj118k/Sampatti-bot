function getBotResponse(input) {

    if (input >=0 && input <=200000) {
        return "Here are government schemes for your income of Rupees."+input+"\nCategory : Below poverty line";
    } else if (input >200000 && input <=800000) {
        return "Here are government schemes for your income of Rupees."+input+"\r\n"+"Category : Middle Class";
    } else if (input >800000) {
        return "Here are a few investing options for you";
    }

    // Simple responses
    if (input == "hello") {
        return "Hello there!";
    } else if (input == "goodbye") {
        return "Talk to you later!";
    } else {
        return "Please enter your annual income in lakhs";
    }
}