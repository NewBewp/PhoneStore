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
                    <img src="${item.img}" style="width: 100px; object-fit: cover; object-position: center;">
                </td>
                <td>${item.type}</td>
                <td>
                    <button id="deleteProd" onclick="deleteProduct(${item.id})" class="danger delete">
                        <span class="material-symbols-sharp">
                                delete
                        </span>
                    </button>
                    <button id="editProd" onclick="editProduct(${item.id})" class="success edit">
                        <span class="material-symbols-sharp">
                            edit
                        </span>
                    </button>
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
    const img = document.getElementById('img').value;
    const price = $('#price').value;
    const descr = $('#descr').value;
    const type = $('#type').value;

    const product = new Product(id, name, img, price, descr, type);
    //valid ten san pham
    isValid &= Validation.kiemTraChuoi(product.name, 1, undefined, '#invalidName', '#invalidName', 'Nhập tên sản phẩm');
    //valid link hinh anh
    isValid &= Validation.kiemTraChuoi(product.img, 1, undefined, '#invalidImg', '#invalidImg', 'Nhập link hình ảnh');

    console.log('img', Validation.kiemTraChuoi(product.img, 1, undefined, '#invalidImg', '#invalidImg', 'Nhập link hình ảnh'));

    //vaild gia san pham
    isValid &=
        Validation.kiemTraChuoi(product.price, 1, undefined, '#invalidPrice', '#invalidPrice', 'Nhập giá sản phẩm') &&
        Validation.kiemTraPattern(product.price, '#invalidPrice', '#invalidPrice', /^[0-9]*$/, 'Giá không hợp lệ');

    //valid loai san pham
    isValid &= Validation.kiemTraChuoi(product.type, 1, undefined, '#invalidType', '#invalidType', 'Chọn loại sản phẩm');

    console.log(isValid);
    // const { id, name, img, price, descr, type } = product;

    if (isValid) {
        return product
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
                alert('Đã thêm sản phẩm thành công')

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
    // document.getElementById('idDisplay').style.display = 'block'

    //disable field id input
    // document.getElementById('id').disabled = true;

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
    const product = getInfoProduct(false)

    const id = document.getElementById('btnEdit').getAttribute('data-id')

    console.log('id:', id);

    if (product) {
        const promise = axios({
            url: `${DOMAIN}/${id}`,
            method: 'PUT',
            data: product
        })

        promise
            .then(() => {
                getProductList()
                // xoa setAttribute neu co
                // document.getElementById('btnEdit').toggleAttribute('data-id', false)
                alert('Cập nhật thành công')
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

//tim theo ten san pham
$('#searchName').onchange = (value) => {
    let searchValue = $('#searchName').value;

    console.log(searchValue);

    const promise = axios({
        url: `${DOMAIN}/?name=${searchValue}`,
        method: 'GET',
    })

    promise
        .then((result) => {
            console.log(result.data);
            renderProduct(result.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

//tìm theo loại sản phẩm
//tim theo sort 
$('#typePhone').onchange = (value) => {
    let typeValue = $('#typePhone').value;
    let arrProduct = [];
    if (typeValue == 'iphone' || typeValue == 'samsung') {
        const promise = axios({
            url: `${DOMAIN}/?type=${typeValue}`,
            method: 'GET',
        })
        promise
            .then((result) => {
                console.log(result.data);
                renderProduct(result.data)
            })
            .catch((err) => {
                console.log(err)
            })
    } else if (typeValue == 'ab' || typeValue == 'ba') {
        const promise = axios({
            url: DOMAIN,
            method: 'GET',
        })
        promise
            .then((result) => {
                arrProduct = result.data;
                if (typeValue == 'ab') {
                    arrProduct.sort((a, b) => (a.price > b.price) ? (a.price - b.price) :-1)
                    console.log("thấp đến cao: ", arrProduct)
                    renderProduct(arrProduct)
                }
                // else if(typeValue == 'ba'){
                //     arrProduct.sort((a, b) => (a.price > b.price) ? (b.price - a.price) : -1)
                //     console.log("cao đến thấp: ", arrProduct)
                //     renderProduct(arrProduct)
                // }

            })
            .catch((err) => {
                console.log(err)
            })
    }else{
        const promise = axios({
            url: DOMAIN,
            method: 'GET',
        })
        promise
            .then((result) => {
                console.log(result.data);
                renderProduct(result.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

}



// $('#pricePhone').onchange = (value) => {
//     let priceValue = $('#pricePhone').value;
//     let arrProduct = [];

//     console.log('pricePhone: ', priceValue);

//     const promise = axios({
//         url: DOMAIN,
//         method: 'GET',
//     })
//     promise
//         .then((result) => {
//             // console.log(result.data);
//             arrProduct = result.data;
//             // console.log(arrProduct);
//             if (priceValue == 'ab') {
//                 arrProduct.sort((a, b) => (a.price > b.price) ? 1 : -1)
//                 console.log("thấp đến cao: ", arrProduct)
//                 renderProduct(arrProduct)
//             }
//             else if (priceValue == 'ba') {
//                 arrProduct.sort((a, b) => (a.price < b.price) ? 1 : -1)
//                 console.log("cao đến thấp: ", arrProduct)
//                 renderProduct(arrProduct)
//             }

//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }