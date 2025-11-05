import * as React from "react"
import { Link } from "gatsby"

const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}

const NotFoundPage = () => {
  return (
    <>
      <div className="max-w-xl w-full text-center bg-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-700/50">
        <p className="text-7xl md:text-9xl mb-6 animate-pulse">
            &#128532;
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-red-400 mb-4">
            404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-200">
            Oops! It seems this page took a detour.
        </h2>
        <p className="text-lg text-gray-400 mb-10">
            We searched high and low, but the link you clicked decided to travel to an unknown dimension. Don't worry, your journey isn't over yet.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#" className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]">
                Go Back Home
            </a>
        </div>
    </div>
    </>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
