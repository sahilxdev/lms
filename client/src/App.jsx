import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import { ThemeProvider } from "@/components/ThemeProvider"



function App() {
  

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

    <main>
      <Navbar/>
      <Login/>
    </main>
    </ThemeProvider>

  )
}

export default App
