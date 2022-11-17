// Stopwatch main card variables  .................................................
// formated main time displayed by the stopwatch
let stopwatch_text = document.getElementById("stopwatch-text");

// formated lap time displayed when the the "Lap" button is pressed
let lap_text = document.getElementById("lap-text");
let lap_header = document.getElementById("lap-header");

// lap ON / lap OFF
let lap_on = false;

// stopwatch main time in miliseconds
let time = 0;

// stopwatch lap time in miliseconds
let lap_time = 0;

// the lap card appears when the Lap Button is pressed
// it contains the laps table containing a row (record) for each lap
let laps_card = document.getElementById("laps-card");

// the number of laps, increased each time the Lap Button is pressed
let lap_id = 0;

// the time when a lap is finished
let partial_time


// used for time increasing with the function setInterval()
let intervalID;
let lap_intervalID;


// Save card variables & "Enter" Keypress event added to input field ...............
// input field inside the Save card 
let saved_name = document.getElementById("saved-name");

// number of saved card
let saved_card_counter = 0;


// input field - add event listener when press "Enter" key 
saved_name.addEventListener("keypress", (_event) => {
    if (_event.key === "Enter") {
        saveTime();
    }
})



// Auxiliary functions for time formating: .........................................
// zeroPad()  formatTime() .........................................................

// add leading 0 to positive numbers < 10
function zeroPad(n) {
    if (n < 10) {
        return `0${n}`
    }
    else {
        return n
    }
}


// display time (in miliseconds) in format hours:minutes:seconds.miliseconds
function formatTime(t) {

    // variable used for time formating
    let miliseconds = zeroPad(Math.floor(t % 1000) / 10);
    let seconds = zeroPad(Math.floor((t / 1000) % 60));
    let minutes = zeroPad(Math.floor((t / 1000 / 60) % 60));
    let hours = zeroPad(Math.floor((t / 1000 / 60 / 60) % 60));

    let formated_time = `${hours}:${minutes}:${seconds}.${miliseconds}`;
    
    return formated_time
}



// Stopwatch main card functions: ......................................................
// increaseTime() & startStopwatch() ................................................... 
// stopStopwatch()  resumeStopwatch()  resetStopwatch()  


function increaseTime() {
    time += 10;
    stopwatch_text.innerHTML = formatTime(time);
    
    if (lap_on = true) {
        lap_time +=10;
        lap_text.innerHTML = formatTime(lap_time);
    }
}


function startStopwatch() {
    intervalID = setInterval(increaseTime, 10);
    
    document.getElementById("start-button").style.display = "none";
    document.getElementById("stop-button").style.display = "block";

}


function stopStopwatch() {
    clearInterval(intervalID);
    if (lap_on == true) {
        clearInterval(lap_intervalID);
    }

    // display only Reset & Resume buttons  
    document.getElementById("resume-button").style.display = "block";
    document.getElementById("reset-button").style.display = "block";
    document.getElementById("stop-button").style.display = "none";
    document.getElementById("lap-button").style.display = "none";
}


function resumeStopwatch() {
   startStopwatch();

   // display only Lap & Stop buttons
    document.getElementById("stop-button").style.display = "block";
    document.getElementById("lap-button").style.display = "block";
    document.getElementById("resume-button").style.display = "none";
    document.getElementById("reset-button").style.display = "none";
}


function resetStopwatch() {
    clearInterval(intervalID);
    if (lap_on == true) {
        clearInterval(lap_intervalID);
    }

    // start all from 0
    time = 0;
    lap_time = 0;
    lap_id = 0;
    stopwatch_text.innerHTML = formatTime(time);
    document.getElementById("laps-table").innerHTML = "";

    // hide lap time and lap card
    lap_header.style.display = "none";
    lap_text.style.display = "none";
    laps_card.style.display = "none";

    // display only Lap & Start buttons    
    document.getElementById("start-button").style.display = "block";
    document.getElementById("lap-button").style.display = "block";
    document.getElementById("resume-button").style.display = "none";
    document.getElementById("reset-button").style.display = "none";
}



// Lap button and lap card function: ...................................................
// lapStopwatch()  ................................................................


function lapStopwatch() {
    
    // "turn on" lap
    if (lap_on == false) {
        lap_on = true;
    }

    // increase the number of laps
    // unique id for each record in the laps table
    ++lap_id;

    // the sum of all completed laps equals the stopwatch main time
    partial_time = time;
    
    // make visible the lap time text and the laps table
    lap_header.style.display = "block";
    lap_text.style.display = "block";
    laps_card.style.display = "block"; 

    // add a row with info (record) each time the Lap button is presed
    document.getElementById("laps-table").innerHTML += `
        <tr>
            <td>${zeroPad(lap_id)}</td>
            <td>${lap_text.innerHTML}</td>
            <td>${stopwatch_text.innerHTML}</td>
        </tr>
           
    `

    lap_time = 0;

}



// Save card functions:  ............................................................
// deleteSavedCard()  saveTime()  ...................................................


function deleteSavedCard(t) {
    document.getElementById(t).remove();
}


function saveTime() {
 
    // increase the id number of the added saved card
    ++saved_card_counter

    // add a card with the name, time and delete button for each saved time
    // each card has the id number = variable saved_card_counter
    document.getElementById("saved-cards").innerHTML += `
    <div class="card  saved-card" id="${saved_card_counter}">
            
            <div class="card-body">
                <table>
                    <tr>
                        <td>Name:</td> 
                        <td>${saved_name.value}</td>
                    </tr>
                    <tr>
                        <td>Time:</tdTt>
                        <td>${stopwatch_text.innerHTML}</td>
                    </tr>
                </table>
                
                <div id="buttons">
                    <button class="btn btn-danger" onclick="deleteSavedCard(${saved_card_counter})">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    `

    saved_name.value = "";
}


