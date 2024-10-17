window.onload = () => {
    let cardNum = localStorage.getItem('cardNum');// gets the data that was saved in local storage
    document.getElementById("cardNum").innerHTML += cardNum;  //displayes the data at the end of the strin.
}