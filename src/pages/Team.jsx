import React from "react";
import { motion } from "motion/react";
import { Award, Users, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BrandWatermark from "../components/BrandWatermark";
import { useLanguage } from "../context/LanguageContext";

export default function Team() {
  const { t, language } = useLanguage();

  const coordinator = {
    name: "Prof. Mangîr Gabriela",
    role: t("team.coordinator"),
    description: language === "ro"
      ? "Profesor de limba franceză la Colegiul Național A.T. Laurian, Botoșani. Inițiatoare și coordonatoare a proiectului Vox Jeunesse, dedicată educației civice și formării tinerilor cetățeni europeni."
      : "Professeur de langue française au Collège National A.T. Laurian, Botoșani. Initiatrice et coordinatrice du projet Vox Jeunesse, dédiée à l'éducation civique et à la formation de jeunes citoyens européens.",
    image: "https://static.monitorulbt.ro/wp-content/uploads/2021/05/gabriela-mangir-600x599.jpg"
  };

  const students = [
    {
      name: "Purice Laura-Alexandra",
      role: t("team.studentCoordinator"),
      description: language === "ro"
        ? "Elevă în clasa a X-a bilingvă la Colegiul Național A.T. Laurian, Botoșani. Coordonatoare activă a proiectului Vox Jeunesse."
        : "Élève en Xe classe bilingue au Collège National A.T. Laurian, Botoșani. Coordinatrice active du projet Vox Jeunesse.",
      avatar: "https://content-studio.biela.dev/cover/800x800/i/content-studio/69a93cd1ff67122f13bc88db/1774298437671-69a93cd1ff67122f13bc88db/1774340015463-476f41f3.jpeg/purice-laura-alexandra-student-coordinator.webp"
    },
    {
      name: "Cazacincu Bianca-Maria",
      role: t("team.studentCoordinator"),
      description: language === "ro"
        ? "Elevă la Colegiul Național A.T. Laurian, Botoșani. Coordonatoare activă a proiectului Vox Jeunesse."
        : "Élève au Collège National A.T. Laurian, Botoșani. Coordinatrice active du projet Vox Jeunesse.",
      avatar: "https://content-studio.biela.dev/cover/800x800/i/content-studio/69a93cd1ff67122f13bc88db/1774298437671-69a93cd1ff67122f13bc88db/1774340102757-7600936c.jpeg/cazacincu-bianca-maria-student-coordinator.webp"
    },
    {
      name: "Humelnicu Alexandru-Constantin",
      role: t("team.studentCoordinator"),
      description: language === "ro"
        ? "Elev la Colegiul Național A.T. Laurian, Botoșani. Coordonator activ al proiectului Vox Jeunesse."
        : "Élève au Collège National A.T. Laurian, Botoșani. Coordinateur actif du projet Vox Jeunesse.",
      avatar: "https://content-studio.biela.dev/cover/800x800/i/content-studio/69a93cd1ff67122f13bc88db/1774298437671-69a93cd1ff67122f13bc88db/1774340208346-df6d5b27.png/humelnicu-alexandru-constantin-student-coordinator.webp"
    }
  ];

  return (
    <div id="team-page" className="min-h-screen bg-surface-500 relative">
      <BrandWatermark size="lg" position="top-right" />
      <Navbar />

      <section id="team-hero" className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-royal-700/10 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-gold-500/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="max-w-[2400px] mx-auto relative z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/20 text-gold-400 text-lg font-extralight mb-6">
                  <Users className="w-5 h-5" />
                  {language === "ro" ? "Proiect Vox Jeunesse" : "Projet Vox Jeunesse"}
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">
                  {t("team.title")}
                </h1>
                <p className="text-xl font-extralight text-white/60 max-w-2xl mx-auto">
                  {t("team.subtitle")}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="team-coordinator" className="py-16">
        <div className="max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-surface-400/80 to-surface-300/50 rounded-md border border-gold-400/20 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 overflow-hidden">
                    <img
                      src={coordinator.image}
                      alt={coordinator.name}
                      className="w-full h-full object-cover min-h-[300px]"
                    />
                  </div>
                  <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-6 h-6 text-gold-400" />
                      <span className="text-lg font-extralight text-gold-400 uppercase tracking-wider">
                        {coordinator.role}
                      </span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-medium text-white mb-6">
                      {coordinator.name}
                    </h2>
                    <p className="text-xl font-extralight text-white/70 leading-relaxed">
                      {coordinator.description}
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      <span className="px-4 py-2 rounded-full bg-royal-700/30 text-royal-300 text-lg font-extralight">
                        C.N. A.T. Laurian, Botoșani
                      </span>
                      <span className="px-4 py-2 rounded-full bg-gold-500/20 text-gold-400 text-lg font-extralight">
                        {language === "ro" ? "Limba Franceză" : "Langue Française"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="team-students" className="py-16">
        <div className="max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-display text-2xl font-medium text-white mb-8 flex items-center gap-3"
              >
                <Star className="w-6 h-6 text-gold-400" />
                {language === "ro" ? "Elevii Coordonatori" : "Élèves Coordinateurs"}
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {students.map((student, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    whileHover={{ y: -8 }}
                    className="bg-surface-400/50 rounded-md border border-white/10 hover:border-royal-600/50 transition-all overflow-hidden h-full flex flex-col"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-lg font-extralight text-gold-400 mb-2">
                        {student.role}
                      </span>
                      <h4 className="font-display text-xl font-medium text-white mb-3">
                        {student.name}
                      </h4>
                      <p className="text-lg font-extralight text-white/60 leading-relaxed flex-1">
                        {student.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
