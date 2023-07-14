
class Valid {
/**
 * 
 * @param {*} value giá trị chuỗi cần kiểm tra
 * @param {*} minLength độ dài tối thiểu của chuỗi
 * @param {*} maxLength độ dài tối đa của chuỗi (nếu maxLegth = undefined và minLeght = 1 => kiểm tra rỗng)
 * @param {*} selector selector của thẻ cần hiển thị lỗi
 * @param {*} style selector thay đổi style
 * @param {*} messErr lỗi cần hiển thị lên UI nếu value không thỏa mãn điều kiện
 */
       getElement (selector){
        return document.querySelector(selector)};

     kiemTraChuoi (value, minLength, maxLength, selector, style, messErr){
        style = this.getElement(selector).style.display = "block";

        if (value.trim().length < Number(minLength) || value.trim().length > Number(maxLength)) {
            getElement(selector).innerHTML = messErr;
            return false;
        } else {
            getElement(selector).innerHTML = '';
            return true;
        }
    }

    /**
     * 
     * @param {*} value giá trị chuỗi kiểm tra
     * @param {*} min giá trị nhỏ nhất
     * @param {*} max giá trị lớn nhất
     * @param {*} selector selector của thẻ cần hiển thị lỗi
     * @param {*} style selector thay đổi style
     * @param {*} messErr lỗi cần hiển thị lên UI nếu value không thỏa mãn điều kiện
     * @returns 
     */

    kiemTraGiaTri(value, min, max, selector, style, messErr) {
        style = getElement(selector).style.display = "block";
        // if (value < 1000000 || value > 20000000) {
        if (value < parseInt(min) || value > parseInt(max)) {
            getElement(selector).innerHTML = messErr;
            return false;
        } else {
            getElement(selector).innerHTML = '';
            return true;
        }

    }

    /**
     * 
     * @param {*} value giá trị chuỗi cần kiểm tra
     * @param {*} selector thẻ hiển thị lỗi 
     * @param {*} style selector thay đổi style
     * @param {*} pattern chuỗi pattern để kiểm tra lỗi 
     * @param {*} messErr Hiển thị lỗi
     */

    kiemTraPattern(value, selector, style, pattern, messErr) {
        style = getElement(selector).style.display = "block";
        if (!pattern.test(value)) {
            getElement(selector).innerHTML = messErr;
            return false
        } else {
            getElement(selector).innerHTML = "";
            return true
        }
    }


    kiemTraTKNV(tknv, dsnv, isEdit, selector, messErr) {
        if (isEdit) {
            return true;
        }

        var isFlag = true;

        for (var i = 0; i < dsnv.length; i++) {
            if (dsnv[i].tknv === tknv) {
                isFlag = false;
                break
            }
        }

        if (!isFlag) {
            getElement(selector).innerHTML = messErr;
            return false
        } else {
            getElement(selector).innerHTML = "";
            return true
        }

        // if(isFlag){
        //     getElement(selector).innerHTML = '';
        //     return true;
        // }

    }
}


const Validation = new Valid();
export default Validation;