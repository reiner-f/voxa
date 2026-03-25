import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Globe, LogOut, User } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import TextLogo from "./TextLogo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/education", label: t("nav.education") },
    { path: "/team", label: t("nav.team") },
    { path: "/student/join", label: t("nav.students") },
    { path: user ? "/teacher/dashboard" : "/teacher/login", label: t("nav.teachers") }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      id="vox-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-surface-400/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-[2400px] mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
            <div className="flex items-center justify-between h-20">
              <Link to="/">
                <TextLogo size="md" showSubtitle={!isOpen} />
              </Link>

              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-lg font-extralight transition-colors relative ${
                      isActive(link.path)
                        ? "text-gold-400"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-400"
                      />
                    )}
                  </Link>
                ))}
              </div>

              <div className="hidden lg:flex items-center gap-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-300/50 hover:bg-surface-300 transition-colors text-lg font-extralight"
                >
                  <Globe className="w-5 h-5" />
                  <span>{language.toUpperCase()}</span>
                </button>

                {user ? (
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-extralight text-white/70">{user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-red-400"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/teacher/login"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-royal-700 to-royal-600 hover:from-royal-600 hover:to-royal-500 transition-all text-white text-lg font-extralight"
                  >
                    <User className="w-5 h-5" />
                    {t("nav.login")}
                  </Link>
                )}
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-white"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface-400/95 backdrop-blur-lg border-t border-white/10"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg font-extralight py-2 transition-colors ${
                    isActive(link.path) ? "text-gold-400" : "text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-surface-300/50 text-lg font-extralight"
                >
                  <Globe className="w-5 h-5" />
                  <span>{language === "ro" ? "Română" : "Français"}</span>
                </button>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500/20 text-red-400 text-lg font-extralight"
                  >
                    <LogOut className="w-5 h-5" />
                    {language === "ro" ? "Deconectare" : "Déconnexion"}
                  </button>
                ) : (
                  <Link
                    to="/teacher/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-royal-700 text-white text-lg font-extralight"
                  >
                    <User className="w-5 h-5" />
                    {t("nav.login")}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
