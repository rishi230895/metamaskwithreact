import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="text-gray-600 bg-gray-900 body-font">
        <div className="container px-5 py-4 mx-auto">
            <p className="text-sm text-center text-gray-500 sm:py-2 sm:mt-0 mt-4">© 2023 MetaMask —
                <Link href="https://twitter.com/knyttneve" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">Vidur Tuli</Link>
            </p>
        </div>
    </footer>
  )
}

export default Footer
