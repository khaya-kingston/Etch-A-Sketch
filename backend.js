// Dimensions of the board
let dims = 2;


// Extracts the screen class
const screen = document.querySelector(".screen");

// Ink color variable for pen
let inkColor = "black";

// Will set the ink color depending on the button
function inkType(e) {
    inkColor === "black" ? inkColor = "rainbow":inkColor = "black";
    console.log(inkColor);
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

console.log(getRainbowPix());

// Will actually set the damn pixel color on screen
function draw(e) {
    inkColor === "black" ? this.style['background-color'] = 'black'
                : this.style['background-color'] = getRainbowPix();
} 

// Extracts the toggles
let colorButt = document.querySelector(".color.slider");
colorButt.addEventListener('click', inkType);
colorButt.addEventListener('keydown', function(e) {
    if (e.key === "c") {
        inkType;
    }
});



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

// Inks the covered pixels


// Actually creates and the pixels with shade functionality
for (let i = 0; i < dims; i++) {
    let row = document.createElement('div');
    row.style.cssText = 'display: flex; flex: 1; margin: 0;';

    for (let j = 1; j < dims; j++) {
        let col = document.createElement('div');
        col.style.cssText = 'margin: 0; flex: 1; transition: background-color 0.25s;';
        col.addEventListener('mouseover', draw);
        row.appendChild(col);
    }
    screen.appendChild(row);
};




console.log(screen.querySelectorAll('div'));