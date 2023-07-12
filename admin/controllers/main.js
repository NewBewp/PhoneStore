import Product from "../models/Product.js";
import { DOMAIN } from "../constants/api.js";

const $ = (selector) => document.querySelector(selector)

const getProductList = () => {
    const promise = axios({
        url: DOMAIN,
        method: 'GET'
    })
    promise
        .then((result) => {
            result.data;
            console.log("data: ", result.data);
            renderProductList(result.data);
        })
        .catch((err) => {
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
    $('#tbodyProduct').innerHTML = htmlContent;
}

const getInfoProduct = () => {
    let product = {}
    const element = document.querySelectorAll(
        '#formProduct input, #formProduct select'
    )
    console.log('element: ', element);
    element.forEach((element) => {
        const { name, value } = element;
        product[name] = value;
    })

    const { nameProd, imgProd, priceProd, descrProd, typeProd, idProd } = product;
    return new Product(nameProd, imgProd, priceProd, descrProd, typeProd, idProd);
}

$('#btnAdd').onclick = () => {
    const product = getInfoProduct();
    console.log(product);

    const promise = axios({
        url: DOMAIN,
        method: 'POST',
        data: {...product,}
    })
}




// them product

// getElement('#btnAdd').onclick = () => {
//     const product = getInfoProduct()
//     console.log('product: ', product);

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
// }