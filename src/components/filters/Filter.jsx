import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "../ui/button"
import { useNavigate, useSearchParams } from "react-router-dom"
import qs from 'query-string'
import { useLocation } from "react-router-dom"
export const Filter = ({paramKey, name, data}) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
   const location = useLocation() 
    console.log(searchParams)
    const existingSearch = searchParams.get(paramKey)
   
   const addFilter = (id) => {
    const currentSearchParams = qs.parse(searchParams.toString())
    let query = {...currentSearchParams,
    [paramKey]: id
    }
    if (currentSearchParams[paramKey] === id) {
        query[paramKey] = null
    }

    const url = qs.stringifyUrl({
        url: `${location.pathname}`, 
        query
    })
navigate(`${url}`)
 

   } 
    return (
      <AccordionItem  value={paramKey}>
        <AccordionTrigger className="font-semibold px-3" >{name}  </AccordionTrigger>
        <AccordionContent className="space-x-2 px-2">
        {data?.map(item => (
            <Button variant={existingSearch === item.id ? "default": "outline"} onClick={() => addFilter(item.id)}>
{item.name}
            </Button>
        ))}
        </AccordionContent>
      </AccordionItem>
    )
}