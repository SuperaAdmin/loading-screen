import { useEffect } from 'react';
import './App.css'

const App = () => {
  const params = new URLSearchParams(window.location.search);
  const msgKey = params.get("msg") || "def";
  const waitMs   = parseInt(params.get("wait") || "3000", 10);
  const nextUrl  = params.get("next")  || "/loading-screen/";

  const messages: Record<string, string> = {
    api: "Making fetch requests. Please wait...",
    load: "Loading data. Please wait...",
    redir: "Redirecting. Please wait...",
    def: "Please Wait..."
  };
  const message = messages[msgKey] ?? messages["def"];

  useEffect(() => {
    const id = setTimeout(() => {
      window.location.href = nextUrl;
    }, waitMs);

    return () => clearTimeout(id);
  }, [nextUrl, waitMs]);

  return (
    <div className="font-sans font-bold text-blue-500 relative flex flex-col items-center justify-center w-screen h-screen bg-[url('/hollowed-boxes.svg')]">
      {/* Gradient overlay to fade background */}
        <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-white via-white/95 to-white/0 pointer-events-none z-0" style={{ height: '90%' }} />

      <div className="flex flex-col items-center w-3/5 h-4/5 z-10">
        <h1 className="mt-20 text-4xl">{message}</h1>
        <div className="mt-8 animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-solid" />
      </div>
    </div>
  );
}


export default App
