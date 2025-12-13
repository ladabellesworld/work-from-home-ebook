import Head from 'next/head'
export default function Layout({ children, title='Work From Home Jobs' }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </Head>
      <main className="min-h-screen bg-white text-graphite">
        <div className="max-w-4xl mx-auto p-4 md:p-8">{children}</div>
      </main>
    </>
  )
}
