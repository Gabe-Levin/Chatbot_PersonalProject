$(document).ready(() => {

    //  ***************************   //
    //     ***** Functions*****       //
    //  ***************************   //

    // Prompt User for Name
    let $messagecount = $('message-board').length;

    // Post a message to the board
    function $postMessage() {
        $("#message").find("br").remove();
        let $message = $("#message").html().trim().replace(/<div>/g, "").replace(/<\/div>/g, ""); // get text from text box
        if ($message) { // if text is not empty
            const html = `<div class="post post-user">${$message + datetime('human')}</span></div>`; // convert post to html
            $("#message-board").append(html); // add post to board
        };
        $("#message").empty();
        if ($firstPost()) {
            $("#message").find("br").remove();
            const html = (`<div class="post post-bot">${'Grüß Gott ' + $message +
                '. My name is Servus Bot. It\'s a pleasure to meet you. How are you doing today?' + datetime('bot')}</span></div>`); // convert post to html
            $("#message-board").append(html);
            return username = $message
        }
        else {
            $post_response($message)
        }
        $("#message-board").scrollTop($("#message-board")[0].scrollHeight); // stay at the bottom of the chat window
    };

    //Check if the current message is the first User message, Used for saving the user\s name
    function $firstPost() {
        let $messagecount = $("#message-board").children('div').length;
        if ($messagecount == 2) return true;
        else { return false };
    };

    //Clean the incoming message before interpreting
    function $cleantext(input) {
        let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
        text = text
            .replace(/ a /g, " ")
            .replace(/whats/g, "what is")
            .replace(/please /g, "")
            .replace(/ please/g, "")
            .replace(/robot/g, "bot");
        return text
    };

    //**** datetime snippit editted from : https://stackoverflow.com/questions/20456712/how-to-get-current-time-with-jquery *****//
    function datetime(human_bot) {
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + ('0' + currentdate.getMinutes()).slice(-2);
        if (human_bot == 'human') {
            classtype = 'datetime_human';
        }
        else {
            classtype = 'datetime_bot';
        }
        const html = `<span class=${classtype}>${datetime}</span>`;
        return html;
    }

    // This response logic came from https://www.htmlgoodies.com/javascript/basic-chatbot-in-javascript/
    function $interpret_message(utteranceArr, answerArr, inmessage) {
        let outmessageArr;
        let outmessage;
        for (x = 0; x < utteranceArr.length; x++) {
            for (y = 0; y < utteranceArr[x].length; y++) {
                if (utteranceArr[x][y] === inmessage) {
                    outmessageArr = answerArr[x];
                    outmessage = outmessageArr[Math.floor(Math.random() * outmessageArr.length)];
                }
            }
        }
        return outmessage;
    }

    //Reads in the input and chooses a random response from the list in the answer array
    function $post_response(input) {
        let $answer;
        let text = $cleantext(input);
        if ($interpret_message(utterances, answers, text)) {
            $answer = $interpret_message(utterances, answers, text);
        }
        else {
            $answer = alternatives[Math.floor(Math.random() * alternatives.length)];
        }
        const html = `<div class="post post-bot">${$answer + datetime('bot')}</div>`; // convert post to html
        $("#message-board").append(html);
    };

    //  ***************************   //
    //      ***** TRIGGERS*****       //
    //  ***************************   //

    //**** These triggers were pulled and slightly modefied from https://codepen.io/tariq01/pen/yLVMQdw *****//
    $("#message").on("keyup", (event) => {
        if (event.which === 13) $postMessage(); // Use enter to send
    }).on("focus", () => {
        $("#message").addClass("focus");
    }).on("blur", () => {
        $("#message").removeClass("focus");
    });
    $("#send").on("click", $postMessage);


    //  ***************************   //
    //***** QUESETION AND ANSWER *****//
    //  ***************************   //

    //**** These Utterances were pulled from https://codepen.io/tariq01/pen/yLVMQdw, and slightly modefied by me *****//
    // input options
    const utterances = [

        ["how are you", "how is life", "how are things"],
        ["hi", "hey", "hello", "good morning", "good afternoon", "moin", "Servus"],
        ["what are you doing", "what is going on", "what is up"],
        ["how old are you"],
        ["who are you", "are you human", "are you bot", "are you human or bot"],
        ["who created you", "who made you"],
        [
            "your name please",
            "your name",
            "may i know your name",
            "what is your name",
            "what do you call yourself"
        ],
        ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
        ["bad", "bored", "tired"],
        ["help me", "tell me story", "tell me joke"],
        ["ah", "yes", "ok", "okay", "nice"],
        ["bye", "good bye", "goodbye", "see you later"],
        ["what should i eat today"],
        ["what", "why", "how", "where", "when"],
        ["no", "not sure", "maybe", "no thanks"],
        [""],
        ["haha", "ha", "lol", "hehe", "funny", "joke"]
    ];

    // Possible responses corresponding to triggers

    const answers = [
        [
            "Fine... how are you?",
            "Pretty well, how are you?",
            "Fantastic, how are you?"
        ],
        [
            "Hello!", "Hi!", "Hey!", "Hi there!", "Howdy", "Servus"
        ],
        [
            "Nothing much",
            "About to go to sleep",
            "Can you guess?",
            "I don't know actually"
        ],
        ["I am infinite"],
        ["I am just a bot", "I am a bot. What are you?"],
        ["The one true God, JavaScript"],
        ["I am nameless", "I don't have a name"],
        ["Have you ever felt bad?", "Glad to hear it"],
        ["Why?", "Why? You shouldn't!"],
        ["What about?", "Once upon a time..."],
        ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
        ["Bye", "Goodbye", "See you later"],
        ["Pasta", "Burger"],
        ["Great question"],
        ["That's ok", "What do you want to talk about?"],
        ["Please say something :("],
        ["Haha!", "Good one!"]
    ];

    // Random for any other user input

    const alternatives = [
        "Go on...",
        "Try again",
    ];
});

