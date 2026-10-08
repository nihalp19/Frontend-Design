import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Navbar from "./NavBar"

const tabs = ["Profile", "Interest", "Settings"]

function App() {

  const [tab, setTab] = useState(tabs[0])

  return (
    <>
      <div>{tabs.map((t, i) => (
        <div key={i} onClick={() => setTab(t)}>{t}</div>
      ))}
      </div>
      <div>
        {tab === "Profile" && <div>
          <input type="text" placeholder="Enter the name" />
        </div>}
        {tab === "Interest" && <div>
          <input type="email" placeholder="Enter the Email" />
        </div>}
        {tab === "Settings" && <div>
          <input type="text" placeholder="Enter the phone" />
        </div>}
      </div>
    </>
  )
}

export default App
