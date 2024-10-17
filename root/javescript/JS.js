window.onload = () => {

    var buttonList = document.getElementsByClassName("button");
    for (var i = 0; i < buttonList.length; i++) {
        buttonList[i].addEventListener("click", () => {
            window.location.href = "../root/pay.HTML";
        });
    }


    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();
        const today = new Date();
        const cvvNum = document.getElementById("cvv").value;
        const cardNum = document.getElementById("cardNum").value;
        const year = document.getElementById("year").value;
        const month = document.getElementById("month").value;
        var currentMonth = today.getMonth() + 1;
        var currentYear = today.getFullYear();


        if (currentMonth < 10) {
            currentMonth = '0' + currentMonth; // if the month is less than 10 it adds a zero to the number to keep i in the correct format 
        }
        // alert(currentMonth);
        //alert(cvvNum+' '+cardNum+' '+year+' '+month);
        if (!cvvNum.match("^[0-9]{3,4}$")) //checks the cvv is 3 or 4 digits long 
         {
            alert("CVV is the incorrect fromat or not entered correcly");
            location.reload();
        }

        if (!cardNum.match("^5[1-5]([0-9]{14})$"))// checks the number starts with a five folowing by a (1-5) with a total lenght og 16 digits.
        {
            alert("The card number dose not match the correct format or not entered correctly");
            location.reload();
        }

        if (month < currentMonth && year <= currentYear) {
            alert("Your card has exspierd or not entered correctly");
            location.reload();
        }

        const url = "https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard";
        const postData = {
            "master_card": parseInt(cardNum),
            "exp_month": parseInt(month),
            "exp_year": parseInt(year),
            "cvv_code": cvvNum
        };

        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
            .then((response) => {
                if (response.status === 200) {
                    // alert('this works');
                    return response.json();
                }
                else {
                    throw 'incorrect data';
                }
            })
            .then((resJson) => {
                alert(resJson['message']);
                localStorage.setItem('cardNum', cardNum.substr(-4))
                location.href = 'success.html';
            })
    })
}
