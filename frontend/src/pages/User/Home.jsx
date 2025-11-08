import { useState } from "react";
import TermsModal from "../../components/modals/TermsModal";

export default function Home() {
  const [termsOpen, setTermsOpen] = useState(false);
  const [membershipForm, setMembershipForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    plan: "",
    fitnessGoal: "",
    expirationDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMembershipForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showTerms = (e) => {
    e.preventDefault();

    if (
      !membershipForm.fullName ||
      !membershipForm.email ||
      !membershipForm.phone ||
      !membershipForm.plan ||
      !membershipForm.fitnessGoal
    ) {
      alert("Complete the form before submitting.");
      return;
    }

    setTermsOpen(true);
  };

  return (
    <main className="pt-10 text-gray-900">
      {/* Hero */}
      <section
        id="Home"
        className="bg-gradient-to-r from-blue-900 to-blue-700 text-white h-[90vh] flex gap-5 items-center justify-center"
      >
        <div className="px-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Transform Your Body <br /> Join Our{" "}
            <span className="text-yellow-400">Membership</span>
          </h1>
          <p className="mt-4 text-lg max-w-md text-gray-200">
            Affordable plans tailored to your goals. Whether you’re just starting
            or leveling up, we’ve got the right membership for you.
          </p>
          <a
            href="#pricing"
            className="inline-block mt-6 bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            View Plans
          </a>
        </div>
        <img className="md:flex hidden" src="/logo.png"/>
      </section>

      {/* About Us */}
      <section id="About" className="py-18 bg-white text-gray-900">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-blue-900">
            About Us
          </h2>
          <div className="rounded-lg p-8 bg-gradient-to-r from-blue-50 to-white shadow">
            <p className="text-lg leading-relaxed tracking-tight">
              At{" "}
              <span className="font-bold text-2xl text-blue-900 tracking-tight">
                Don'sFitness
              </span>
              , we believe fitness is more than just lifting weights—it’s about
              building confidence, strength, and a healthy lifestyle.
            </p>
            <p className="mt-6 text-lg leading-relaxed">
              With top-notch facilities, experienced trainers, and diverse
              programs, we’re here to help you achieve your personal fitness
              goals. Together, let’s make every workout count.
            </p>
          </div>
        </div>
      </section>

      {/* Classes */}
      <section id="Classes" className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-white">
            Included Classes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Strength Training", img: "/strength.webp" },
              { title: "Yoga & Flexibility", img: "/yoga.avif" },
              { title: "HIIT", img: "/hiit.jpg" },
            ].map((cls, i) => (
              <div
                key={i}
                className="relative h-[300px] bg-white text-blue-900 p-6 rounded-xl shadow hover:shadow-xl hover:scale-105 transition bg-cover bg-center"
                style={{ backgroundImage: `url(${cls.img})`}}
              >
                <div className="absolute inset-0 bg-blue-500/30 rounded-xl z-0"/>
                <div className="relative z-10 p-6 text-yellow-500">
                  <h3 className="text-3xl font-bold tracking-tight">{cls.title}</h3>
                </div>              
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section id="Trainers" className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-blue-900">
            Meet Our Trainers
          </h2>
          <div className="flex gap-6 flex-wrap justify-center items-center">
            {["Aaron Rodriguez", "John Doe", "Jane Smith"].map((name, i) => (
              <div
                key={i}
                className="flex flex-col gap-x-4 items-center rounded p-8 transition transform hover:scale-105 bg-gradient-to-b from-blue-50 to-white shadow"
              >
                <div className="flex flex-col items-center">
                  <img
                    src="./111.jpg"
                    alt="trainer"
                    className="h-40 w-40 rounded-full border-4 border-blue-900 mb-4"
                  />
                  <h3 className="text-blue-900 text-2xl font-semibold tracking-tight mb-3">
                    {name}
                  </h3>
                </div>
                <p className="max-w-[250px] text-gray-600 text-sm">
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
        className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-8 tracking-tighter">
            Membership Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                price: "₱1500",
                title: "BASIC",
                desc: "Access to all gym equipment, secure locker usage, and one complimentary fitness consultation to get you started.",
              },
              {
                price: "₱2000",
                title: "PRO",
                desc: "Full equipment access, personal locker, unlimited group workout classes, plus two personal training sessions for guided improvement.",
              },
              {
                price: "₱3000",
                title: "ELITE",
                desc: "Premium all-access membership with advanced equipment, unlimited classes, weekly 1-on-1 personal training, customized nutrition planning, and exclusive wellness perks.",
              },
            ].map((plan, i) => (
              <div
                key={i}
                className="rounded-xl bg-white text-blue-900 p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition flex flex-col items-center"
              >
                <h2 className="text-blue-900 text-3xl font-bold mb-4">
                  {plan.price}
                </h2>
                <h3 className="text-2xl font-semibold">{plan.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{plan.desc}</p>
                <a
                  href="#join"
                  className="mt-6 bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Join Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="Contact" className="py-16 bg-white text-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-blue-900">
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-blue-900">
                Contact Details
              </h3>
              <p className="mb-2">📍 123 Fitness St., Makati, Philippines</p>
              <p className="mb-2">📞 +63 912 345 6789</p>
              <p className="mb-2">✉️ info@gymcenter.com</p>
              <p className="mt-4 text-sm text-gray-500">
                Open: Mon – Sat, 6:00 AM – 10:00 PM
              </p>
            </div>
            <form className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-lg flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-blue-900">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-blue-900">
                  Your Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-blue-900">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  placeholder="Write your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 py-3 rounded-lg font-semibold text-white hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Join Form */}
      <section id="join" className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-center">
            Become a Member
          </h2>
          <form
            className="bg-white text-gray-900 p-8 rounded-xl shadow-lg flex flex-col gap-6"
            onSubmit={showTerms}
          >
            <div>
              <label className="block text-sm font-medium mb-2 text-blue-900">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="Enter your full name"
                value={membershipForm.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-blue-900">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="Enter your email"
                value={membershipForm.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-blue-900">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="Enter your phone number"
                value={membershipForm.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-blue-900">
                Select Plan
              </label>
              <select
                name="plan"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={membershipForm.plan}
                onChange={handleChange}
              >
                <option value="">-- Choose a Plan --</option>
                <option value="Basic">Basic - ₱1500</option>
                <option value="Pro">Pro - ₱2000</option>
                <option value="Elite">Elite - ₱3000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-blue-900">
                Fitness Goal
              </label>
              <textarea
                rows="4"
                name="fitnessGoal"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="Write your goal"
                value={membershipForm.fitnessGoal}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 py-3 rounded-lg font-semibold text-white hover:bg-blue-700 transition"
            >
              Submit Application
            </button>
          </form>
        </div>
      </section>

      <TermsModal
        open={termsOpen}
        membershipForm={membershipForm}
        setMembershipForm={setMembershipForm}
        onClose={() => setTermsOpen(false)}
      />
    </main>
  );
}
