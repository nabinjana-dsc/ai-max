function interpretCommand() {
    var input = document.getElementById('commandInput').value;
    var output = document.getElementById('output');

    switch(input.toLowerCase()) {
        case 'open youtube':
            var voice = 'Opening YouTube';
            output.innerHTML = 'Opening <a href="https://www.youtube.com" target="_blank">YouTube</a>...';
            window.open("https://www.youtube.com",'_blank')
            var speech = new SpeechSynthesisUtterance(voice);
            speech.lang = 'en-US';
            window.speechSynthesis.speak(speech);
            break;
        case 'open google':
            var voice = 'Opening google.com';
            output.innerHTML = 'Opening <a href="https://www.google.com" target="_blank">Google</a>...';
            window.open("https://www.google.com",'_blank')
            var speech = new SpeechSynthesisUtterance(voice);
            speech.lang = 'en-US';
            window.speechSynthesis.speak(speech);
            break;
        case 'notepad' ||'open notepad'||'notepad open kar do':

        var speech = new SpeechSynthesisUtterance('opening notepad');
            speech.lang = 'en-US';
            window.speechSynthesis.speak(speech);
            setTimeout(() => {
                
            var shell = new ActiveXObject("WScript.Shell");
            shell.Run("notepad.exe");
            }, 1000);
            break;
        default:
            var searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(input);
            // Use Web Speech API to speak the message
            var speech = new SpeechSynthesisUtterance('Searching for ' + input + ' on Google');
            speech.lang = 'en-US';
            window.speechSynthesis.speak(speech);
            
            // Open Google search in a new tab
            window.open(searchUrl, '_blank');
            output.textContent = 'Searching for "' + input + '" on Google...';
    }
}


function startVoiceRecognition() {
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        document.getElementById('commandInput').value = transcript;

        // Automatically interpret the command after speech recognition
        interpretCommand();
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error detected: ' + event.error);
    };

    recognition.start();
}
function clearInput() {
    var output = document.getElementById('output');
    output.textContent ="";
    document.getElementById('commandInput').value = '';
}
