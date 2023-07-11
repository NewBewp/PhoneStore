import Product from "../models/Product.js";
import { DOMAIN } from "../constants/api.js";

const $ = (selector) => document.querySelector(selector);

const getProductList = () => {
    const promise = axios({
        url: DOMAIN,
        method: 'GET'
    })

    promise
        .then((result) => {
            renderProductList(result.data)
        }).catch((err) => {
            console.log(err);
        });
}
getProductList();

const renderProductList = (arrProduct) => {
    let htmlContent = '';
    arrProduct.forEach((item) => {
        htmlContent += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                    <img src="${item.img}" style="width: 100px; height: 100px; object-fit: cover; object-position: center;">
                </td>
                <td> 
                    <button class="danger delete">Delete</button>
                    <button class="success edit">Edit</button>
                </td>
            </tr>
        `
    })
    $('#tbodyProduct').innerHTML = htmlContent;
} 