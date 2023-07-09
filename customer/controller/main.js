import productService from "../../customer/service/productService.js";
// window.productService = productService ;
var dssp = new DSSP();

function getElement(selector) {
    return document.querySelector(selector);
}


function renderProduct() {
    let productList = document.getElementById('product_list');
    if (productList) {
        productService.getAllProducts().then((res) => {
            let arrSP = localStorage.getItem('DSSP')
            let parseData = JSON.parse(arrSP)
            let badgeCart = getElement('.badgeCart');
            badgeCart.innerHTML = parseData.length;

            let content = '';

            res.data.map((data) => {
                content += `<div class=" card_product ">
                <div class="p-2 border bg-success bg-opacity-25 rounded-2">
                    <div class="product-img">
                        <img style="max-height:210px;object-fit: contain;" class="card-img-top"
                            src="${data.img}"
                            alt="">
                    </div>
                    <div class="product-body p-3">
                        <h4 class="product-title fw-bold fs-4 text-black">${data.name}</h4>
                        <p class="fs-5 text-danger fw-bold">${data.price} VNĐ</p>
                        <div class="d-flex justify-content-evenly">
                            <button class="btn btn-primary text-white fw-bold" data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop${data.id}"><i
                                    class="fa-regular fa-eye me-2 fw-bold"></i>Xem thêm</button>
                            <button onclick="handAddProductCart('${data.id}')"
                                class="btn_addToCart btn btn-outline-warning d-block  border border-3 border-warning py-2">
                                <span class="text-black fw-bold"><i
                                        class="fa-solid fa-cart-shopping"></i> Add</span>
                            </button>
                        </div>
                        <!-- Modal -->
                        <div class="modal fade" id="staticBackdrop${data.id}" data-bs-backdrop="static"
                            data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdrop${data.id}Label"
                            aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-4" id="staticBackdrop${data.id}Label">Chi tiết
                                            sản phẩm</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class='container mt-5'>
                                            <div class='productGroup row'>
                                                <div class='productImage col-sm-12 col-md-5 col-lg-6'>
                                                    <img src="${data.img}"
                                                        alt='' class='img-fluid productImg' />
                                                    <div class='mt-4 productDescr'>
                                                        <hr />

                                                       

                                                    </div>
                                                </div>

                                                <div class='productInfo col-sm-12 col-md-5 col-lg-6'>
                                                    <h2>${data.name}</h2>
                                                    <div class=''>
                                                        <p class='text-danger fw-bold text-danger fs-2'>
                                                        ${data.price}</p>
                                                        <div class='star text-warning my-3'>
                                                            <i class='fas fa-star'></i>
                                                            <i class='fas fa-star'></i>
                                                            <i class='fas fa-star'></i>
                                                            <i class='fas fa-star'></i>
                                                            <i class='fas fa-star'></i>
                                                        </div>
                                                    </div>
                                                    <div class=''>
                                                        <p>- Mã sản phẩm ${data.id}</p>
                                                        <p>${data.descr}</p>
                                                    </div>

                                                    <hr>
                                                    </hr>

                                                    <h5 class='mt-4'>Số Lượng</h5>
                                                    <input  type='number' class='p-3 quantitySP${data.id}' min="1" value="1" />

                                                    <div class='mt-4'>
                                                        <div id="btnThemSPCart"  class="btn btn-danger fw-bold py-3"  onclick="handAddProductCart('${data.id}')" >
                                                            Thêm vào giỏ hàng
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary btnCloseModal${data.id}"
                                            data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> `
            })
            productList.innerHTML = content;
        })
            .catch(() => {
                alert('Hiển thị sản phẩm thất bại')
            })
    }

}
renderProduct()


getLocalStorage()

function setLocalStorage() {
    var data = JSON.stringify(dssp.arrSP)
    console.log("data: ", data);

    localStorage.setItem("DSSP", data)
}
function getInfoCart(sp, vlQuantity) {//sp data lấy từ promise api

    // tạo đối tượng sinh viên từ thông tin lấy từ user

    var product = new Product(
        sp.id,
        sp.img,
        sp.name,
        vlQuantity,
        sp.price
    )
    return product;

}
// get danh sách sinh viên từ localStorage
function getLocalStorage() {
    //B1: lấy data từ local
    var data = localStorage.getItem('DSSP') // null
    // console.log(data);
    if (data) {

        //B2: parse data về kiểu dữ liệu ban đầu
        var parseData = JSON.parse(data)

        // Tạo lại đối tượng sinhVien từ lớp đối SinhVien để lấy lại phương thức tinhDTB
        //B1: tạo mảng rỗng để lưu dssv
        var arr = []

        // B2: duyệt mảng đc lấy từ local
        for (var i = 0; i < parseData.length; i++) {
            var sp = parseData[i]
            // tạo lại đối tượng sv từ lớp đối tượng SV
            var product = new Product(
                sp.id,
                sp.hinhAnh,
                sp.name,
                sp.quantity,
                sp.price
            )
            // thêm sinhVien vào mảng arr
            arr.push(product)
        }
        // gán giá trị cho mảng arrSV từ data lấy từ localStorage
        dssp.arrSP = arr; //arrSV mảng ở DSNV


    }
}



window.handAddProductCart = handAddProductCart
function handAddProductCart(id) {
    productService.getOneProduct(id).then((res) => {
        getElement(` .btnCloseModal${id} `).click()

        var quantityID = getElement(`.quantitySP${id}`)
        var quantity = quantityID.value * 1

       
            var product = getInfoCart(res.data, quantity)
            console.log("product: ", product);
        
        
        dssp.addProduct(product);// add thêm sp vào giỏ

        
       

        

        renderProduct();
        // cập nhật data local
        setLocalStorage()
    })


}







// cart 
function renderListProduct(arrSP = localStorage.getItem('DSSP')) {
    // console.log("arrSP: ", arrSP);
    let tbody = getElement('#tableDanhSach')
    if (tbody) {


        let parseData = JSON.parse(arrSP)
        let content = '';
        let badgeCart = getElement('.badgeCart');
        
        badgeCart.innerHTML = parseData.length;

        for (var i = 0; i < parseData.length; i++) {
            var prod = parseData[i];

            content += `<tr>
                        <td>
                            <div onclick="deleteNV('${prod.id}')">
                                <i class='fa-solid fa-trash text-danger'></i>
                            </div>
                        </td>
                        <td>
                            <img src="${prod.hinhAnh}" class='img-fluid rounded' style=" width: 70px ;" alt='' />
                        </td>
                        <td>${prod.name}</td>
                        <td>${prod.price}</td>
                        <td>
                            <input  class="quanlityCart " data-idQuanlityCart="${prod.id}" type='number' value='${prod.quantity}' min='1' style=" width: 4rem ;" />
                        </td>
                        <td>${prod.price * prod.quantity}</td>
                    </tr> `
        }
            

        tbody.innerHTML = content;

        

    }
}
renderListProduct()


window.deleteNV = deleteNV
function deleteNV(xoaSP) {
    dssp.deleteProduct(xoaSP);
    setLocalStorage();
    renderListProduct();
    
}



// localStorage.clear();

