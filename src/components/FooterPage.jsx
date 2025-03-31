import React from 'react'

function FooterPage() {
  return (
    <div className='w-full'>
        
        <footer className="bg-gray-900   text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition">Our Story</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Leadership</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition">For Partners</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Developers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Media Kit</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition">LinkedIn</a>
                <a href="#" className="hover:text-blue-400 transition">Twitter</a>
                <a href="#" className="hover:text-blue-400 transition">Facebook</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2023 Swiggy Corporate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default FooterPage