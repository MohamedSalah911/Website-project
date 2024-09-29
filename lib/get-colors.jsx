
const URL = `${import.meta.env.VITE_BACKEND_WEBSITE_API}/colors`

const getColors = async() => {
    const res = await fetch(URL)
    return res.json()
}

export default getColors
