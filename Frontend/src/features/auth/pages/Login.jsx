import React, { useState, useRef, useCallback } from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import Spinner from '../../../components/Spinner.jsx'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // 3D tilt refs
    const cardRef = useRef(null)

    const handleMouseMove = useCallback((e) => {
        const card = cardRef.current
        if (!card) return
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2
        const cy = rect.height / 2
        const rotateX = ((y - cy) / cy) * -8
        const rotateY = ((x - cx) / cx) * 8
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    }, [])

    const handleMouseLeave = useCallback(() => {
        if (cardRef.current) {
            cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate("/")
    }

    if (loading) return <Spinner text="Signing you in..." />

    return (
        <div className="auth-page">
            {/* Animated background orbs */}
            <div className="auth-orb auth-orb--1" />
            <div className="auth-orb auth-orb--2" />
            <div className="auth-orb auth-orb--3" />
            <div className="auth-grid" />

            <div className="auth-perspective">
                <div
                    className="auth-card"
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ transition: 'transform 0.15s ease, box-shadow 0.35s ease' }}
                >
                    {/* Header */}
                    <div className="auth-header">
                        <div className="auth-icon">🔐</div>
                        <h1 className="auth-title">Welcome back</h1>
                        <p className="auth-subtitle">Sign in to your account to continue</p>
                    </div>

                    {/* Form */}
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                </span>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="auth-submit-btn">
                            Sign In →
                        </button>
                    </form>

                    <p className="auth-footer">
                        Don't have an account?{' '}
                        <Link to="/register">Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login