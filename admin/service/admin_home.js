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
    document.getElementById('btnAdd').style.display = 'block'
    document.getElementById('btnEdit').style.display = 'none'
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
                    <button id="deleteProd" onclick="deleteProduct(${item.id})" class="danger delete">Delete</button>
                    <button id="editProd" onclick="editProduct(${item.id})" class="success edit">Edit</button>
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

    element.forEach((ele) => {
        const { name, value } = ele;
        product[name] = value;

    })

    const { id, name, img, price, descr, type } = product;
    return new Product(id, name, img, price, descr, type);
}
// them san pham
$('#btnAdd').onclick = () => {
    const product = getInfoProduct();

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

//update san pham
//dua thong tin san pham len form


window.editProduct = (id) => {


    document.getElementById('tableProd').style.display = 'none';
    document.getElementById('inputForm').style.display = 'block';
    document.getElementById('btnEdit').style.display = 'block'
    document.getElementById('btnAdd').style.display = 'none'

    document.getElementById('btnEdit').setAttribute('data-id', id)

    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'GET'
    })

    promise
        .then((result) => {
            // console.log('data:',result.data);
            const element = document.querySelectorAll(
                '#formProduct input, #formProduct select'
            )
            element.forEach((ele) => {
                const { name, value } = ele
                // console.log('value: ', value);
                // console.log('name: ',name.value);
                // console.log('value: ',ele.value)
                ele.value = result.data[name]
                // console.log(ele.value)
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

$('#btnEdit').onclick = () => {

    //lay thong tin tu input
    const product = getInfoProduct()

    const id = document.getElementById('btnEdit').getAttribute('data-id')


    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'PUT',
        data: product
    })

    promise
        .then(() => {
            getProductList()
            $('#goCustomer').click();
            // xoa setAttribute neu co
            document.getElementById('btnEdit').toggleAttribute('data-id', false)
        })
        .catch((err) => {
            console.log(err)
        })

}