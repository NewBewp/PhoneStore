

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


const getAllProductsOfType = (type) =>{
    return axios({
        url: `https://64a8600edca581464b85b0a9.mockapi.io/products/?type=${type}`,
        method: 'GET'
    })
} 
const getProductOfName = (name) =>{
    return axios({
        url: `https://64a8600edca581464b85b0a9.mockapi.io/products/?name=${name}`,
        method: 'GET'
    })
} 

export default {getAllProducts,getOneProduct,getAllProductsOfType, getProductOfName};