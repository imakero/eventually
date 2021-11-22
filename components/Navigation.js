import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="site-navigation">
      <Link href="/">
        <a>
          <h1>Eventually</h1>
        </a>
      </Link>
      <ul>
        <li>
          <Link href="/events">
            <a>All events</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About us</a>
          </Link>
        </li>
        <li>
          <Link href="/admin">
            <a>Admin pages</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
