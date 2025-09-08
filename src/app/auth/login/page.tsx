'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const data = await api<{ access_token: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('access_token', data.access_token);
      router.push('/');
    } catch (err: any) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="animated-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="gradient-orb orb-4"></div>
        </div>

        <div className="login-card">
          <div className="card-header">
            <div className="logo">
              <div className="logo-icon">🚀</div>
              <h1 className="logo-text">MyApp</h1>
            </div>
            <p className="welcome-text">Chào mừng trở lại!</p>
          </div>

          <form onSubmit={onSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📧</span>
                Email
              </label>
              <div className="input-wrapper">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  className="form-input"
                  placeholder="Nhập email của bạn"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">🔒</span>
                Mật khẩu
              </label>
              <div className="input-wrapper password-wrapper">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  required
                  className="form-input"
                  placeholder="Nhập mật khẩu"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <span className="btn-icon">✨</span>
                  Đăng nhập
                </>
              )}
            </button>
          </form>

          <div className="form-footer">
            <p className="footer-text">
              Chưa có tài khoản? 
              <Link href="/auth/register" className="footer-link">
                Đăng ký ngay
              </Link>
            </p>
            <Link href="/auth/forgot-password" className="forgot-link">
              Quên mật khẩu?
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .animated-background {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, 
            #667eea 0%, 
            #764ba2 25%, 
            #f093fb 50%, 
            #f5576c 75%, 
            #4facfe 100%
          );
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          z-index: -2;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.7;
          animation: float 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, #ff6b6b, #feca57);
          top: -150px;
          left: -150px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(45deg, #48dbfb, #0abde3);
          top: 50%;
          right: -200px;
          animation-delay: 5s;
        }

        .orb-3 {
          width: 200px;
          height: 200px;
          background: linear-gradient(45deg, #ff9ff3, #f368e0);
          bottom: -100px;
          left: 30%;
          animation-delay: 10s;
        }

        .orb-4 {
          width: 350px;
          height: 350px;
          background: linear-gradient(45deg, #a8e6cf, #88d8a3);
          top: 20%;
          left: -175px;
          animation-delay: 15s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }

        .login-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          padding: 3rem;
          width: 100%;
          max-width: 450px;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: slideUp 0.8s ease-out;
          z-index: 1;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .logo-icon {
          font-size: 2.5rem;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        .logo-text {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(45deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .welcome-text {
          color: #6b7280;
          font-size: 1.1rem;
          margin: 0;
          font-weight: 500;
        }

        .login-form {
          space-y: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .label-icon {
          font-size: 1rem;
        }

        .input-wrapper {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          background: rgba(255, 255, 255, 0.9);
          transition: all 0.3s ease;
          outline: none;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          background: white;
          transform: translateY(-2px);
        }

        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .password-wrapper {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .password-toggle:hover {
          background: rgba(102, 126, 234, 0.1);
        }

        .password-toggle:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-message {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #dc2626;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
          background: linear-gradient(45deg, #5a67d8, #6b46c1);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .form-footer {
          margin-top: 2rem;
          text-align: center;
        }

        .footer-text {
          color: #6b7280;
          margin: 0 0 1rem 0;
          font-size: 0.95rem;
        }

        .footer-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          margin-left: 0.5rem;
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: #5a67d8;
          text-decoration: underline;
        }

        .forgot-link {
          color: #667eea;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .forgot-link:hover {
          color: #5a67d8;
          text-decoration: underline;
        }

        /* Mobile Responsive */
        @media (max-width: 640px) {
          .login-container {
            padding: 1rem;
          }

          .login-card {
            padding: 2rem 1.5rem;
            margin: 1rem;
          }

          .logo {
            flex-direction: column;
            gap: 0.5rem;
          }

          .logo-text {
            font-size: 1.75rem;
          }

          .form-input {
            padding: 0.875rem 1rem;
          }

          .submit-btn {
            padding: 0.875rem 1.25rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 1.5rem 1rem;
          }

          .welcome-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}
