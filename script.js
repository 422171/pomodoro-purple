const session_bell = new Audio('./sounds/alert_bell.wav'); 
const break_bell = new Audio('./sounds/uplifting_bell.wav');
const startBtn = document.querySelector('.btn-start'); 
const session = document.querySelector('.minutes'); 
const message = document.querySelector('.app-message');
let myInterval; 
let state = true;

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);

  if(state) {
    
    state = false;
    let totalSeconds = sessionAmount * 60;

    const updateSeconds = () => {
      const minuteDiv = document.querySelector('.minutes');
      const secondDiv = document.querySelector('.seconds');

      totalSeconds--;

      let minutesLeft = Math.floor(totalSeconds/60);
      let secondsLeft = totalSeconds % 60;

      if(secondsLeft < 10) {
        secondDiv.textContent = '0' + secondsLeft;
      } else {
        secondDiv.textContent = secondsLeft;
      }
      if(minutesLeft < 10) {
        minuteDiv.textContent = '0' + minutesLeft;
      }
      else {
        minuteDiv.textContent = `${minutesLeft}`;
      }
      

      if(minutesLeft === 0 && secondsLeft === 0) {
        clearInterval(myInterval);
        if(startBtn.textContent === "Take Break") {
          break_bell.play();
          message.textContent = "Let's start another session!";
          startBtn.textContent = "Start Session";
          minuteDiv.textContent = '25';
        }
        else {
          session_bell.play();
          message.textContent = "Take a break!";
          startBtn.textContent = "Take Break";
          minuteDiv.textContent = '05';
        }
        state = true;
      }
    }
    if(startBtn.textContent === "Take Break") {
      message.textContent = "Zen  Mode  ON! 🌊🌼";
    }
    else {
      message.textContent = "Let's Go Plus Ultra! 🎯";
    }
    myInterval = setInterval(updateSeconds, 1000);
  }
  else {
    alert('Session has already started.')
  }
}

startBtn.addEventListener('click', appTimer);