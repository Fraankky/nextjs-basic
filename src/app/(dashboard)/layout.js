import Link from "next/link";

export default function Layout({ children }) {
  return (
    <main className='flex h-screen'>
      <aside className="w-[240px] bg-indigo-600 text-white p-5">
        <Link href="/dashboard" className="block">Dashboard</Link>
        <Link href="/course" className="block">Course</Link>
        <Link href="/profile" className="block">Profile</Link>
      </aside>
      <section className="p-5">{children}</section>
    </main>

  )
}
