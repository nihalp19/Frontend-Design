import { useEffect, useState, useRef } from "react"


function Virtualizer({ data }: any) {

    const [tableHeight, setTableHeight] = useState<number>(0)
    const [dataWindow, setDataWindow] = useState([])
    const containerRef = useRef<HTMLDivElement>(null);
    const previousScrollTop = useRef(0);
    const [rangeWindow, setRangeWindow] = useState({
        range: 0,
        startIndex: 0,
        endIndex: 0,
        offsetY: 0
    })
    const rowHeight = 50


    useEffect(() => {
        function calucateHeight() {
            console.log("data length", data.length)
            const height = data.length * rowHeight
            console.log(height)
            setTableHeight(height)
        }

        calucateHeight()
        const visibleRowCount = Math.ceil(window.innerHeight / rowHeight)
        setRangeWindow({ ...rangeWindow, range: visibleRowCount, endIndex: visibleRowCount + 1 })
    }, [data])

    useEffect(() => {
        const currentdata = data.slice(
            rangeWindow.startIndex,
            rangeWindow.endIndex
        )

        setDataWindow(currentdata)

        console.log("currentdata", currentdata)
    }, [data, rangeWindow.startIndex, rangeWindow.endIndex])


    console.log("range", rangeWindow.range)

    function handleScroll() {
        console.log("hi")
        const currentTop = containerRef.current?.scrollTop ?? 0

        if (currentTop > previousScrollTop.current) {
            console.log("startindex", rangeWindow.startIndex)
            console.log("endindex", rangeWindow.endIndex)
            const currentdata = data.slice(rangeWindow.startIndex, rangeWindow.endIndex)
            setDataWindow(currentdata)
            console.log("data", data)
        } else if (currentTop < previousScrollTop.current) {
            console.log("scroll up")
        }
        previousScrollTop.current = currentTop

        const startIndex = Math.floor(currentTop / rowHeight)
        console.log("startIndex", startIndex)
        const endIndex = Math.min(
            startIndex + rangeWindow.range,
            data.length
        )
        console.log("endIndex", endIndex)
        const offsetY = startIndex * rowHeight


        setRangeWindow({ ...rangeWindow, startIndex: startIndex, endIndex: endIndex, offsetY: offsetY })

    }

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            style={{
                height: "800px",
                overflowY: "auto"
            }}
        >
            <div
                style={{
                    height: `${tableHeight}px`,
                }}

            ><div style={{ transform: `translateY(${rangeWindow.offsetY}px` }}>
                    {dataWindow.map((d, i) => {
                        return (
                            <div className="h-[60px] border" key={i}>
                                {JSON.stringify(d)}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )

}

export default Virtualizer