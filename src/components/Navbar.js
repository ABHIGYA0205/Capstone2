import Link from 'next/link'
export default function Navbar() {
    return (
      <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <img src="/logo.png" alt="logo" width={200} height={200} />
        <ul className="flex space-x-6">
        <Link href="/" className='hover:text-gray-300'>Home</Link>
        <Link href="/workouts" className="hover:text-gray-300">Workouts</Link>
        <Link href="/favorites" className="hover:text-gray-300">Favorites</Link>
        <Link href="/about" className="hover:text-gray-300">About</Link>
        <Link href="/contact" className="hover:text-gray-300">Contact</Link>
        <Link href="/auth/login" className="hover:text-gray-300">Login</Link>
        </ul>
      </nav>
    );
  }
  