import { useState } from "react";
import { postData } from '../../api/apis';
import TermsModal from "../../components/modals/TermsModal";

export default function Home() {
  const [termsOpen, setTermsOpen] = useState(false);
  const [membershipForm, setMembershipForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedPlan: '',
    fitnessGoal: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target; 

    setMembershipForm((prev) => ({
      ...prev,          // keep existing fields
      [name]: value     // update the field matching input's "name"
    }));
  };

  const showTerms = (e) => {
    e.preventDefault();

    if(!membershipForm.fullName ||
      !membershipForm.email ||
      !membershipForm.phone ||
      !membershipForm.selectedPlan ||
      !membershipForm.fitnessGoal
    ) return 

    setTermsOpen(true);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try{    
      const res = await postData('/api/membership', membershipForm);

      if(res){
        setMembershipForm({
          fullName: '',
          email: '',
          phone: '',
          selectedPlan: '',
          fitnessGoal: ''
        })
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <main className="pt-10">
      {/* Hero */}
      <section
        id="Home"
        className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white h-[90vh] flex items-center"
      >
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Transform Your Body <br /> Join Our{" "}
            <span className="text-red-500">Membership</span>
          </h1>
          <p className="mt-4 text-lg max-w-md text-gray-300">
            Affordable plans tailored to your goals. Whether you’re just starting
            or leveling up, we’ve got the right membership for you.
          </p>
          <a
            href="#pricing"
            className="inline-block mt-6 bg-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            View Plans
          </a>
        </div>
      </section>

      {/* About Us */}
      <section
        id="About"
        className="py-18 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white"
      >
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-red-500">
            About Us
          </h2>
          
          <div className="bg-white rounded-lg p-8 text-gray-700">
            <p className="text-lg leading-relaxed tracking-tight">
              At <span className="font-bold text-xl text-red-500"><span className="text-black">GYM</span>Pro</span>, we believe fitness is more than 
              just lifting weights—it’s about building confidence, strength, and a 
              healthy lifestyle. Our mission is to provide a welcoming environment 
              for everyone, from beginners to seasoned athletes. 
            </p>
            <p className="mt-6 text-lg leading-relaxed track-tight">
              With top-notch facilities, experienced trainers, and diverse 
              programs, we’re here to help you achieve your personal fitness 
              goals. Together, let’s make every workout count.
            </p>
          </div>
  
        </div>
      </section>

      {/* Classes */}
      <section
        id="Classes"
        className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-800"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-red-500">
            INCLUDED CLASSES
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Strength Training", desc: "Build muscle & endurance." },
              { title: "Yoga & Flexibility", desc: "Enhance mobility & focus." },
              { title: "HIIT", desc: "Burn calories fast with high intensity." },
            ].map((cls, i) => (
              <div
                key={i}
                className="h-[300px] bg-gray-900 p-6 rounded-xl shadow hover:shadow-xl hover:scale-105 transition text-white"
              >
                <h3 className="text-xl font-semibold tracking-tight">
                  {cls.title}
                </h3>
                <p className="mt-2 text-gray-300">{cls.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section
        id="Trainers"
        className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-800"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-red-500">
            Meet Our Trainers
          </h2>
          <div className="flex gap-6 flex-wrap justify-center items-center">
            {["Aaron Rodriguez", "John Doe", "Jane Smith"].map((name, i) => (
              <div
                key={i}
                className="flex flex-col gap-x-4 items-center rounded p-8 transition transform hover:scale-105"
              >
                <div className="flex flex-col items-center">
                  <img
                    src="./11.jpg"
                    alt="trainer"
                    className="bg-red-500 p-2 h-40 w-40 rounded-full bg-gray-100 mb-4"
                  />
                  <h3 className="text-white text-2xl font-semibold tracking-tight mb-3">
                    {name}
                  </h3>
                </div>
                <p className="max-w-[250px] text-gray-300 text-sm">
                  “A great trainer builds not just your body, but your discipline
                  and mindset too.”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="Pricing"
        className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-red-500">
            Membership Plans
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                price: "₱1500",
                title: "BASIC",
                desc: "Equipment access, lockers, 1 consultation",
              },
              {
                price: "₱2000",
                title: "PRO",
                desc: "Equipment, lockers, group classes, 2 PT sessions",
              },
              {
                price: "₱3000",
                title: "ELITE",
                desc: "All-access, unlimited classes, weekly PT, nutrition",
              },
            ].map((plan, i) => (
              <div
                key={i}
                className="rounded-xl bg-white text-black p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition flex flex-col items-center"
              >
                <h2 className="text-red-500 text-3xl font-bold mb-4">
                  {plan.price}
                </h2>
                <h3 className="text-2xl font-semibold">{plan.title}</h3>
                <p className="mt-2 text-sm text-gray-700">{plan.desc}</p>
                <a
                  href="#join"
                  className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  Join Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Contacts */}
      <section
        id="Contact"
        className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-red-500">
            Get in Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            {/* Contact Info */}
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Contact Details</h3>
              <p className="mb-2 text-gray-300">
                📍 123 Fitness St., Makati, Philippines
              </p>
              <p className="mb-2 text-gray-300">📞 +63 912 345 6789</p>
              <p className="mb-2 text-gray-300">✉️ info@gymcenter.com</p>
              <p className="mt-4 text-sm text-gray-500">
                Open: Mon – Sat, 6:00 AM – 10:00 PM
              </p>
            </div>

            {/* Contact Form */}
            <form className="bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Write your message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>


      {/* Join Form */}
      <section
        id="join"
        className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white"
      >
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-center text-red-500">
            Become a Member
          </h2>

          <form className="bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col gap-6" onSubmit={showTerms}>
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your full name"
                value={membershipForm.fullName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
                value={membershipForm.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your phone number"
                value={membershipForm.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2"> 
                Select Plan
              </label>
              <select 
                name="selectedPlan"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" 
                value={membershipForm.selectedPlan}
                onChange={handleChange}>
                <option value="basic">Basic - ₱1500</option>
                <option value="pro">Pro - ₱2000</option>
                <option value="elite">Elite - ₱3000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Fitness Goal
              </label>
              <textarea
                rows="4"
                name="fitnessGoal"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Write your goal"
                value={membershipForm.fitnessGoal}
                onChange={handleChange}
              ></textarea>
            </div>

            
            <button
              type="submit"
              className="w-full bg-red-500 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Submit Application
            </button>
          </form>
        </div>
      </section>

      <TermsModal 
        open={termsOpen}
        onAccept={handleSubmit}
        onClose={() => setTermsOpen(false)}
      />
    </main>
  );
}

