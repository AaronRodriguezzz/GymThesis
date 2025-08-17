
export default function Home() {
  return (
    <main className="pt-10">
      {/* Hero */}
      <section
        id="home"
        className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white h-[90vh] flex items-center"
      >
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Your Fitness Journey <br /> Starts{" "}
            <span className="text-red-500">Here</span>
          </h1>
          <p className="mt-4 text-lg max-w-md text-gray-300">
            Join our community and transform your body & mind with expert
            trainers.
          </p>
          <a
            href="#join"
            className="inline-block mt-6 bg-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Classes */}
      <section id="classes" className="py-16 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 tracking-tight text-gray-800">
            Our Classes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
              <h3 className="text-xl font-semibold tracking-tight text-gray-900">Strength Training</h3>
              <p className="mt-2 text-gray-600">Build muscle and endurance.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
              <h3 className="text-xl font-semibold tracking-tight text-gray-900">Yoga & Flexibility</h3>
              <p className="mt-2 text-gray-600">Enhance mobility and relaxation.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
              <h3 className="text-xl font-semibold tracking-tight text-gray-900">HIIT</h3>
              <p className="mt-2 text-gray-600">High intensity cardio bursts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section id="trainers" className="py-16 bg-gradient-to-r from-gray-100 via-white to-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 tracking-tight text-gray-800">
            Meet Our Trainers
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-tr from-gray-200 to-gray-300 h-64 flex flex-col items-center justify-center rounded-xl shadow hover:shadow-lg transition">
              <div className="bg-gray-500 h-32 w-32 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold tracking-tight text-gray-900">Alex Smith</h3>
              <p className="text-gray-600">Strength Coach</p>
            </div>
            <div className="bg-gradient-to-tr from-gray-200 to-gray-300 h-64 flex flex-col items-center justify-center rounded-xl shadow hover:shadow-lg transition">
              <div className="bg-gray-500 h-32 w-32 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold tracking-tight text-gray-900">Jane Doe</h3>
              <p className="text-gray-600">Yoga Instructor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 tracking-tight">
            Membership Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold tracking-tight">Basic</h3>
              <p className="text-2xl font-bold my-4">$29/mo</p>
              <a
                href="#join"
                className="bg-red-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-600 transition"
              >
                Choose
              </a>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow border-2 border-red-500 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold tracking-tight">Pro</h3>
              <p className="text-2xl font-bold my-4">$49/mo</p>
              <a
                href="#join"
                className="bg-red-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-600 transition"
              >
                Choose
              </a>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold tracking-tight">Elite</h3>
              <p className="text-2xl font-bold my-4">$69/mo</p>
              <a
                href="#join"
                className="bg-red-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-600 transition"
              >
                Choose
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
