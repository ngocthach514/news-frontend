'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength === 0) return '';
    if (strength <= 25) return 'Yếu';
    if (strength <= 50) return 'Trung bình';
    if (strength <= 75) return 'Khá mạnh';
    return 'Rất mạnh';
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-yellow-500';
    if (strength <= 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthTextColor = (strength: number) => {
    if (strength <= 25) return 'text-red-500';
    if (strength <= 50) return 'text-yellow-500';
    if (strength <= 75) return 'text-blue-500';
    return 'text-green-500';
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setIsLoading(true);

    try {
      await api('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
      });
      router.push('/auth/login?message=Đăng ký thành công! Vui lòng đăng nhập.');
    } catch (err: any) {
      setError('Đăng ký thất bại. Email hoặc tên tài khoản đã tồn tại.');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 bg-[length:400%_400%] animate-gradient-xy"></div>
      
      {/* Floating Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-gradient-to-r from-blue-400 to-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-6000"></div>
        <div className="absolute top-20 right-1/3 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-8000"></div>
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 animate-slide-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-4xl animate-bounce">🌟</div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
                MyApp
              </h1>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Tạo tài khoản mới</h2>
            <p className="text-gray-600">Bắt đầu hành trình của bạn cùng chúng tôi!</p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <span>📧</span>
                Email
              </label>
              <div className="relative">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/90 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all duration-300 focus:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <span>👤</span>
                Tên tài khoản
              </label>
              <div className="relative">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/90 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all duration-300 focus:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="Nhập tên tài khoản"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <span>🔒</span>
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl bg-white/90 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all duration-300 focus:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="Tạo mật khẩu mạnh"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xl hover:bg-purple-50 p-1 rounded-lg transition-colors disabled:opacity-60"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {password && (
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs font-semibold min-w-fit ${getPasswordStrengthTextColor(passwordStrength)}`}>
                    {getPasswordStrengthText(passwordStrength)}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <span>🔐</span>
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl bg-white/90 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all duration-300 focus:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="Nhập lại mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xl hover:bg-purple-50 p-1 rounded-lg transition-colors disabled:opacity-60"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                  <span>⚠️</span>
                  Mật khẩu không khớp
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2 animate-shake">
                <span>⚠️</span>
                {error}
              </div>
            )}

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 py-2">
              <input
                type="checkbox"
                required
                disabled={isLoading}
                className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
              />
              <label className="text-sm text-gray-600 leading-relaxed">
                Tôi đồng ý với{' '}
                <Link href="/terms" className="text-purple-600 font-semibold hover:underline">
                  Điều khoản sử dụng
                </Link>
                {' '}và{' '}
                <Link href="/privacy" className="text-purple-600 font-semibold hover:underline">
                  Chính sách bảo mật
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-green-700 focus:ring-4 focus:ring-purple-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-lg"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang tạo tài khoản...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Tạo tài khoản
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Đã có tài khoản?{' '}
              <Link 
                href="/auth/login" 
                className="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition-colors"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
