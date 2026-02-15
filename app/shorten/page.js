"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Shorten = () => {
    const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generated, setGenerated] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState({})

    // URL validation function
    const isValidURL = (string) => {
        try {
            new URL(string)
            return true
        } catch (_) {
            return false
        }
    }

    const validate = (field, value) => {
        let newErrors = { ...errors }

        if (field === "url") {
            if (!value) {
                newErrors.url = "URL is required"
            } else if (!isValidURL(value)) {
                newErrors.url = "Enter a valid URL (include https://)"
            } else {
                delete newErrors.url
            }
        }

        if (field === "shorturl") {
            const regex = /^[a-zA-Z0-9_-]+$/
            if (!value) {
                newErrors.shorturl = "Short text is required"
            } else if (!regex.test(value)) {
                newErrors.shorturl = "Only letters, numbers, - and _ allowed"
            } else if (value.length < 3) {
                newErrors.shorturl = "Minimum 3 characters required"
            } else {
                delete newErrors.shorturl
            }
        }

        setErrors(newErrors)
    }

    const generate = () => {
        if (Object.keys(errors).length > 0 || !url || !shorturl) return

        setLoading(true)
        setSuccess(false)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shorturl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
                seturl("")
                setshorturl("")
                setSuccess(true)
                setLoading(false)

                setTimeout(() => setSuccess(false), 3000)
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-black px-6">

            <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 text-white">

                <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Generate Your Short URL
                </h1>

                <p className="text-gray-300 text-center mb-8">
                    Create clean, shareable and powerful short links instantly.
                </p>

                <div className="flex flex-col gap-5">

                    {/* URL Input */}
                    <div>
                        <input
                            type="text"
                            value={url}
                            placeholder="Enter your long URL"
                            onChange={e => {
                                seturl(e.target.value)
                                validate("url", e.target.value)
                            }}
                            className={`px-5 py-3 rounded-xl w-full bg-white/20 border ${
                                errors.url ? "border-red-500" : "border-white/30"
                            } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-300`}
                        />
                        {errors.url && (
                            <p className="text-red-400 text-sm mt-1">{errors.url}</p>
                        )}
                    </div>

                    {/* Short URL Input */}
                    <div>
                        <input
                            type="text"
                            value={shorturl}
                            placeholder="Enter custom short text"
                            onChange={e => {
                                setshorturl(e.target.value)
                                validate("shorturl", e.target.value)
                            }}
                            className={`px-5 py-3 rounded-xl w-full bg-white/20 border ${
                                errors.shorturl ? "border-red-500" : "border-white/30"
                            } focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 placeholder-gray-300`}
                        />
                        {errors.shorturl && (
                            <p className="text-red-400 text-sm mt-1">{errors.shorturl}</p>
                        )}
                    </div>

                    <button
                        onClick={generate}
                        disabled={loading || Object.keys(errors).length > 0 || !url || !shorturl}
                        className="mt-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Generating...
                            </>
                        ) : (
                            "Generate Link 🚀"
                        )}
                    </button>

                </div>

                {/* Success Message */}
                {success && (
                    <div className="mt-6 text-center text-green-400 font-semibold animate-bounce">
                        ✅ Link Generated Successfully!
                    </div>
                )}

                {/* Generated Link */}
                {generated && (
                    <div className="mt-6 bg-white/10 border border-white/20 p-5 rounded-xl text-center transition-all duration-500">
                        <span className="block text-lg font-semibold mb-2">
                            Your Short Link:
                        </span>

                        <Link
                            target="_blank"
                            href={generated}
                            className="text-purple-300 hover:text-pink-400 break-all font-mono"
                        >
                            {generated}
                        </Link>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Shorten
