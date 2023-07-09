// import productService from "../../customer/service/productService.js";


function getElement(selector) {
    return document.querySelector(selector);
}


function renderListProduct(arrSP = localStorage.getItem('DSSP')) {
    console.log("arrSP: ", arrSP);

   

    var parseData = JSON.parse(arrSP)
    var content = '';
    let badgeCart =getElement('.badgeCart');
        badgeCart.innerHTML = parseData.length ;

    for (var i = 0; i < parseData.length; i++) {
        var prod = parseData[i];

        // console.log(valueOffice,'ágvjhbd');
        content += `<tr>
                        <td>
                            <div onclick="deleteNV(${prod.id})">
                                <i class='fa-solid fa-trash text-danger'></i>
                            </div>
                        </td>
                        <td>
                            <img src="${prod.hinhAnh}" class='img-fluid rounded' style=" width: 70px ;" alt='' />
                        </td>
                        <td>${prod.name}</td>
                        <td>${prod.price}</td>
                        <td>
                            <input type='number' value='${prod.quantity}' min='1' style=" width: 4rem ;" />
                        </td>
                        <td>${prod.price * prod.quantity}</td>
                    </tr> `
    }
    var tbody = getElement('#tableDanhSach')
    tbody.innerHTML = content;
}
renderListProduct()


window.deleteNV = deleteNV
function deleteNV(xoaSP) {
    var dssp = new DSSP() ;
    dssp.deleteProduct(xoaSP) ;
    renderListProduct();
    setLocalStorage();
}


// localStorage.clear();