import { postData } from "../../api/apis";
import { useState } from "react";

export default function LoginPage() {
    const [credentials, setCredentials] = useState({ 
        username: '', 
        password: ''
    })

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const res = await postData('/api/login', credentials);

            if(res.success){
                return <Navigate to={'/'} replace/>
            }
        }catch(err){
            console.log(err);
        }
    }
    
    return (
        <main className="h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 flex items-center justify-center px-6">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md text-white">
                {/* Title */}
                <h1 className="text-4xl font-bold text-center mb-2 tracking-tight">
                    Welcome Back
                </h1>
                <p className="text-center text-gray-400 mb-8">
                    Log in to continue your fitness journey 
                </p>

                {/* Form */}
                <form className="flex flex-col gap-y-4" onSubmit={handleLogin}>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={credentials.username}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            onChange={(e) => setCredentials(prev => ({...prev, username: e.target.value}))}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                        Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={credentials.password}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            onChange={(e) => setCredentials(prev => ({...prev, password: e.target.value}))}
                        />
                    </div>

                    {/* Forgot password */}
                    <div className="text-right">
                        <a href="#" className="text-sm text-red-500 hover:underline">
                        Forgot password?
                        </a>
                    </div>

                    {/* Login button */}
                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 transition text-white font-semibold py-2 rounded-lg shadow"
                    >
                        Log In
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-2 my-6">
                    <div className="flex-1 h-px bg-gray-700"></div>
                    <span className="text-gray-400 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-700"></div>
                </div>

                {/* Social logins */}
                <div className="flex gap-4">
                    <button className="flex-1 bg-gray-800 hover:bg-gray-700 py-2 rounded-lg transition">
                        Google
                    </button>
                </div>

                {/* Register link */}
                <p className="mt-6 text-center text-gray-400 text-sm">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-red-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </main>
    );
}
