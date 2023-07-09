

const getAllProducts = () =>{
    return axios({
        url: 'https://64a8600edca581464b85b0a9.mockapi.io/products',
        method: 'GET'
    })
} 

const getOneProduct = (id) => {
    return axios({
        url: `https://64a8600edca581464b85b0a9.mockapi.io/products/${id}`,
        method: 'GET'
    })
}

const updateProduct = (id, product) => {
    // return api.put(`/products/${id}`, product);
}

const deleteProduct = (id) => {
    // return api.delete(`/products/${id}`);
}

const addProduct = (newProduct) => {
    // return api.post(`/products/`, newProduct);
}
export default {getAllProducts,getOneProduct, updateProduct, deleteProduct, addProduct};