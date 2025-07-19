const products = {
  "fladecort-6": {
    name: "Fladecort 6",
    tagline: "Potent glucocorticoid for inflammation & autoimmunity.",
    description: "Fladecort 6 is a powerful steroid used to treat a wide range of inflammatory and autoimmune disorders effectively.",
    category: "Steroid Therapy",
    images: ["product1.png"],
    features: [
      "Fast-acting anti-inflammatory effects",
      "Used in autoimmune diseases",
      "Reduces allergic responses",
      "Improves quality of life in chronic conditions"
    ],
    composition: "Deflazacort 6mg",
    indications: [
      "Rheumatoid arthritis",
      "Asthma & severe allergies",
      "Autoimmune disorders",
      "Post-transplant immune suppression"
    ],
    tips: [
      "Take after meals.",
      "Taper slowly under doctor guidance.",
      "Avoid abrupt discontinuation."
    ]
  },

  "linzocast-600": {
    name: "Linzocast 600",
    tagline: "Linezolid antibiotic for resistant bacterial infections.",
    description: "Linzocast 600 is used for treating multi-drug resistant infections like MRSA and VRE.",
    category: "Antibiotics",
    images: ["product2.png"],
    features: [
      "Effective against MRSA & VRE",
      "Good tissue penetration",
      "Used for skin and lung infections",
      "Oral & IV formulations available"
    ],
    composition: "Linezolid 600mg",
    indications: [
      "MRSA infections",
      "Pneumonia (nosocomial/community)",
      "Diabetic foot ulcers",
      "Skin & soft tissue infections"
    ],
    tips: [
      "Complete full course.",
      "Avoid tyramine-rich foods.",
      "Monitor CBC if long-term."
    ]
  },

  "livofolate": {
    name: "Livofolate",
    tagline: "Vitamin B-complex & Omega 3 formula.",
    description: "Livofolate supports nerve, brain, and cardiovascular health with a blend of B-vitamins and Omega-3 fatty acids.",
    category: "Neurology",
    images: ["product3.png"],
    features: [
      "Supports cognitive function",
      "Maintains nerve & heart health",
      "Rich in L-methylfolate & B12",
      "Omega-3 for memory & focus"
    ],
    composition: "L-methylfolate (800mcg), Methylcobalamin (1500mcg), EPA/DHA, B6",
    indications: [
      "Neural tube defects",
      "Neuropathy",
      "Brain fog",
      "Vitamin B12 deficiency"
    ],
    tips: [
      "Take with food.",
      "Ideal for long-term nerve care.",
      "Do not exceed recommended dose."
    ]
  },

  "livozorb-xt": {
    name: "Livozorb XT Syp",
    tagline: "Iron supplement syrup for anemia.",
    description: "A highly bioavailable iron syrup suitable for kids and adults, ensuring faster recovery from iron deficiency.",
    category: "Hematology",
    images: ["product4.png"],
    features: [
      "Iron + Folic Acid combo",
      "High absorption rate",
      "Gentle on the stomach",
      "Boosts hemoglobin"
    ],
    composition: "Ferrous Ascorbate, Folic Acid, Zinc, Vitamin B12",
    indications: [
      "Iron-deficiency anemia",
      "Fatigue in pregnancy",
      "Pediatric iron support",
      "Menstrual blood loss"
    ],
    tips: [
      "Take on empty stomach if possible.",
      "Avoid tea/coffee after dose.",
      "Use vitamin C for better absorption."
    ]
  },

  "luxbone": {
    name: "Luxbone",
    tagline: "A premium, comprehensive formula for strong, healthy bones.",
    description: "Luxbone is more than just calcium. It provides all key nutrients for the complete bone-building cycle.",
    category: "Bone Health Supplement",
    images: ["luxbone.png"],
    features: [
      "Complete 7-ingredient bone formula",
      "Includes Vitamin D (Calcitriol) & K2-7",
      "Contains B-Vitamins for nerve support",
      "Optimal calcium deposition"
    ],
    composition: "Calcitriol (0.25mcg), Calcium Carbonate (1250mg), Magnesium (50mg), Zinc (7.5mg), L-methylfolate (800mcg), Methylcobalamin (1500mcg), Vitamin K2-7 (45mcg).",
    indications: [
      "Osteoporosis & Osteopenia",
      "Bone health and density maintenance",
      "Support during fracture healing",
      "Adjuvant in chronic conditions"
    ],
    tips: [
      "Take as directed by physician.",
      "Superior for long-term bone health.",
      "Consistency is key."
    ]
  },

  "nutrabone": {
    name: "Nutrabone",
    tagline: "Bone strength and density support.",
    description: "Nutrabone provides essential minerals and vitamins that support skeletal health and calcium absorption.",
    category: "Bone Health",
    images: ["product2.png"],
    features: [
      "High dose calcium citrate",
      "Vitamin D3 enriched",
      "Reduces bone loss",
      "Supports elderly bone health"
    ],
    composition: "Calcium Citrate (1000mg), Vitamin D3 (800 IU), Magnesium, Zinc",
    indications: [
      "Calcium deficiency",
      "Post-menopausal bone loss",
      "Bone development in teens",
      "Supplement during pregnancy"
    ],
    tips: [
      "Avoid caffeine after dose.",
      "Exercise regularly.",
      "Maintain adequate sun exposure."
    ]
  },

  "calfolic-d3": {
    name: "Calfolic D3",
    tagline: "Supports bone and nerve health.",
    description: "A combo of folic acid, methylcobalamin, and D3 that helps bone mineralization and nerve repair.",
    category: "Bone & Nerve Care",
    images: ["product4.png"],
    features: [
      "Corrects megaloblastic anemia",
      "Reverses nerve damage",
      "Supports bone formation",
      "Boosts calcium absorption"
    ],
    composition: "Methylcobalamin, Vitamin D3, Folic Acid, Calcium Carbonate",
    indications: [
      "Nutritional anemia",
      "Vitamin B12 deficiency",
      "Bone weakness",
      "Post-operative recovery"
    ],
    tips: [
      "Take with warm water.",
      "Regular intake ensures better outcomes.",
      "Avoid alcohol with dose."
    ]
  },

  "neurovit-plus": {
    name: "Neurovit Plus",
    tagline: "Neurological support supplement.",
    description: "Enriched with essential neurotropic B vitamins and Omega-3s for brain and nerve health.",
    category: "Neurology",
    images: ["product3.png"],
    features: [
      "B1, B6, B12 enriched",
      "Supports memory & cognition",
      "Improves nerve signal transmission",
      "Antioxidant protection"
    ],
    composition: "B1 (100mg), B6 (5mg), B12 (1500mcg), Omega-3 (EPA/DHA)",
    indications: [
      "Diabetic neuropathy",
      "Cognitive decline",
      "Neuralgia",
      "Vitamin B complex deficiency"
    ],
    tips: [
      "Take with meals.",
      "Avoid smoking & alcohol.",
      "Do not miss daily dose."
    ]
  }
};
