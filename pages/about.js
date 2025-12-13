import Layout from '../components/Layout'
export default function About() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">About the Author</h1>
      <p className="text-gray-700 mb-4">My work-from-home journey began in 2015 as a single mother looking for flexible work. I researched and tested many companies, and this book compiles those opportunities to help others get started.</p>
      <a href="/" className="text-primary font-semibold">Back to Home</a>
    </Layout>
  )
}
