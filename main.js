var text;
var shift;

/*
  Sets the page.
*/
function start() {
  text = "";
  shift = 0;
  changeInfo();
}
window.addEventListener("load", start, false);

/*
  Shift the letter by the number amount.

  @param char The letter that is being encrypted/decrypted.
*/
function shiftLetter(char) {
  //Check to make sure the character is a letter
  if ((char.codePointAt(0) > 127) || (char.codePointAt(0) < 65)) return char; 

  //Limits the ascii number to the range of the English alphabet
  let limit = 0;
  if (shift >= 26) {
    limit = shift % 26;
  }
  else if (shift < 0) {
    limit = (26 - (Math.abs(shift) % 26))%26; //Mod 26 again due to shift value -26,-52,... resulting in limit = 26.
  }
  else {
    limit = shift;
  }

  ascii = char.charCodeAt(0);
  ascii = Number(ascii) + Number(limit);
  return String.fromCharCode(ascii);
}

/*
  Change the info in the shift-info paragraph element.
*/
function changeInfo() {
  let letter = shiftLetter("A");
  document.getElementById("shift-info").innerHTML = "'<span class=\"letter-placeholder\">A</span>' shifts over by <span class=\"number-placeholder\">" + shift + "</span> to become '<span class=\"letter-placeholder\">"+ letter +"</span>'";
}

/*
  Encrypt the entire contents of the "ShiftNumber" element and place the results in the "CipherText" element
*/
function EncryptText() {
  text = document.getElementById("EnterText").value;

  let newText = "";
  for (let i = 0; i < text.length; i++)
    newText += shiftLetter(text[i]);

  document.getElementById("CipherText").innerHTML = newText;
}

/*
  Get the shift value from input and update the webpage and any encrypted text.
*/
function GetShift() {
  shift = document.getElementById("ShiftNumber").value;
  changeInfo();
  EncryptText();
}
