import { useQuery } from "@tanstack/react-query"
import { fetchTodos } from "./api"
import Virtualizer from "./Virtualizer.tsx"

function App() {


  const { data, isLoading ,error} = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos
  })

  if (isLoading) {
     return <div>
         ....loading
     </div>
  }

  if(error){
    return <div>
      {error.message}
    </div>
  }

  return (
    <>
      <div>
          <Virtualizer data={data ? data : []}/>
      </div>
    </>
  )
}

export default App
