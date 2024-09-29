const URL = `${import.meta.env.VITE_BACKEND_WEBSITE_API}/billboards`
const getBillboards = async() => {
    const res = await fetch(URL)

    return res.json()

    
}
export default getBillboards