"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const projects = [
  {
    image: "/assets/Home_Products/villaprojects.png",
    title: "VILLA PROJECT",
    tags: ["LPG Pipeline System"],
    link: "/projects/villa-project",
  },
  {
    image: "/assets/Home_Products/hospital.png",
    title: "ABC HOSPITAL",
    tags: ["Laboratory", "GAS  System"],
    link: "/projects/abc-hospital",
  },
  {
    image: "/assets/Home_Products/restaurant.png",
    title: "RESTURENT",
    tags: ["Central Gas System"],
    link: "/projects/restaurant",
  },
  {
    image: "/assets/Home_Products/xyz hospital.png",
    title: "XYZ HOSPITAL",
    tags: ["Medical Gas System"],
    link: "/projects/xyz-hospital",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ProductsSection() {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            className="font-roboto font-semibold text-[#72D210] uppercase tracking-widest text-xs md:text-sm mb-2 block"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            Our Products
          </motion.span>

          <div className="relative inline-block">
            <motion.h2
              className="font-roboto font-extrabold text-[#041B3A] text-2xl sm:text-3xl md:text-4xl tracking-wide uppercase"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Quality Work. Proven Results.
            </motion.h2>
            {/* Sliding green underline */}
            <motion.div
              className="h-[3px] bg-gradient-to-r from-[#72D210] to-[#4E9208] rounded-full mt-2 mx-auto"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              style={{ originX: 0.5 }}
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative overflow-hidden bg-white rounded-lg border border-gray-200
                         shadow-sm hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            >
              {/* Image container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#041B3A]/60 via-transparent to-transparent
                                opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Green accent bar on top */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#72D210] to-[#4E9208] z-10"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.35 }}
                  style={{ originX: 0 }}
                />
              </div>

              {/* Card body */}
              <div className="p-3 sm:p-4 text-center">
                <h3 className="font-roboto font-bold text-[#041B3A] text-base sm:text-sm uppercase tracking-wide mb-1">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-1 justify-center">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-roboto text-[14px] sm:text-xs text-[#011540]"
                    >
                      {tag}
                      {i < project.tags.length - 1 && (
                        <span className="ml-1 text-gray-300">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center mt-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/projects"
              className="font-roboto font-semibold text-[#041B3A] border border-[#041B3A]
                         px-8 py-3 text-sm uppercase tracking-widest
                         inline-flex items-center gap-2 group
                         hover:bg-[#041B3A] hover:text-white
                         transition-all duration-300 rounded-sm"
            >
              <span>View All Projects</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
