"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const sendToLogin = () => {
        router.push("/auth/login");
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios
            .post(`/api/auth/register`, {
                userName,
                password,
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                    <div className="flex flex-col justify-center p-8 md:p-14">
                        <h2 className="text-4xl font-bold text-violet-800 mb-3">Welcome</h2>
                        <p className="font-light text-gray-500 mb-8">
                            Please enter your details to create an account!
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="user"
                                    className="mb-1 text-gray-700 font-medium"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="user"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="password"
                                    className="mb-1 text-gray-700 font-medium"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-violet-800 text-white py-2 px-4 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Register
                            </button>
                        </form>
                        <p className="text-center text-gray-500 mt-4">
                            Already have an account?
                            <span
                                onClick={sendToLogin}
                                className="text-violet-800 font-medium cursor-pointer hover:underline"
                            >
                                Login here
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;