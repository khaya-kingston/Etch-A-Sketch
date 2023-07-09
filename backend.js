const dims = 35


// Extracts the screen class
const screen = document.querySelector(".screen");

// Ink color variable for pen
let inkColor = "black";

// Will set the ink color depending on the button
function inkType(e) {
    inkColor === "black" ? inkColor = "rainbow":inkColor = "black";
}

// Converts a value from base10 to a hex string to use for colors
function baseConverter(val) {
    let outString = "";
    const hashDict = {10 :"A", 11 :"B", 12:"C", 13:"D", 14:"E", 15:"F"};
    while (val != 0) {
        currChunk = val%16;
        val = Math.floor(val / 16);
        
        if (!(currChunk in hashDict)) {
            outString = currChunk.toString() + outString;
        } else {
            outString = hashDict[currChunk].toString() + outString;
        }

    }

    if (outString.length != 6) {
        outString = (6-outString.length)*"0" + outString;
    }

    outString = "#" + outString;
    return outString;
}

// Will randomly produce some color string TODO: Figure out how to get the FFFFFF color rn it's one value off
function getRainbowPix() {
    // generate a random number in the base10 range of 0 - FFFFFF
    const pixColor = Math.floor(Math.random()*16777216);
    return baseConverter(pixColor);
}


// Will actually set the damn pixel color on screen
function draw(e) {
    inkColor === "black" ? this.style['background-color'] = 'black'
                : this.style['background-color'] = getRainbowPix();
} 

// Extracts the color toggle
let colorButt = document.querySelector(".color.slider");
colorButt.addEventListener('click', inkType);
let colSlider = document.querySelector('input');




// Reset button code
// Extract the reset button 
let shake = document.querySelector('.reset');
shake.addEventListener('click', function(e) {
    [...screen.children].forEach(row => {
        [...row.children].forEach(cell => {
            cell.style['background-color'] = 'whitesmoke';
        });
    });
});
// makes the shadow go away as if clicked
shake.addEventListener('mousedown', function(e) {
    shake.style['box-shadow'] = 'none';
});
// makes the shadow go away when unclicked
shake.addEventListener('mouseup', function(e) {
    shake.style['box-shadow'] = '0px 0px 7px rgb(26, 26, 48)';
});


// Actually creates and the pixels with shade functionality
function newPixels(value) {
    oldDims = value;

    [...screen.children].forEach(row => {
        [...row.children].forEach(cell => {
            row.removeChild(cell)
            });
        screen.removeChild(row);
        });
   

    for (let i = 0; i < value; i++) {
        let row = document.createElement('div');
        row.style.cssText = 'display: flex; flex: 1; margin: 0;';
    
        for (let j = 0; j < value; j++) {
            let col = document.createElement('div');
            col.style.cssText = 'margin: 0; flex: 1; transition: background-color 0.25s;';
            col.addEventListener('mouseover', draw);
            row.appendChild(col);
        }
        screen.appendChild(row);
    };
}



// Dimension Control Code
// Cleans up user input to either a number in a range or the prev val if a num not given
function dimCleaner(value) {
    if (!(isNaN(Number(value)))) {
        if (value < 16) {
            return 16;
        } else if (value > 100) {
            return 100;
        } else {
            return value;
        }
    } else {
        return "";
    }
}


// Checks what dims have been input and resets the screen
function screenSetter(value) {
    newDims = dimCleaner(value);

    newDims ? newPixels(newDims) : newPixels(oldDims);
}


// Extract the dim screen
const dim = document.getElementById('dim-screen');
let oldDims = 16;
dim.value = oldDims;
screenSetter(dim.value);
// Listener to run actual restructure event
dim.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        
        screenSetter(dim.value);
        dim.value = oldDims;
    }
});


// Up/Down Dim Button Functionality
const upButton = document.querySelector('.up');
upButton.addEventListener('click', function(e) {
    screenSetter(++dim.value);
    dim.value = oldDims;
});
// makes the shadow go away as if clicked or if the button is pressed
upButton.addEventListener('mousedown', function(e) {
    upButton.style['box-shadow'] = 'none';
});
// makes the shadow go away when unclicked
upButton.addEventListener('mouseup', function(e) {
    upButton.style['box-shadow'] = '0px 0px 7px rgb(26, 26, 48)';
});
// makes the shadow go away when unclicked
upButton.addEventListener('keyup', function(e) {
    if (e.key === "UpArrow") {
        upButton.style['box-shadow'] = '0px 0px 7px rgb(26, 26, 48)';
    }
});


const downButton = document.querySelector('.down');
downButton.addEventListener('click', function(e) {
    screenSetter(--dim.value);
    dim.value = oldDims;
});
// makes the shadow go away as if clicked or if the button is pressed
downButton.addEventListener('mousedown', function(e) {
    downButton.style['box-shadow'] = 'none';
});
// makes the shadow go away when unclicked
downButton.addEventListener('mouseup', function(e) {
    downButton.style['box-shadow'] = '0px 0px 7px rgb(26, 26, 48)';
});



// HotKey Functionality
const keyLog = document.querySelector('body');

// Up/Down Dim Arrows
keyLog.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp') {

        e.preventDefault();
        screenSetter(++dim.value);
        dim.value = oldDims;
        upButton.style['box-shadow'] = 'none';

    } else if (e.key === 'ArrowDown') {

        e.preventDefault();
        screenSetter(--dim.value);
        dim.value = oldDims;
        downButton.style['box-shadow'] = 'none';

    } else if (e.key === "c") {

        inkType(e);
        console.log(inkColor);
        colSlider.checked = !colSlider.checked;

    } else if (e.key === 'x') {

        [...screen.children].forEach(row => {
            [...row.children].forEach(cell => {
                cell.style['background-color'] = 'whitesmoke';
            });
        });
        shake.style['box-shadow'] = 'none';

    }


});

keyLog.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowUp') {
        upButton.style['box-shadow'] = '0px 0px 7px rgb(26, 26, 48)';
    } else if (e.key === 'ArrowDown') {
        downButton.style['box-shadow'] = '0px 0px 7px rgb(26, 26, 48)';
    } else if (e.key === 'x') {
        shake.style['box-shadow'] = '0px 0px 7px rgb(26, 26, 48)';
    }
})