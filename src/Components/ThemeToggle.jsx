'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('customtheme');

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'customtheme';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'customtheme' ? 'dark' : 'customtheme';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
