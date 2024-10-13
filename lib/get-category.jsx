const URL = `${import.meta.env.VITE_BACKEND_WEBSITE_API}/categories`

const getCategory = async(id) => {
    const res = await fetch(`${URL}/${id}`)
    return res.json()


}
export default getCategory