import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Navbar from "./components/Navbar"
import { SessionProvider } from "./context/SessionContext"

function App() {
  return (
    <SessionProvider>
      <Box minH={"100vh"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Box>
    </SessionProvider>
  )
}

export default App
