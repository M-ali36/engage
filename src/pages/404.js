import * as React from "react"
import { Link } from "gatsby"

const NotFoundPage = () => {
  return (
    <>
      <div className="max-w-full w-full text-center pt-48 pb-12 px-4">
        <p className="text-7xl md_text-9xl mb-6 animate-pulse">
            &#128532;
        </p>
        <h1 className="text-5xl md_text-7xl font-extrabold text-orange mb-4">
            404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
            Oops! It seems this page took a detour.
        </h2>
        <p className="text-lg text-gray-400 mb-10">
            We searched high and low, but the link you clicked decided to travel to an unknown dimension. Don't worry, your journey isn't over yet.
        </p>
        <div className="flex justify-center">
            <Link to={`/`} className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-black rounded-lg shadow-lg hover_bg-orange transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]">
                Go Back Home
            </Link>
        </div>
    </div>
    </>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
