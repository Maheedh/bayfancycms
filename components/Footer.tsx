import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-white shadow-md mt-8">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-gray-700">
          <p>&copy; 2023 Bayfancy Singapore. All Rights Reserved.</p>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/terms-conditions" className="text-gray-700 hover:text-gray-900">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-gray-700 hover:text-gray-900">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="text-gray-700 hover:text-gray-900">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer

