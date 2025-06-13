export default function Layout({ children }) {
  return (
    <main className='grid grid-cols-2 h-screen'>
      <div className='bg-indigo-300'></div>
        <div className="h-screen flex justify-center items-center">
          <div className="w-[300px] space-y-4">
            <section>Devscale.</section>
            <section>{children}</section>
          </div>
        </div> 
    </main>

  )
}
