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

        }).catch((err) => {

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
                <td>${item.img}</td>
                <td> 
                    <button class="warning" >Delete</button>
                    <button class="success" >Edit</button>
                </td>
            </tr>
        `
    })
} 