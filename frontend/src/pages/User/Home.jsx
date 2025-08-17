
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
      <section id="classes" className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-800 ">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-red-500">
            OUR CLASSES
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="h-[300px] bg-gray-900 p-6 rounded-xl shadow hover:shadow-xl transition text-white">
              <h3 className="text-xl font-semibold tracking-tight">Strength Training</h3>
              <p className="mt-2">Build muscle and endurance.</p>
            </div>
            <div className="h-[300px] bg-gray-900 p-6 rounded-xl shadow hover:shadow-xl transition text-white">
              <h3 className="text-xl font-semibold tracking-tight">Yoga & Flexibility</h3>
              <p className="mt-2">Enhance mobility and relaxation.</p>
            </div>
            <div className="h-[300px] bg-gray-900 p-6 rounded-xl shadow hover:shadow-xl transition text-white">
              <h3 className="text-xl font-semibold tracking-tight">HIIT</h3>
              <p className="mt-2">High intensity cardio bursts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section id="trainers" className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-800 ">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-white">
            Meet Our Trainers
          </h2>
          <div className="flex gap-4 flex-wrap justify-center items-center">
            <div className="flex flex-col gap-x-4 items-center rounded p-8 transition transform hover:scale-105">
              <div className="flex flex-col items-center">
                <img
                  src="./11.jpg"
                  alt="trainer"
                  className="bg-red-500 p-2 h-40 w-40 rounded-full bg-gray-100 mb-4"
                />  
                <h3 className="text-white text-3xl font-semibold tracking-tight mb-5">Aaron Rodriguez</h3>
              </div>

              {/* Hidden text, shown on hover */}
              <p className="max-w-[300px] text-white tracking-tighter">
                “A good trainer doesn’t just build your body, they strengthen your discipline, 
                mindset, and belief in yourself.”
              </p>
            </div>

            <div className="flex flex-col gap-x-4 items-center rounded p-8 transition transform hover:scale-105">
              <div className="flex flex-col items-center">
                <img
                  src="./11.jpg"
                  alt="trainer"
                  className="bg-red-500 p-2 h-40 w-40 rounded-full bg-gray-100 mb-4"
                />  
                <h3 className="text-white text-3xl font-semibold tracking-tight mb-5">Aaron Rodriguez</h3>
              </div>

              {/* Hidden text, shown on hover */}
              <p className="max-w-[300px] text-white tracking-tighter">
                “A good trainer doesn’t just build your body, they strengthen your discipline, 
                mindset, and belief in yourself.”
              </p>
            </div>

            <div className="flex flex-col gap-x-4 items-center rounded p-8 transition transform hover:scale-105">
              <div className="flex flex-col items-center">
                <img
                  src="./11.jpg"
                  alt="trainer"
                  className="bg-red-500 p-2 h-40 w-40 rounded-full bg-gray-100 mb-4"
                />  
                <h3 className="text-white text-3xl font-semibold tracking-tight mb-5">Aaron Rodriguez</h3>
              </div>

              {/* Hidden text, shown on hover */}
              <p className="max-w-[300px] text-white tracking-tighter">
                “A good trainer doesn’t just build your body, they strengthen your discipline, 
                mindset, and belief in yourself.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-red-500">
            Membership Plans
          </h2>
          
          <div className="flex justify-evenly items-center gap-12">
            <div className="flex flex-col gap-y-4">
              <div className="rounded bg-white flex items-center gap-6 p-4">
                <h2 className="text-red-500 text-2xl tracking-tighter">₱1500</h2>

                <div className="text-black text-left">
                  <h3 className="text-2xl tracking-tighter">BASIC</h3>
                  <p className="tracking-tight text-sm">Gym equipment access, locker rooms, 1 fitness consultation</p>
                </div>
              </div>

              <div className="rounded bg-white flex items-center gap-6 p-4">
                <h2 className="text-red-500 text-2xl tracking-tighter">₱2000</h2>

                <div className="text-black text-left">
                  <h3 className="text-2xl tracking-tighter">PRO</h3>
                  <p className="tracking-tight text-sm">Gym equipment access, locker rooms, group classes, 2 personal training sessions</p>
                </div>
              </div>

              <div className="rounded bg-white flex items-center gap-6 p-4">
                <h2 className="text-red-500 text-2xl tracking-tighter">₱3000</h2>

                <div className="text-black text-left">
                  <h3 className="text-2xl tracking-tighter">ELITE</h3>
                  <p className="tracking-tight text-sm">Gym equipment access, locker rooms, unlimited group classes, weekly personal training, nutrition guidance, progress tracking</p>
                </div>
              </div>
            </div>

            <img src="./gym.jpg" alt="" className="h-full w-[40%] rounded-lg "/>
          </div>
        </div>
      </section>
    </main>
  );
}
