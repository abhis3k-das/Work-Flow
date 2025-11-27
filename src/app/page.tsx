"use client"
import { useTheme } from "next-themes";

export default function Home() {
  const {setTheme, theme} = useTheme();
  const toggleTheme = () => {
    const isDark = theme === 'dark';
    console.log(isDark)
    setTheme(isDark ? 'light' : 'dark');
  }
  return (
    <div>
      <button onClick={toggleTheme} className="border p-2 rounded-sm">Toggle</button>
    </div>
  );
}
