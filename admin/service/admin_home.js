import Product from "../models/Product.js";
import Validation from "../utils/validation.js";
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

    let isValid = true;

    // const element = document.querySelectorAll(
    //     '#formProduct input, #formProduct select'
    // )

    // element.forEach((ele) => {
    //     // console.log('ele: ',ele[name.d].value)

    //     const { name, value } = ele;

    //     let vali= Validation.kiemTraChuoi({value},1,undefined,'#invalidId','block','Nhap vao gia tri')
    //     console.log(vali);

    //     // // console.log(ele);
    //     // // console.log(ele.value)       

    //     product[name] = value;    

    // })

    //lấy thông tin từ user nhập

    const id = $('#id').value;
    const name = $('#name').value;
    const img = $('#img').value;
    const price = $('#price').value;
    const descr = $('#descr').value;
    const type = $('#type').value;

    const product = new Product(id, name, img, price, descr, type);

    isValid = Validation.kiemTraChuoi(product.descr, 1, undefined, '#invalidDesc', '#invalidDesc', 'nhap gia tri di');

    // console.log(isValid);
    // const { id, name, img, price, descr, type } = product;

    if (isValid) {
        $('#goCustomer').click();
        return Product
    } else {
        return undefined;
    }
}

// them san pham
$('#btnAdd').onclick = () => {
    const product = getInfoProduct(false);

    if (product) {
        const promise = axios({
            url: DOMAIN,
            method: 'POST',
            data: { ...product, }
        });
        promise
            .then((result) => {
                getProductList();

            })
            .catch((err) => {
                console.log(err);
            });
    }
    // else {
    //     alert('Mô tả sản phẩm không hợp lệ!');
    // }

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

    //disable field id input
    document.getElementById('id').disabled = true ;

    document.getElementById('btnEdit').setAttribute('data-id', id)

    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'GET'
    })

    promise
        .then((result) => {

            const element = document.querySelectorAll(
                '#formProduct input, #formProduct select'
            )

            element.forEach((ele) => {
                const { name } = ele

                ele.value = result.data[name]

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
            // xoa setAttribute neu co
            document.getElementById('btnEdit').toggleAttribute('data-id', false)
        })
        .catch((err) => {
            console.log(err)
        })
}