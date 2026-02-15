import React from 'react'

const about = () => {
  return (
    <div>
       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white px-6 py-16">

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          About BitLinks
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          BitLinks is a modern URL shortener built for speed, simplicity, and performance.
          We help users create, manage, and track short links effortlessly.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto mt-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-400">
            Our mission is to simplify link sharing across platforms with secure,
            fast, and reliable redirection technology. We focus on clean UI,
            performance optimization, and developer-friendly architecture.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
          <ul className="space-y-3 text-gray-400">
            <li>⚡ Ultra-fast redirection</li>
            <li>🔒 Secure & scalable database</li>
            <li>📊 Future-ready analytics</li>
            <li>🌍 Cloud-based architecture</li>
          </ul>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto mt-24">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Custom Short Links",
              desc: "Create personalized short URLs instantly."
            },
            {
              title: "Cloud Database",
              desc: "Reliable storage with MongoDB Atlas."
            },
            {
              title: "Scalable Backend",
              desc: "Built with Next.js API routes for high performance."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="max-w-6xl mx-auto mt-24 text-center">
        <h2 className="text-3xl font-semibold mb-6">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-4 text-gray-300">
          <span className="px-4 py-2 bg-blue-600/20 rounded-full">Next.js</span>
          <span className="px-4 py-2 bg-green-600/20 rounded-full">MongoDB</span>
          <span className="px-4 py-2 bg-purple-600/20 rounded-full">Tailwind CSS</span>
          <span className="px-4 py-2 bg-pink-600/20 rounded-full">Node.js</span>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto mt-24 text-center bg-gradient-to-r from-blue-600 to-purple-600 p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Shorten Your Links?
        </h2>
        <p className="mb-6 text-gray-100">
          Start creating clean and shareable URLs today.
        </p>
        <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition">
          Get Started
        </button>
      </section>

    </div>
    </div>
  )
}

export default about
