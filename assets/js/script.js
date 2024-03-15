"use strict";

let basket = [];

if (JSON.parse(localStorage.getItem("basket")) == null) {
    localStorage.setItem("basket", JSON.stringify(basket));
} else {

    basket = JSON.parse(localStorage.getItem("basket"));
}

getBasketCount(basket);

function getBasketCount(arr) {
    let basketCount = 0;

    if (arr.length != 0) {
        for (const item of arr) {
            basketCount += item.count;
        }
    }
    document.querySelector(".navigation .basket-count").innerText = basketCount;
}

let addBtns = document.querySelectorAll("#products .add-btn");


addBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        let productId = parseInt(this.parentNode.parentNode.getAttribute("data-id"));
        let productName = this.parentNode.firstElementChild.innerText;
        let productDesc = this.previousElementSibling.innerText;
        let productImage = this.parentNode.previousElementSibling.getAttribute("src");
        let productPrice = parseFloat(this.nextElementSibling.firstElementChild.innerText);

        let existProduct = basket.find(m => m.id == productId);

        if (existProduct != undefined) {
            existProduct.count++;
        } else {
            basket.push({
                id: productId,
                name: productName,
                description: productDesc,
                image: productImage,
                price: productPrice,
                count: 1
            })
        }

        getBasketCount(basket);

        localStorage.setItem("basket", JSON.stringify(basket));

    })
});




