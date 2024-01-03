
import { useEffect, useState } from 'react'
import './App.css'
import { ThemeProvider } from '../contexts/theme'
import ThemeBtn from '../components/ThemeBtn'
import Card from '../components/Card'

function App() {
  const [themeMode,setThemeMode]=useState("light");

  const lightTheme=()=>{
    setThemeMode("light")
  }

  const darkTheme=()=>{
    setThemeMode("dark")
  }
 
  useEffect(()=>{
    console.log('Theme updated:', themeMode);
  //   if (localStorage.getItem('theme') === 'theme-dark') {
  //     setThemeMode('dark')
  // } else if (localStorage.getItem('theme') === 'theme-light') {
  //     setThemeMode('light')
  // }
    // document.querySelector('html').classList.remove("light","dark");
    // document.querySelector('html').classList.add(themeMode);
    const htmlElement = document.querySelector('html');
    htmlElement.classList.remove("light", "dark");
    htmlElement.classList.add(themeMode);
  },[themeMode])

  

  return (
    
    <ThemeProvider value={{themeMode,lightTheme,darkTheme}}>
<div className="flex flex-wrap min-h-screen items-center">
                <div className="w-full">
                    <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                        <ThemeBtn/>{/* themeBtn */}
                    </div>

                    <div className="w-full max-w-sm mx-auto">
                       <Card/>{/* CardBtn */}
                    </div>
                </div>
            </div>
      </ThemeProvider>
  )
}

export default App
