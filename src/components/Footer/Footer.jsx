import React from 'react'

function Footer() {
  return (
   <>
     <footer className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Company Information */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-2xl font-bold mb-2">TapTickets</h4>
            <p className="text-sm">
              Your trusted platform for booking movie tickets. Easy, fast, and reliable.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-xl font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/movielist" className="hover:underline">Movies</a>
              </li>
              <li>
                <a href="/theatres" className="hover:underline">Theatres</a>
              </li>
              <li>
                <a href="/reviews&ratings" className="hover:underline">Reviews & Ratings</a>
              </li>
              <li>
                <a href="/profile" className="hover:underline">Profile</a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/3">
            <h4 className="text-xl font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-gray-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88V15.6h-2.5v-2.6h2.5v-1.87c0-2.37 1.47-3.67 3.61-3.67 1.03 0 1.91.08 2.17.11v2.52h-1.49c-1.17 0-1.4.56-1.4 1.38v1.81h2.8l-.37 2.6h-2.43v6.28C18.34 21.12 22 17 22 12z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-gray-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6.12c-.83.37-1.72.62-2.65.73a4.62 4.62 0 0 0 2.03-2.56 9.27 9.27 0 0 1-2.93 1.12 4.59 4.59 0 0 0-7.82 4.18c0 .36.04.71.12 1.05A13.05 13.05 0 0 1 3.36 5.8a4.58 4.58 0 0 0 1.42 6.12c-.7-.02-1.36-.21-1.94-.52v.05c0 2.28 1.62 4.18 3.76 4.62a4.61 4.61 0 0 1-2.07.08c.58 1.8 2.28 3.11 4.3 3.15A9.22 9.22 0 0 1 2 18.52a13 13 0 0 0 7.06 2.06c8.47 0 13.1-7.02 13.1-13.1 0-.2-.01-.39-.02-.58a9.38 9.38 0 0 0 2.32-2.36c-.84.37-1.76.61-2.7.72z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-gray-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.98 4.53A3.67 3.67 0 0 1 20.67 8.2v7.59a3.67 3.67 0 0 1-3.69 3.69H7.68A3.67 3.67 0 0 1 4 15.8V8.2a3.67 3.67 0 0 1 3.68-3.67h7.3zm0 2.5H7.68a1.18 1.18 0 0 0-1.18 1.18v7.58a1.18 1.18 0 0 0 1.18 1.18h7.3a1.18 1.18 0 0 0 1.18-1.18V8.2a1.18 1.18 0 0 0-1.18-1.17zm2.52-2.5a1.09 1.09 0 1 1-2.18 0 1.09 1.09 0 0 1 2.18 0z"/>
                  <circle cx="12" cy="12" r="3.22"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center pt-6 border-t border-gray-200 mt-6">
          <p className="text-sm">© 2024 TapTickets. All rights reserved.</p>
        </div>
      </div>
    </footer>
   </>
  )
}

export default Footer