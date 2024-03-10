"use strict";

let basket = [];

if (JSON.parse(localStorage.getItem("basket")) == null) {
    localStorage.setItem("basket", JSON.stringify(basket));

} else {

    basket = JSON.parse(localStorage.getItem("basket"));
}

function checkCartForShowDatas(basket) {
    let cartAlert = document.querySelector(".cart-alert");
    let cartTable = document.querySelector(".cart-table");
    if (basket.length == 0) {
        cartAlert.classList.remove("d-none");
        cartTable.classList.add("d-none");

    } else {
        cartAlert.classList.add("d-none");
        cartTable.classList.remove("d-none");
    }
}

checkCartForShowDatas(basket);

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


function getBasketDatas() {
    let tableBody = document.querySelector("tbody");

    let datas = "";
    basket.forEach(product => {

        datas += `<tr>
        <td> <img src="${product.image}" style="width: 100px; height: 100px;" alt=""></td>
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td><i class="fa-solid fa-plus icon-plus"></i><input style = "width:20px" value="${product.count}" type ="text"><i class="fa-solid fa-minus icon-minus"></i></td>
        <td>${product.price} ₼</td>
        <td>${product.price * product.count} ₼</td>
        <td><i class="fa-solid fa-circle-xmark delete-icon" product-id=${product.id}></i></td>
        </tr>`
    });


    tableBody.innerHTML = datas;
}

getBasketDatas();

function getGrandTotal(datas) {
    let grandTotal = 0;
    datas.forEach(data => {
        grandTotal += (data.price * data.count)
    });

    document.querySelector(".total span").innerText = grandTotal;
}

getGrandTotal(basket);


let deleteIcons = document.querySelectorAll(".delete-icon");



deleteIcons.forEach(deleteIcon => {
    deleteIcon.addEventListener("click", function () {
        basket = basket.filter(product => product.id != this.getAttribute("product-id"));
        this.parentNode.parentNode.remove();
        localStorage.setItem("basket", JSON.stringify(basket));

        getGrandTotal(basket);
        checkCartForShowDatas(basket);
        getBasketCount(basket);
    })
})


let plusIcons = document.querySelectorAll(".icon-plus");
let minusIcons = document.querySelectorAll(".icon-minus");


plusIcons.forEach(plusIcon => {
    plusIcon.addEventListener("click", function () {

        productCount=this.nextElementSibling.value;
        
        basket = basket.filter(product => product.id == this.getAttribute("product-id"));
        
        localStorage.setItem("basket", JSON.stringify(basket));

        getGrandTotal(basket);
        checkCartForShowDatas(basket);
        getBasketCount(basket);
    })
})
