export interface ServiceSolution {
  number: string;
  title: string;
  desc: string;
  image: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  breadcrumb: string;
  description: string;
  bannerImage: string;
  
  // Section 2 Details Layout Data
  detailsLabel: string;
  detailsHeading: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3?: string;
  callout: {
    icon: string;
    title: string;
    body: string;
  };
  features: Array<{
    icon: string;
    title: string;
    desc: string;
  }>;

  // Section 3 Core Solutions Layout Data
  solutionsLabel?: string;
  solutionsHeading?: string;
  solutionsSubheading?: string;
  solutions?: ServiceSolution[];
}

export const SERVICES_DATA: Record<string, ServiceData> = {
  "lpg": {
    slug: "lpg-sng-system",
    title: "GAS SYSTEMS FOR EVERY ENVIRONMENT.",
    subtitle: "LPG/SNG System",
    breadcrumb: "LPG SYSTEMS",
    description: "From concept drawings to commissioned systems — ENEGIX engineers, installs, certifies and maintains the gas networks that keep critical facilities running.",
    bannerImage: "/assets/Service/lpg/Lpg_system_banner.png",
    
    // Details
    detailsLabel: "SERVICE",
    detailsHeading: "LPG SYSTEMS",
    paragraph1: "Enegix Gas is the right choice for commissioning and installing your LPG pipework. We undertake pipework installations and modifications for industrial/commercial establishments. You can trust our commercial skilled engineers and state-of-the-art equipment to ensure that no matter the project, your systems will be back to full functionality in no time.",
    paragraph2: "From bulk storage units to off grid businesses. Our gas engineers can provide turnkey solutions for clients. From Pipe sizing, underground LPG Installations, testing and purging. Our qualified engineers can produce high quality installations at affordable prices.",
    callout: {
      icon: "/assets/Home_Service/experience.png",
      title: "From bulk storage units to off grid businesses",
      body: "Our gas engineers can provide turnkey solutions for clients. From Pipe sizing, underground LPG Installations, testing and purging. Our qualified engineers can produce high quality installations at affordable prices."
    },
    features: [
      {
        icon: "/assets/Home_Service/safety.png",
        title: "Safety First",
        desc: "All installations comply with international safety standards and local regulations"
      },
      {
        icon: "/assets/Home_Service/mdi_worker-outline.png",
        title: "Skilled Engineers",
        desc: "Our commercial gas engineers bring expertise and precision to every project."
      },
      {
        icon: "/assets/Home_Banner/workinghours.png",
        title: "Advanced Equipment",
        desc: "State-of-the-art tools and technology ensure reliable and efficient installations."
      },
      {
        icon: "/assets/Home_Banner/ontimeDelivery.png",
        title: "Quick Turnaround",
        desc: "We ensure minimum downtime and fast project completion without compromising safety."
      }
    ],

    // Core Solutions Section
    solutionsLabel: "CORE SOLUTIONS",
    solutionsHeading: "COMPLETE LPG SYSTEM SOLUTIONS",
    solutionsSubheading: "Four non-negotiables that shape how we plan, build, and maintain every system.",
    solutions: [
      {
        number: "01",
        title: "GAS STORAGE TANK",
        desc: "Supply and installation of high-quality LPG storage tanks with complete safety accessories and reliability.",
        image: "/assets/Service/lpg/1.png"
      },
      {
        number: "02",
        title: "PRESSURE REDUCING & DISTRIBUTION PANEL(PRDP)",
        desc: "Efficient pressure regulation and safe distribution of gas to downstream systems.",
        image: "/assets/Service/lpg/2.png"
      },
      {
        number: "03",
        title: "GAS LEAK DETECTION SYSTEM",
        desc: "Advanced gas leak detection systems for early warning and enhanced safety.",
        image: "/assets/Service/lpg/3.png"
      },
      {
        number: "04",
        title: "GAS VAPORISER",
        desc: "High performance vaporisers for efficient conversion of liquid LPG to gas.",
        image: "/assets/Service/lpg/4.jpeg"
      },
      {
        number: "05",
        title: "PRESSURE REDUCING & METERING STATION(PRMS)",
        desc: "Accurate pressure reduction and metering for safe and consistent gas supply",
        image: "/assets/Service/lpg/5.png"
      }
    ]
  },
  "medical-gas-system": {
    slug: "medical-gas-system",
    title: "Safe & Reliable Medical Gas Systems.",
    subtitle: "Medical Gas System",
    breadcrumb: "MEDICAL GAS SYSTEMS",
    description: "Engineered medical gas systems for hospitals, clinics, laboratories, and critical healthcare environments.",
    bannerImage: "/assets/Service/medical/banner.png",

    // Details
    detailsLabel: "SERVICE",
    detailsHeading: "Precision Medical Gas Solutions for Modern Healthcare",
    paragraph1: "Enegix Gas delivers complete medical gas pipeline solutions tailored for healthcare environments where reliability, hygiene, and safety are critical.",
    paragraph2: "Our experienced engineering team handles the design, installation, testing, commissioning, and maintenance of centralized medical gas systems in accordance with HTM, NFPA, and international healthcare standards.",
    paragraph3:"From intensive care units and operating theatres to laboratories and emergency departments, we provide turnkey medical gas solutions that ensure safe and continuous gas delivery across every critical area.",
    callout: {
      icon: "/assets/Home_Service/experience.png",
      title: "Reliable infrastructure for life-critical environments",
      body: "Our systems are engineered for uninterrupted performance, infection control compliance, and long-term operational safety in healthcare facilities."
    },
    features: [
      {
        icon: "/assets/Home_Service/safety.png",
        title: "HTM/NFPA ",
        desc: "Built to international healthcare safety standards."
      },
      {
        icon: "/assets/Home_Service/mdi_worker-outline.png",
        title: "Expert Engineering",
        desc: "Expert solutions for hospital-grade gas systems."
      },
      {
        icon: "/assets/Home_Banner/workinghours.png",
        title: "Monitoring & Safety",
        desc: "Advanced alarms and leak detection systems."
      },
      {
        icon: "/assets/Home_Banner/ontimeDelivery.png",
        title: "Turnkey Execution",
        desc: "Complete design, installation, and maintenance solutions."
      }
    ],

    // Core Solutions Section
    solutionsLabel: "CORE SOLUTIONS",
    solutionsHeading: "COMPLETE MEDICAL GAS SYSTEM SOLUTIONS",
    solutionsSubheading: "Precision-engineered medical gas systems matching strict health standards.",
    solutions: [
      {
        number: "01",
        title: "Medical gas & pipeline distribution system",
        desc: "Centralized medical gas pipeline systems ensuring safe, reliable, continuous gas delivery with optimal purity and pressure.",
        image: "/assets/Service/medical/1.png"
      },
      {
        number: "02",
        title: "Medical Vacuum System ",
        desc: "Reliable vacuum systems designed for surgical procedures, patient suction, and critical medical applications.",
        image: "/assets/Service/medical/2.png"
      },
      {
        number: "03",
        title: "Medical gas outlets",
        desc: "High-quality, color-coded outlets for safe and convenient access to medical gases at the point of use.",
        image: "/assets/Service/medical/3.png"
      },
      {
        number: "04",
        title: "Medical air system",
        desc: "Clean and continuous medical-grade compressed air system engineered to meet healthcare standards.",
        image: "/assets/Service/medical/4.jpeg"
      },
      {
        number: "05",
        title: "Medical gas manifold system",
        desc: "Automatic changeover manifold system to ensure uninterrupted supply of medical gases from multiple cylinders.",
        image: "/assets/Service/medical/5.png"
      }
    ]
  },
  "laboratory-turnkey-solutions": {
    slug: "laboratory-turnkey-solutions",
    title: "ENGINEERED LABORATORY ENVIRONMENTS.",
    subtitle: "Laboratory Turnkey Solutions",
    breadcrumb: "LABORATORY TURNKEY SOLUTIONS",
    description: "End-to-end gas room, manifold, reticulation, and laboratory infrastructure systems for research, educational, and industrial laboratories.",
    bannerImage: "/assets/Service/laboratory/Laboratory_banner.png",

    // Details
    detailsLabel: "SERVICE",
    detailsHeading: "Advanced Laboratory Infrastructure Solutions",
    paragraph1: "Enegix Gas specializes in delivering complete turnkey laboratory solutions tailored for research facilities, universities, healthcare institutions, industrial laboratories, and testing environments.",
    paragraph2: "Our expertise covers laboratory gas systems, gas manifold rooms, reticulation networks, ventilation systems, utility services, and laboratory infrastructure — all engineered to meet international safety and operational standards.",
    paragraph3:"From concept planning and engineering design to installation, commissioning, and maintenance, we provide fully integrated laboratory environments optimized for performance, safety, and future scalability.",
    callout: {
      icon: "/assets/Home_Service/experience.png",
      title: "Reliable infrastructure for modern laboratories",
      body: "Engineered laboratory environments with precision gas delivery, safe utility integration, and long-term operational reliability."
    },
    features: [
      {
        icon: "/assets/Home_Service/safety.png",
        title: "Safety First",
        desc: "Integrated gas leak detection, automatic shutoff valves, and purge panels."
      },
      {
        icon: "/assets/Home_Service/mdi_worker-outline.png",
        title: "Skilled Engineers",
        desc: "Trained ultra-high purity gas system designers and welders."
      },
      {
        icon: "/assets/Home_Banner/workinghours.png",
        title: "Advanced Equipment",
        desc: "Orbital welding systems and cleanroom assembly procedures."
      },
      {
        icon: "/assets/Home_Banner/ontimeDelivery.png",
        title: "Quick Turnaround",
        desc: "Seamless coordination with laboratory furniture and utility interfaces."
      }
    ],

    // Core Solutions Section
    solutionsLabel: "CORE SOLUTIONS",
solutionsHeading: "COMPLETE LABORATORY TURNKEY SOLUTIONS",
solutionsSubheading:
  "Integrated systems designed for safe, efficient, and high-performance laboratory operations.",

solutions: [
  {
    number: "01",
    title: "LABORATORY GAS SYSTEMS (HIGH-PURITY & SPECIALTY GASES)",
    desc: "Pure gas delivery systems built for research, testing, and innovation.",
    image: "/assets/Service/laboratory/1.png"
  },
  {
    number: "02",
    title: "HIGH-PURITY GAS PURIFICATION SYSTEMS",
    desc: "Automatic manifold systems ensuring uninterrupted gas supply for laboratory applications.",
    image: "/assets/Service/laboratory/2.png"
  },
  {
    number: "03",
    title: "GAS BOOSTER & PRESSURE INTENSIFIER SYSTEMS",
    desc: "Precision gas reticulation and distribution networks engineered for reliability and purity.",
    image: "/assets/Service/laboratory/3.png"
  },
  {
    number: "04",
    title: "VENTILATION & EXHAUST SYSTEM",
    desc: "Safe airflow, fume extraction, and ventilation systems designed for laboratory environments.",
    image: "/assets/Service/laboratory/4.jpeg"
  },
  {
    number: "05",
    title: "LABORATORY FURNITURE & FIXTURES",
    desc: "Custom laboratory benches, workstations, storage systems, and utility-integrated furniture solutions.",
    image: "/assets/Service/laboratory/5.png"
  }
]
  },
  "fuel-oil-system": {
    slug: "fuel-oil-system",
    title: "SAFE & EFFICIENT FUEL OIL SYSTEMS.",
    subtitle: "Fuel Oil System",
    breadcrumb: "FUEL OIL SYSTEMS",
    description: "Engineered fuel storage, transfer, and distribution systems for industrial, commercial, and critical infrastructure facilities.",
    bannerImage: "/assets/Service/fuel_oil/banner1.png",

    // Details
    detailsLabel: "SERVICE",
    detailsHeading: "Reliable Fuel Oil Infrastructure Solutions",
    paragraph1: "Enegix Gas provides complete fuel oil system solutions for industrial facilities, commercial buildings, power generation plants, and critical infrastructure environments.",
    paragraph2: "Our expertise includes fuel storage tanks, day tanks, pump skid systems, fuel transfer piping, and automated distribution networks engineered for safe, efficient, and uninterrupted fuel supply.",
    paragraph3:"From system design and installation to testing, commissioning, and maintenance, we deliver turnkey fuel oil solutions tailored to operational requirements and international safety standards.",
    callout: {
      icon: "/assets/Home_Service/experience.png",
      title: "Uninterrupted backup power fuel infrastructure",
      body: "Engineering duplex fuel pumps, day tanks, and double-walled piping to feed critical emergency generators. Ensuring 99.999% uptime for facilities when they need it most."
    },
    features: [
      {
        icon: "/assets/Home_Service/safety.png",
        title: "Safety First",
        desc: "Bunded tanks, overfill prevention, and active interstitial leak monitoring."
      },
      {
        icon: "/assets/Home_Service/mdi_worker-outline.png",
        title: "Skilled Engineers",
        desc: "Experienced petroleum and fuel systems engineers."
      },
      {
        icon: "/assets/Home_Banner/workinghours.png",
        title: "Advanced Equipment",
        desc: "Duplex fuel transfer pumps, smart fuel polishing systems, and PLCs."
      },
      {
        icon: "/assets/Home_Banner/ontimeDelivery.png",
        title: "Quick Turnaround",
        desc: "On-schedule fuel loop deployments with civil defense approval."
      }
    ],

    // Core Solutions Section
   solutionsLabel: "CORE SOLUTIONS",
solutionsHeading: "COMPLETE FUEL OIL SYSTEM SOLUTIONS",
solutionsSubheading:
  "Integrated fuel oil infrastructure engineered for reliable fuel storage and distribution.",
solutions: [
  {
    number: "01",
    title: "DIESEL STORAGE TANKS",
    desc: "Bulk storage tanks and day tanks designed for safe and efficient fuel storage applications.",
    image: "/assets/Service/fuel_oil/solution1.png"
  },
  {
    number: "02",
    title: "PUMP SKID SYSTEMS",
    desc: "High-performance fuel transfer pump skids engineered for reliable fuel circulation and delivery.",
    image: "/assets/Service/fuel_oil/solution2.png"
  },
  {
    number: "03",
    title: "FUEL DISTRIBUTION PIPING NETWORK",
    desc: "Durable fuel piping systems designed for safe, continuous, and leak-free fuel distribution.",
    image: "/assets/Service/fuel_oil/solution3.png"
  },
  {
    number: "04",
    title: "FUEL TRANSFER SYSTEM",
    desc: "Automated fuel transfer systems ensuring uninterrupted fuel supply between storage and operational units.",
    image: "/assets/Service/fuel_oil/4.jpeg"
  },
  {
    number: "05",
    title: "FUEL MONITORING & CONTROL SYSTEM",
    desc: "Integrated monitoring panels and control systems for fuel level management and operational safety.",
    image: "/assets/Service/fuel_oil/solution5.png"
  }
]
  },
  "maintenance-amc": {
    slug: "maintenance-amc",
    title: "RELIABLE MAINTENANCE& AMC SERVICES.",
    subtitle: "Maintenance & AMC",
    breadcrumb: "MAINTENANCE & AMC",
    description: "Preventive and corrective maintenance contracts with audit-ready documentation for gas systems and critical infrastructure.",
    bannerImage: "/assets/Service/maintentance/Maintenance_banner.png",

    // Details
    detailsLabel: "SERVICE",
    detailsHeading: "Complete Maintenance Solutions for Critical Gas Systems",
    paragraph1: "Enegix Gas provides professional preventive and corrective maintenance services for LPG, medical gas, laboratory gas, and industrial gas systems across healthcare, research, commercial, and industrial facilities.",
    paragraph2: "Our AMC programs are tailored to maximize system uptime, improve operational safety, and ensure compliance with regulatory and audit requirements.",
    paragraph3:"From scheduled inspections and emergency breakdown support to testing, calibration, and documentation, our experienced technical team delivers dependable maintenance solutions for mission-critical environments.",
    callout: {
      icon: "/assets/Home_Service/experience.png",
      title: "Reliable support for uninterrupted operations",
      body: "Planned maintenance, rapid response support, and compliance-focused servicing for critical gas infrastructure."
    },
    features: [
      {
        icon: "/assets/Home_Service/safety.png",
        title: "Safety First",
        desc: "Comprehensive leak detection testing and safety shut-off validation."
      },
      {
        icon: "/assets/Home_Service/mdi_worker-outline.png",
        title: "Skilled Engineers",
        desc: "Highly qualified technicians specializing in gas maintenance."
      },
      {
        icon: "/assets/Home_Banner/workinghours.png",
        title: "Advanced Equipment",
        desc: "Calibrated pressure gauges, digital leak detectors, and calibration gas."
      },
      {
        icon: "/assets/Home_Banner/ontimeDelivery.png",
        title: "Quick Turnaround",
        desc: "Prompt SLA response for scheduled reviews and documentation prep."
      }
    ],

    // Core Solutions Section
   solutionsLabel: "CORE SOLUTIONS",
solutionsHeading: "COMPLETE MAINTENANCE & AMC SOLUTION",
solutionsSubheading:
  "Comprehensive maintenance services designed for long-term system reliability and operational safety.",
solutions: [
  {
    number: "01",
    title: "PREVENTIVE MAINTENANCE",
    desc: "Routine inspections and scheduled servicing to minimize downtime and extend equipment life.",
    image: "/assets/Service/maintentance/solution1.png"
  },
  {
    number: "02",
    title: "CORRECTIVE MAINTENANCE",
    desc: "Rapid fault diagnosis and repair services for uninterrupted system operation.",
    image: "/assets/Service/maintentance/solution2.png"
  },
  {
    number: "03",
    title: "SYSTEM TESTING & CALIBRATION",
    desc: "Performance testing, pressure verification, and calibration of gas systems and safety devices.",
    image: "/assets/Service/maintentance/solution3.png"
  },
  {
    number: "04",
    title: "LEAK DETECTION & SAFETY AUDIT",
    desc: "Comprehensive leak detection and safety inspections to maintain compliance and operational safety.",
    image: "/assets/Service/maintentance/4.jpeg"
  },
  {
    number: "05",
    title: "EMERGENCY BREAKDOWN SUPPORT",
    desc: "24/7 technical support and emergency response services for critical gas infrastructure.",
    image: "/assets/Service/maintentance/solution5.png"
  }
]
  },
  "emergency-gas-services": {
    slug: "emergency-gas-services",
    title: "RAPID 24/7 GAS EMERGENCY RESPONSE.",
    subtitle: "Emergency Gas Services",
    breadcrumb: "EMERGENCY SERVICES",
    description: "ENEGIX standby response teams isolate gas leaks, repair pressure regulators, and restore safe operations under a strict 2-hour SLA.",
    bannerImage: "/assets/Service/emergency/Emergency_support_banner.png",

    // Details
    detailsLabel: "SERVICE",
    detailsHeading: "EMERGENCY SERVICES",
    paragraph1: "ENEGIX standby emergency response teams isolate gas leaks, repair pressure regulators, and restore safe operations under a strict 2-hour Service Level Agreement (SLA).",
    paragraph2: "Our emergency services are active 24/7, providing immediate mobilization of skilled gas engineers equipped with portable leak detectors, isolation tools, and replacement regulators.",
    callout: {
      icon: "/assets/Home_Service/experience.png",
      title: "24/7 Gas leak isolation & emergency repairs",
      body: "Providing immediate response teams to isolate hazardous gas leaks and replace failed safety hardware, protecting lives and properties under strict response SLAs."
    },
    features: [
      {
        icon: "/assets/Home_Service/safety.png",
        title: "Safety First",
        desc: "Rapid gas isolation, air monitoring, and immediate safety venting."
      },
      {
        icon: "/assets/Home_Service/mdi_worker-outline.png",
        title: "Skilled Engineers",
        desc: "First-responder certified gas safety engineers."
      },
      {
        icon: "/assets/Home_Banner/workinghours.png",
        title: "Advanced Equipment",
        desc: "Ex-proof gas sniffers, emergency pipe clamps, and hot-work gear."
      },
      {
        icon: "/assets/Home_Banner/ontimeDelivery.png",
        title: "Quick Turnaround",
        desc: "Guaranteed mobilization within the SLA window to resolve emergency issues."
      }
    ],

    // Core Solutions Section
   solutionsLabel: "CORE SOLUTIONS",
solutionsHeading: "COMPLETE EMERGENCY GAS SERVICES",
solutionsSubheading:
  "Specialized emergency support solutions for critical gas infrastructure and operational continuity.",
solutions: [
  {
    number: "01",
    title: "EMERGENCY LEAK DETECTION",
    desc: "Rapid gas leak identification using advanced testing and detection equipment.",
    image: "/assets/Service/emergency/solution1.png"
  },
  {
    number: "02",
    title: "PIPELINE REPAIR SERVICES",
    desc: "Emergency repair and replacement of damaged gas pipelines and fittings.",
    image: "/assets/Service/emergency/solution2.png"
  },
  {
    number: "03",
    title: "PRESSURE FAILURE RESPONSE",
    desc: "Immediate troubleshooting and correction of gas pressure and supply failures.",
    image: "/assets/Service/emergency/solution3.png"
  },
  {
    number: "04",
    title: "EMERGENCY MANIFOLD SUPPORT",
    desc: "Rapid response services for manifold system failures and gas supply interruptions.",
    image: "/assets/Service/emergency/solution4.png"
  },
  {
    number: "05",
    title: "SAFETY INSPECTION & RESTART",
    desc: "Rapid response services for manifold system failures and gas supply interruptions.",
    image: "/assets/Service/emergency/solution5.png"
  }
]
  }
};
