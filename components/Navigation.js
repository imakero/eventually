import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navigation() {
  const router = useRouter()
  console.log(router)
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
            <a className={router.route === '/events' ? 'active' : ''}>
              All events
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className={router.route === '/about' ? 'active' : ''}>
              About us
            </a>
          </Link>
        </li>
        <li>
          <Link href="/admin">
            <a className={router.route === '/admin' ? 'active' : ''}>
              Admin pages
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
