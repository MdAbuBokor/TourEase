import { Link } from "react-router-dom";



const Banner = () => {
    return (
  
        <div className="bg-[url('./assets/img/banner.jpg')] min-h-[80vh] flex items-center justify-center bg-cover">
          <div className="bg-black bg-opacity-70 min-h-[80vh] min-w-full">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
        
              <div className="flex justify-center">
                <Link to="/">
                <div className="group inline-block bg-white/[.05] hover:bg-white/[.1] border border-white/[.05] p-1 ps-4 rounded-full shadow-md">
                  <p className="me-2 inline-block text-lime-600 font-medium  text-5xl">
                
                  TourEase
                  
                  </p>
                  {/* <span className="group-hover:bg-white/[.1] py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-white/[.075] font-semibold text-white text-sm">
                    <svg className="flex-shrink-0 size-4" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg> */}
                  {/* </span> */}
                
                </div>
                </Link>
              </div>
        
              <div className="max-w-3xl text-center mx-auto">
                <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl ">
                Your Dream Adventure Starts Here
                </h1>
              </div>
        
              <div className="max-w-3xl text-center mx-auto">
                <p className="text-lg text-gray-400 font-semibold">Book Accommodations, Capture Moments, Explore Bangladesh</p>
              </div>
        
              <div className="text-center">
                <a className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800" href="/">
                 Choose Tourist Place
                  <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
    );
};

export default Banner;