import Product from "../models/Product.js";
import { DOMAIN } from "../constants/api.js";

function openAside() {
    document.getElementById("aside_right").style.display = "block";
}
document.getElementById("menu-btn").onclick = openAside
//
function closeAside() {
    document.getElementById("aside_right").style.display = "none";
}
document.getElementById("close-btn").onclick = closeAside
// mo form input 

const openForm = () => {
    document.getElementById('tableProd').style.display = 'none';
    document.getElementById('inputForm').style.display = 'block';
    document.getElementById('goCustomer').className = 'none';
    document.getElementById('open').className = 'active';

}
document.getElementById('open').onclick = openForm

const hideForm = () => {
    document.getElementById('tableProd').style.display = 'block';
    document.getElementById('inputForm').style.display = 'none';
    document.getElementById('goCustomer').className = 'active';
    document.getElementById('open').className = 'none';

}
document.getElementById('goCustomer').onclick = hideForm

const $ = (selector) => document.querySelector(selector)

const getProductList = () => {
    const promise = axios({
        url: DOMAIN,
        method: 'GET'
    })
    promise
        .then((result) => {
            console.log('result: ', result);
            renderProduct(result.data);
        })
        .catch((err) => {
            console.log(err);
        });
}
getProductList();

const renderProduct = (arrProduct) => {
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
                <button id="deleteProd" onclick="deleteProduct(${item.id})" class="danger delete">Delete</button>                    <button class="success edit">Edit</button>
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
// them san pham
$('#btnAdd').onclick = () => {
    const product = getInfoProduct();
    console.log(product);

    const promise = axios({
        url: DOMAIN,
        method: 'POST',
        data: { ...product, }
    });
    promise
        .then((result) => {
            getProductList();
            $('#goCustomer').click();
        })
        .catch((err) => {
            console.log(err);
        });
}

//xoa san pham
window.deleteProduct = (id) => {
    console.log({ id });

    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'DELETE'
    })

    promise
        .then(() => {
            getProductList();
        })
        .catch((err) => {
            console.log(err);
        })
}

