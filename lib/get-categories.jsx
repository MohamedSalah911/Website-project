const URL = `${import.meta.env.VITE_BACKEND_WEBSITE_API}/categories`

const getCategories = async() => {
    const res = await fetch(URL)
    return res.json()
}

export default getCategories
