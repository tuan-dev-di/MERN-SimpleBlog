import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Header} from "./components/index"
import {Home, Dashboard, About, SignIn, SignUp, Project} from "./pages/index"

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/sign-in" element={<SignIn/>}></Route>
        <Route path="/sign-up" element={<SignUp/>}></Route>
        <Route path="/project" element={<Project/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
