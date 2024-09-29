

const URL = `${import.meta.env.VITE_BACKEND_WEBSITE_API}/sizes`

const getSizes = async() => {
    const res = await fetch(URL)
    return res.json()
}

export default getSizes
