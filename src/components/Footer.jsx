import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import BrandWatermark from "./BrandWatermark";
import TextLogo from "./TextLogo";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="vox-footer" className="bg-surface-600 border-t border-white/10 relative overflow-hidden">
      <BrandWatermark size="md" position="bottom-right" />
      <div className="max-w-[2400px] mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-1">
                <Link to="/" className="inline-block mb-6">
                  <TextLogo size="md" />
                </Link>
                <p className="text-lg font-extralight text-white/60 leading-relaxed">
                  {t("footer.description")}
                </p>
              </div>

              <div>
                <h4 className="font-display font-medium text-lg text-white mb-6">
                  {t("footer.links")}
                </h4>
                <ul className="space-y-4">
                  <li>
                    <Link to="/" className="text-lg font-extralight text-white/60 hover:text-gold-400 transition-colors">
                      {t("nav.home")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/education" className="text-lg font-extralight text-white/60 hover:text-gold-400 transition-colors">
                      {t("nav.education")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/team" className="text-lg font-extralight text-white/60 hover:text-gold-400 transition-colors">
                      {t("nav.team")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/student/join" className="text-lg font-extralight text-white/60 hover:text-gold-400 transition-colors">
                      {t("nav.students")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-display font-medium text-lg text-white mb-6">
                  {t("footer.contact")}
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-lg font-extralight text-white/60">
                    <Mail className="w-5 h-5 text-gold-400" />
                    secretariat@laurian.ro
                  </li>
                  <li className="flex items-center gap-3 text-lg font-extralight text-white/60">
                    <MapPin className="w-5 h-5 text-gold-400" />
                    Str. Nicolae Iorga, nr. 19, Botoșani, 710200
                  </li>
                  <li className="flex items-center gap-3 text-lg font-extralight text-white/60">
                    <Phone className="w-5 h-5 text-gold-400" />
                    0231 512 885
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-display font-medium text-lg text-white mb-6">
                  {t("footer.legal")}
                </h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="text-lg font-extralight text-white/60 hover:text-gold-400 transition-colors">
                      {t("footer.privacy")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-lg font-extralight text-white/60 hover:text-gold-400 transition-colors">
                      {t("footer.terms")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-lg font-extralight text-white/40">
                {t("footer.coordinator")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 bg-surface-700">
        <div className="max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 py-4">
              <p className="text-center text-lg font-extralight text-white/30">
                AI vibe coded development by{" "}
                <a
                  href="https://biela.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400/60 hover:text-gold-400 transition-colors"
                >
                  Biela.dev
                </a>
                , powered by{" "}
                <a
                  href="https://teachmecode.ae/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400/60 hover:text-gold-400 transition-colors"
                >
                  TeachMeCode® Institute
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
