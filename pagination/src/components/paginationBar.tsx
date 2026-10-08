import { useEffect, useState } from "react";


function paginationBar() {

    const [state, setState] = useState("")
    const [data, setData] = useState<{ description: string }[]>([])
    const [pages, setPageCount] = useState<number[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentData, setCurrentdata] = useState<{ description: string }[]>([])


    useEffect(() => {
        async function fetchData() {
            try {
                setState("loading")
                const response = await fetch("https://dummyjson.com/products?limit=100")
                const result = await response.json()
                setData(result.products)
                setState("")
            } catch (error) {
                setState("We are facing some Error right now")
                console.log(error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        function calucatePages(pages = 10) {
            const array = []
            const pagesCount = data.length / pages
            console.log(pagesCount)
            for (let i = 1; i <= pagesCount; i++) {
                array.push(i)
            }
            setPageCount(array)
            const pagestart = pages * currentPage - pages
            const pageend = pages * currentPage
            const dataCurrent = data.slice(pagestart, pageend)
            setCurrentdata(dataCurrent)
        }
        calucatePages()
    }, [data])

    useEffect(() => {
        function pagination(pagesize: any) {
            const pagestart = pagesize * currentPage - pagesize 
            const pageend = pagesize * currentPage
            const dataCurrent = data.slice(pagestart, pageend)
            setCurrentdata(dataCurrent)
        }
        pagination(10)
    }, [currentPage])


    return (
        <div className="mx-[10px]">
            <h3>{state}</h3>
            <h2 className="text-center my-[50px]">{`we are on page no ${currentPage}`}</h2>
            {currentData.map((d, i) => (
                <div key={i} className="border text-[12px]">
                    {d.description}
                </div>
            ))}
            <div className="gap-5">
                <div className="flex justify-center mt-[40px] gap-5">
                    {
                        pages.map((n, i) => (
                            <div key={i} className="border cursor-pointer" onClick={() => setCurrentPage(n)}>{n}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default paginationBar