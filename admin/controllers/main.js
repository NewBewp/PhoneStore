import Product from "../models/Product.js";
import { DOMAIN } from "../constants/api.js";

const getElement = (selector) => document.querySelector(selector)

const getProductList = () => {
    const promise = axios({
        url: DOMAIN,
        method: 'GET'
    })

    promise
        .then((result) => {
            renderProductList(result.data)
        })
        .catch((err) => {
            console.log(err);
        });

}
getProductList();


const getInfoProduct = () => {
    const element = document.querySelectorAll('#formProduct input, #formProduct select')


    let product = {}
    element.forEach((ele) => {
        const { name, value } = ele;
        product[name] = value
    })
    const { name, img, price, descr, type, id } = product;
    return new Product(name, img, price, descr, type, id);
}

const renderProductList = (arrProduct) => {
    let htmlContent = '';
    arrProduct.forEach((item) => {
        htmlContent += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.descr}</td>
                <td>
                    <img src="${item.img}" style="width: 100px; height: 100px; object-fit: cover; object-position: center;">
                </td>
                <td>${item.type}</td>

                <td> 
                    <button class="danger delete">Delete</button>
                    <button class="success edit">Edit</button>
                </td>
            </tr>
        `
    })
    getElement('#tbodyProduct').innerHTML = htmlContent;
}


// them product

getElement('#btnAdd').onclick = () => {
    const product = getInfoProduct()
    console.log('product: ', product);

    // const promise = axios({

    //     url: DOMAIN,
    //     method: 'POST',
    //     data: { ...product, },
    // })

    // promise
    //     .then((result) => {
    //         getProductList()
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
}