import { useState } from "react"

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_CONFIGURED   = EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY

export default function ContactMe() {
    const [name, setName]           = useState("")
    const [email, setEmail]         = useState("")
    const [phone, setPhone]         = useState("")
    const [message, setMessage]     = useState("")
    const [checkboxArray, setCheckboxArray] = useState([])
    const [status, setStatus]       = useState("idle") // "idle" | "loading" | "success" | "error"
    const [errorMsg, setErrorMsg]   = useState("")

    function handleCheckbox(value, checked) {
        if (checked) {
            setCheckboxArray(prev => [...prev, value])
        } else {
            setCheckboxArray(prev => prev.filter(item => item !== value))
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setStatus("loading")
        setErrorMsg("")

        // Basic validation
        if (!name.trim()) {
            setErrorMsg("Please enter your name.")
            setStatus("error")
            return
        }
        if (checkboxArray.includes("email") && !email.trim()) {
            setErrorMsg("Please enter your email address.")
            setStatus("error")
            return
        }
        if (checkboxArray.includes("phone") && !phone.trim()) {
            setErrorMsg("Please enter your phone number.")
            setStatus("error")
            return
        }
        if (!message.trim()) {
            setErrorMsg("Please enter a message.")
            setStatus("error")
            return
        }

        if (!EMAILJS_CONFIGURED) {
            setErrorMsg("Email service is not configured. Please add EmailJS keys to your .env file.")
            setStatus("error")
            return
        }

        // Dynamically load EmailJS SDK
        if (!window.emailjs) {
            await new Promise((resolve, reject) => {
                const script = document.createElement("script")
                script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
                script.onload = resolve
                script.onerror = reject
                document.head.appendChild(script)
            })
        }

        window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })

        const templateParams = {
            from_name:    name,
            reply_to:     email || "N/A",
            phone:        phone || "N/A",
            contact_via:  checkboxArray.length ? checkboxArray.join(" & ") : "Not specified",
            message:      message,
        }

        try {
            await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            setStatus("success")
            // Reset form
            setName("")
            setEmail("")
            setPhone("")
            setMessage("")
            setCheckboxArray([])
        } catch (err) {
            console.error("EmailJS error:", err)
            setErrorMsg("Something went wrong. Please try again later.")
            setStatus("error")
        }
    }

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center z-10 px-4">

                <h1 className="text-6xl font-bold text-center text-white mb-6">
                    Contact Me
                </h1>

                <div className="w-full max-w-md rounded-2xl backdrop-blur-md bg-white/10 border border-teal-300/30 shadow-[0_0_25px_rgba(20,184,166,0.25)] mt-16 p-8">

                    {status === "success" ? (
                        <div className="flex flex-col items-center gap-4 py-8 text-center">
                            <div className="w-16 h-16 rounded-full bg-teal-400/20 flex items-center justify-center">
                                <svg className="w-8 h-8 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-teal-100 text-lg font-medium">Message sent!</p>
                            <p className="text-teal-200/60 text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                            <button
                                onClick={() => setStatus("idle")}
                                className="mt-2 text-sm text-teal-300 underline underline-offset-4 hover:text-white transition-colors"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form className="space-y-5" onSubmit={handleSubmit}>

                            {/* Name */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-teal-100 text-sm">
                                    Name <span className="text-teal-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="bg-transparent border border-teal-300/40 rounded-lg px-3 py-2 text-white placeholder:text-teal-200/40 focus:outline-none focus:ring-2 focus:ring-teal-300"
                                    placeholder="Enter your name"
                                />
                            </div>

                            {/* Preferred contact method */}
                            <p className="text-teal-100 font-medium pt-2">
                                Preferred contact method
                            </p>

                            <div className="flex gap-6 text-teal-100">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value="email"
                                        checked={checkboxArray.includes("email")}
                                        onChange={e => handleCheckbox(e.target.value, e.target.checked)}
                                        className="accent-teal-400"
                                    />
                                    Email
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value="phone"
                                        checked={checkboxArray.includes("phone")}
                                        onChange={e => handleCheckbox(e.target.value, e.target.checked)}
                                        className="accent-teal-400"
                                    />
                                    Phone
                                </label>
                            </div>

                            {/* Conditional: Email input */}
                            {checkboxArray.includes("email") && (
                                <div className="flex flex-col gap-2">
                                    <label className="text-teal-100 text-sm">
                                        Email address <span className="text-teal-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="bg-transparent border border-teal-300/40 rounded-lg px-3 py-2 text-white placeholder:text-teal-200/40 focus:outline-none focus:ring-2 focus:ring-teal-300"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            )}

                            {/* Conditional: Phone input */}
                            {checkboxArray.includes("phone") && (
                                <div className="flex flex-col gap-2">
                                    <label className="text-teal-100 text-sm">
                                        Phone number <span className="text-teal-400">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        className="bg-transparent border border-teal-300/40 rounded-lg px-3 py-2 text-white placeholder:text-teal-200/40 focus:outline-none focus:ring-2 focus:ring-teal-300"
                                        placeholder="+91 00000 00000"
                                    />
                                </div>
                            )}

                            {/* Message */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-teal-100 text-sm">
                                    Message <span className="text-teal-400">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    className="bg-transparent border border-teal-300/40 rounded-lg px-3 py-2 text-white placeholder:text-teal-200/40 focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none"
                                    placeholder="What's on your mind?"
                                />
                            </div>

                            {/* Error message */}
                            {status === "error" && errorMsg && (
                                <p className="text-red-400 text-sm">{errorMsg}</p>
                            )}

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full mt-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200
                                    bg-teal-400 text-teal-950 hover:bg-teal-300 active:scale-[0.98]
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-400
                                    flex items-center justify-center gap-2"
                            >
                                {status === "loading" ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                        Sending…
                                    </>
                                ) : "Send message"}
                            </button>

                        </form>
                    )}
                </div>
            </div>
        </>
    )
}