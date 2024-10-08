import qs from 'query-string'

const URL = `${import.meta.env.VITE_BACKEND_WEBSITE_API}/products`

const getProducts = async({categoryId, sizeId, colorId, isFeatured, search}) => {
    const url = qs.stringifyUrl({
        url: URL,
        query:{
            categoryId,
            sizeId,
            search,
            isFeatured,
            colorId

        }
    })
    const res = await fetch(url)
    return res.json()
}

export default getProducts
