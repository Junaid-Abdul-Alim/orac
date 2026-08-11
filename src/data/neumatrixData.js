// NEUMATRIX — ORAC International's automotive lighting and off-road accessories
// brand. Kept deliberately separate from the Export/Import portfolio per the
// brand brief. Populated from real product data; categories without a
// confident real-product match are left empty rather than guessed at.

export const neumatrixIntro =
  "An automotive brand focused on introducing high performance products from leading international manufacturers to the Indian market.";

export const neumatrixLedLightsContent = {
  title: "Automotive LED Lights",
  paragraphs: [
    "Explore our premium range of automotive LED lighting solutions designed for enhanced performance, visibility, and style. Our portfolio includes LED headlights, projector lights, 4×4 off-road lights, grille lights, auxiliary lights, shooter lights, work lights, and other automotive lighting accessories.",
    "Browse our complete product catalogue to explore specifications, models, and technical details.",
  ],
  cta: "Download the catalogue",
};

export const neumatrixCategories = [
  {
    title: "LED Lights & Spares",
    intro: "Grille lights, auxiliary lights, and lighting spares for every build.",
    products: [
      {
        name: "Other LED Lights & Spares",
        tag: "Auto / Lighting",
        story:
          "High-output auxiliary lighting mounted on vehicle grilles, built for off-road visibility and a commanding road presence.",
        specGroups: [
          {
            title: "Specification",
            type: "list",
            items: [
              { label: "Specification", value: "LED / Spot, flood, and combo beam" },
              { label: "Origin", value: "Sourced: China, Taiwan" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Other LED Lights & Spares",
    intro: "Precision projector and fog lighting, plus LED headlight bulbs, for sharper, longer-range illumination.",
    catalogueHref: "/downloads/neumatrix-other-led-lights-catalogue.pdf",
    products: [
      {
        name: "Projector & Fog Lights",
        tag: "Auto / Lighting",
        story: "Precision beam assemblies for sharper illumination and longer range.",
        specGroups: [
          {
            title: "Product Information",
            type: "list",
            items: [
              { label: "Product Type", value: "Fog Lights & Projector Lights" },
              { label: "Warranty", value: "1-Year Warranty" },
              { label: "Installation", value: "Plug & Play" },
            ],
          },
          {
            title: "Bi-LED Projector Lens Models — Aluminum Heat Dissipation",
            type: "table",
            columns: ["Model", "Low Beam", "High Beam", "Size", "CCT", "Voltage", "Bracket"],
            rows: [
              ["G50", "35W", "45W", "3-inch", "Tri-color (3000K/4300K/6500K)", "9-16V", "Universal bracket"],
              ["G52 — Double Eye", "35W", "67W", "3-inch", "Tri-color (3000K/4300K/6500K)", "9-16V", "Universal bracket"],
              ["G60", "35W", "45W", "3-inch", "Tri-color (3000K/4300K/6500K)", "9-16V", "Universal bracket"],
              ["G62 — Double Eye", "35W", "67W", "3-inch", "Tri-color (3000K/4300K/6500K)", "9-16V", "Universal bracket"],
              ["G220", "35W", "45W", "2-inch", "Tri-color (3000K/4300K/6500K)", "9-16V", "Universal bracket"],
              ["G221 — Single Eye", "35W", "52W", "2-inch", "Tri-color (3000K/4300K/6500K)", "9-16V", "Universal bracket"],
              ["G13", "35W", "45W", "3-inch", "Tri-color (3000K/4300K/6500K)", "9-16V", "Toyota / Honda / Universal bracket"],
              ["G12", "35W", "45W", "2-inch", "Tri-color (3000K/4300K/6500K)", "9-16V", "Toyota / Honda / Universal bracket"],
              ["G32 — Double Eye", "35W", "55W", "3-inch", "Tri-color (3000K/4300K/6500K)", "9-16V", "Toyota / Honda / Universal bracket"],
              ["G30", "35W", "45W", "3-inch", "Tri-color (3000K/4300K/6500K)", "9-16V", "Toyota / Honda / Universal bracket"],
              ["M33", "35W", "45W", "3-inch", "Tri-color (3000K/4300K/6500K)", "9-16V", "Toyota / Honda / Universal bracket"],
              ["M33A", "35W", "45W", "3-inch", "Tri-color (3000K/4300K/6500K)", "9-16V", "Toyota / Honda / Universal bracket"],
              ["G20", "35W", "45W", "2-inch", "Tri-color (3000K/4300K/6500K)", "9-16V", "Toyota / Honda / Universal bracket"],
              ["G21 — Single Eye", "35W", "55W", "2-inch", "Tri-color (3000K/4300K/6500K)", "9-16V", "Toyota / Honda / Universal bracket"],
            ],
          },
          {
            title: "Projector Lights — RG Series (High Power)",
            type: "table",
            columns: ["Model", "Power", "Size", "CCT — Low Beam", "CCT — High Beam", "Voltage", "Heat Dissipation", "Bracket"],
            rows: [
              [
                "RG330 — Demon Eye / Remote Control",
                "80W/110W",
                "115 × 75 × 35mm",
                "Tri color — 3570 CSP-6 cores",
                "Single color — 3570 CSP-3 cores",
                "10-35V",
                "Aluminum + 2 cooling fans",
                "L-shaped Car + H-shaped bracket",
              ],
              [
                "RG300",
                "80W/110W",
                "110 × 70 × 35mm",
                "6000K — 3570 CSP-6 cores",
                "6000K",
                "10-65V",
                "Aluminum + 2 cooling fans",
                "L-shaped Car + H-shaped bracket",
              ],
              [
                "RG10",
                "32W/48W",
                "75 × 48 × 43mm",
                "6000K — 3570 CSP-6 cores",
                "6000K — 3570 CSP-3 cores",
                "10V-100V",
                "Aluminum + 1 cooling fan",
                "U-shaped bracket",
              ],
            ],
          },
        ],
      },
      {
        name: "LED Headlights",
        tag: "Auto / Lighting",
        story: "High-output LED headlight bulbs for a brighter, whiter beam with a direct H4 fit.",
        specGroups: [
          {
            title: "Product Information",
            type: "list",
            items: [
              { label: "Product Type", value: "LED Headlight Bulbs" },
              { label: "Warranty", value: "1-Year Warranty" },
              { label: "Installation", value: "Plug & Play" },
            ],
          },
          {
            title: "LED Headlight Bulbs — H4 Socket",
            type: "table",
            columns: ["Model", "Power", "LED Chip", "Voltage", "Color Temp.", "Cooling System", "Socket"],
            rows: [
              ["L33", "80W", "3870-9 cores", "DC 12-36V", "6000K", "Two-copper tubes + Aluminum Fins", "H4"],
              ["L40", "35W/50W", "3570-6 cores / 3570-3 cores", "DC 12-36V", "6000K", "Aluminum + fan", "H4"],
              ["M6", "55W", "Advanced CSP", "DC 12-80V", "6000K", "Aluminum Heatsink + High speed fan", "H4"],
            ],
          },
          {
            title: "H4 Bulb — Common Specifications",
            type: "list",
            items: [
              { label: "Lifespan", value: "> 50,000 Hours" },
              { label: "Specialty", value: "Mini projector lens" },
              { label: "Application", value: "Car / Motorcycle" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Automotive & Off-Road Parts",
    intro: "Protection, recovery, and lifestyle accessories for India's growing overlanding community.",
    catalogueHref: "/downloads/neumatrix-automotive-off-road-parts-catalogue.pdf",
    products: [
      {
        name: "Damping Sheets",
        tag: "Auto / Protection",
        story: "Butyl-based acoustic damping panels that absorb road noise and panel resonance.",
        specGroups: [
          {
            title: "Product Information",
            type: "list",
            items: [
              { label: "Product Type", value: "Vibration Damping & Sound Deadening" },
              { label: "Origin", value: "China" },
              { label: "Application", value: "Automotive / Building / Industrial" },
              { label: "Installation", value: "Self-Adhesive, Easy Fit" },
              { label: "Certification", value: "5 Patents / VOC Compliant" },
              { label: "Custom Sizes", value: "Available (As Per Order)" },
            ],
          },
          {
            title: "Common Specifications",
            type: "list",
            items: [
              { label: "High Temperature", value: "Up to +180°C" },
              { label: "Low Temperature", value: "Down to −50°C" },
              { label: "Green Rating", value: "Superior to VOC Standards" },
              { label: "Material Types", value: "Butyl Film / Insulation Cotton / Polyester Fibre" },
              { label: "Key Function", value: "Sound & Heat Insulation, Vibration Damping" },
              { label: "Build", value: "Durable, Easy Install & Eco-Friendly" },
            ],
          },
          {
            title: "Product Directory",
            type: "table",
            columns: ["Product", "Size (mm)", "Material", "Temp. Range", "Packing"],
            rows: [
              ["Antela Shock-proof Plate", "2 × 460 × 800", "Aluminium foil composite butyl film", "−50°C ~ +180°C", "25 pcs/box"],
              ["Antela Shock-proof Plate", "2.3 × 460 × 800", "Aluminium foil composite butyl film", "−50°C ~ +180°C", "20 pcs/box"],
              ["INPHIC Shock-proof Plate (OEM)", "2 × 460 × 800", "Aluminium foil composite butyl film", "−50°C ~ +180°C", "25 pcs/box"],
              ["INPHIC Shock-proof Plate (Custom)", "As per order", "Aluminium foil composite butyl film", "−50°C ~ +180°C", "As per order"],
              ["Big Mac Vibration Stop Plate", "As per order", "Aluminium foil composite butyl film", "−50°C ~ +180°C", "As per order"],
              ["Accident Car Soundproof Blanket", "2.3 × 500 × 1000", "Non-woven composite butyl film", "−50°C ~ +100°C", "20 pcs/box"],
              ["Low Frequency Sound Insulation King", "8 × 460 × 800", "Sound-absorbing cotton + vibration plate", "−50°C ~ +180°C", "18 pcs/box"],
              ["Three-in-One Sound Insulation Board", "10 × 460 × 800", "Insulation cotton + aluminium foil vibration plate", "−50°C ~ +180°C", "30 pcs/box"],
              ["Engine Room Insulation Cotton", "5 × 100 × 1400", "Aluminium foil composite insulation cotton", "−50°C ~ +180°C", "10 pcs/box"],
              ["Sound Absorbing & Insulating Cotton", "10 × 1500 (Roll)", "Polyester fibre sound-absorbing cotton", "−50°C ~ +100°C", "As per order"],
            ],
          },
        ],
      },
      {
        name: "4x4 Winches",
        tag: "Auto / Off-Road",
        story: "Electric and hydraulic recovery winches for serious off-road and overland use.",
        specGroups: [
          {
            title: "Product Information",
            type: "list",
            items: [
              { label: "Product Type", value: "Heavy-Duty Electric Winch" },
              { label: "Origin", value: "China" },
              { label: "Voltage", value: "DC 12V or 24V" },
              { label: "Rope Compatibility", value: "Steel / Synthetic / Dyneema" },
              { label: "Motor", value: "High-Torque Series Wound" },
              { label: "Gear System", value: "Planetary" },
            ],
          },
          {
            title: "Model Range",
            type: "table",
            columns: ["Model", "Pulling Capacity", "Lifting Capacity", "Rope Length", "Rope Dia.", "Voltage", "Drum Size", "Weight"],
            rows: [
              ["2000 LB", "2000 lb (900 kg)", "200 kg", "6 m", "4 mm", "12V / 24V", "1.25\"", "6.5 kg"],
              ["3000 LB", "3000 lb (1300 kg)", "300 kg", "6 m", "5 mm", "12V / 24V", "1.25\"", "7 kg"],
              ["3500 LB", "3500 lb (1500 kg)", "350 kg", "10 m", "5 mm", "12V / 24V", "1.45\"", "9 kg"],
              ["4000 LB", "4000 lb (1800 kg)", "400 kg", "10 m", "5 mm", "12V / 24V", "1.45\"", "10 kg"],
              ["4500 LB", "4500 lb (2000 kg)", "450 kg", "10 m", "5 mm", "12V / 24V", "1.45\"", "12 kg"],
              ["6000 LB", "6000 lb (2700 kg)", "500 kg", "14 m", "7 mm", "12V / 24V", "2.52\"", "28 kg"],
              ["9500 LB", "9500 lb (4300 kg)", "600 kg", "24 m", "9 mm", "12V / 24V", "2.52\"", "37 kg"],
              ["12000 LB", "12000 lb (5400 kg)", "750 kg", "24 m", "9 mm", "12V / 24V", "2.52\"", "38 kg"],
              ["13500 LB", "13500 lb (6000 kg)", "800 kg", "24 m", "9 mm", "12V / 24V", "2.52\"", "38 kg"],
              ["16800 LB", "16800 lb (7600 kg)", "950 kg", "24 m", "11 mm", "12V / 24V", "2.52\"", "56 kg"],
              ["20000 LB", "20000 lb (9000 kg)", "1000 kg", "24 m", "11 mm", "12V / 24V", "2.52\"", "56 kg"],
            ],
          },
          {
            title: "Rope Options — Steel Wire",
            type: "tags",
            items: [
              "Galvanised high-tensile construction",
              "Excellent abrasion resistance",
              "Cost-effective & highly durable",
              "Ideal for industrial recovery",
            ],
          },
          {
            title: "Rope Options — Synthetic",
            type: "tags",
            items: [
              "Ultra-lightweight construction",
              "Safer than steel under recoil",
              "Floats on water · easy handling",
              "UV & moisture resistant",
            ],
          },
          {
            title: "Rope Options — Dyneema®",
            type: "tags",
            items: [
              "Premium UHMWPE fibre",
              "Very high tensile strength",
              "Minimal stretch · low weight",
              "Chemical & corrosion resistant",
            ],
          },
          {
            title: "General Specifications",
            type: "list",
            items: [
              { label: "Braking", value: "Automatic Load-Hold" },
              { label: "Clutch", value: "Sliding Ring Gear" },
              { label: "IP Rating", value: "Weather Resistant" },
              { label: "Operating Temp.", value: "−20°C to +60°C" },
              { label: "Mounting", value: "Universal Pattern" },
              { label: "Finish", value: "Powder-Coated / Corrosion Resistant" },
            ],
          },
        ],
      },
      {
        name: "On-Board Air Compressors",
        tag: "Auto / Off-Road",
        story: "Permanently mounted tyre inflation systems for pressure control on the move.",
        specGroups: [
          {
            title: "Product Information",
            type: "list",
            items: [
              { label: "Product Type", value: "12V Vehicle Air Compressor & Kits" },
              { label: "Origin", value: "China" },
              { label: "Application", value: "4x4 / SUV / Truck / Overlanding / Air Tools" },
              { label: "Range", value: "7 Models — Bare Units & Kits" },
              { label: "Installation", value: "Compact & Easy Mount" },
              { label: "Protection", value: "Overheat / Thermal Cut-Off" },
            ],
          },
          {
            title: "Common Specifications",
            type: "list",
            items: [
              { label: "Voltage", value: "12 V DC" },
              { label: "Pressure Switch", value: "120 PSI On / 150 PSI Off" },
              { label: "Tank (Kits)", value: "1.0 Gallon" },
              { label: "Extendable Hose", value: "6 m" },
              { label: "Power Cord", value: "2.2 – 2.5 m" },
              { label: "Inline Fuse (Kits)", value: "2 × 40 A" },
            ],
          },
          {
            title: "Performance Specifications",
            type: "table",
            columns: ["Model", "Type", "Air Flow", "Duty Cycle", "Max Amp Draw", "Max Pressure", "Net Weight"],
            rows: [
              ["YF6475R", "Metal Air Compressor", "3.0 CFM", "33%", "28 A", "150 PSI", "4.5 kg"],
              ["YF6276R-1", "Compact Air Compressor", "0.98 CFM", "35%", "10 A", "150 PSI", "2.4 kg"],
              ["YF6475R-4", "Twin-Cylinder Compressor", "130 LPM", "100%", "55 A", "300 PSI", "9.73 kg"],
              ["YF6475R-5", "Twin-Cylinder Compressor", "5.9 CFM", "100%", "58 A", "150 PSI", "7.67 kg"],
              ["YF6477R", "Air Compressor Kit (Tank)", "5.9 CFM", "100%", "62 A", "150 PSI", "16 kg"],
              ["YF6478R", "Air Compressor Kit (Tank)", "130 LPM", "100%", "61 A", "300 PSI", "16 kg"],
              ["YF6277R", "Portable Compressor Kit", "3.0 CFM", "33%", "28 A", "120 PSI", "7.4 kg"],
            ],
          },
          {
            title: "Packing & Loadability",
            type: "table",
            columns: ["Model", "Carton Qty", "G.W / N.W (kg)", "Carton Size (cm)", "20ft (pcs)", "40HQ (pcs)"],
            rows: [
              ["YF6475R", "1", "4.5 / 3.8", "23 × 13 × 19", "4577", "11266"],
              ["YF6276R-1", "4", "8.13 / 7.2", "30 × 20 × 51", "3400", "8620"],
              ["YF6475R-4", "1", "12 / 11.5", "35.5 × 19.5 × 24.7", "1520", "3860"],
              ["YF6475R-5", "1", "8.6 / 7.5", "37.5 × 27 × 19.5", "1317", "3343"],
              ["YF6477R", "1", "18 / 17", "51.5 × 40 × 19.5", "647", "1503"],
              ["YF6478R", "1", "17 / 16", "51.5 × 40 × 19.5", "397", "1693"],
              ["YF6277R", "1", "7.53 / 7.03", "36 × 30.5 × 17", "1500", "3643"],
            ],
          },
        ],
      },
      {
        name: "PPF - Paint Protection Film",
        tag: "Auto / Protection",
        story:
          "Self-healing, optically invisible film that guards paint from chips, scratches, and UV degradation.",
        specGroups: [
          {
            title: "Product Information",
            type: "list",
            items: [
              { label: "Product Type", value: "TPU Self-Healing Protective Film" },
              { label: "Origin", value: "China" },
              { label: "Material", value: "TPU (Thermoplastic Polyurethane)" },
              { label: "Application", value: "Automotive Exterior Paint Protection" },
              { label: "Adhesive Type", value: "Pressure Sensitive Acrylic" },
              { label: "Warranty", value: "5 – 10 Years (Series Dependent)" },
            ],
          },
          {
            title: "Technical Specifications",
            type: "list",
            items: [
              { label: "Thickness Options", value: "6.5 / 7.5 / 8.5 mil (165–215µ)" },
              { label: "Film Transparency", value: "> 90%" },
              { label: "Gloss Level", value: "High Gloss" },
              { label: "Hydrophobic Angle", value: "> 100°" },
              { label: "Tensile Strength", value: "> 28 MPa" },
              { label: "Elongation at Break", value: "> 300%" },
              { label: "Peel Strength", value: "> 1.5 N/mm" },
              { label: "Temperature Resistance", value: "−40°C to +110°C" },
              { label: "UV Resistance", value: "Excellent" },
              { label: "Yellowing Resistance", value: "Excellent" },
              { label: "Self-Healing", value: "Heat Activated (Minor Scratches)" },
              { label: "Finish Options", value: "High Gloss / Ultra Gloss / Matte" },
            ],
          },
          {
            title: "Product Series",
            type: "table",
            columns: ["Series", "Thickness", "Key Features", "Self-Healing", "Hydrophobic", "Warranty", "Best For"],
            rows: [
              ["Standard", "6.5 mil (165µ)", "Good protection, high clarity, cost-effective", "★★★☆☆", "★★★★☆", "5 Years", "Daily use · Sedan / Hatchback"],
              ["Premium", "7.5 mil (190µ)", "Enhanced durability, self-healing, high gloss", "★★★★☆", "★★★★☆", "7 Years", "SUV / Luxury · Highway driving"],
              ["Pro", "8.5 mil (215µ)", "Maximum protection, impact resistant, self-healing", "★★★★★", "★★★★★", "10 Years", "Performance · Off-road / Extreme"],
            ],
          },
          {
            title: "Available Sizes & Finish",
            type: "list",
            items: [
              { label: "Standard Roll Widths", value: "0.61 / 0.76 / 1.22 / 1.52 / 1.83 m" },
              { label: "Width (Inches)", value: "24″ / 30″ / 48″ / 60″ / 72″" },
              { label: "Standard Roll Length", value: "15 m (All Widths)" },
              { label: "Custom Cuts", value: "Available on Request" },
            ],
          },
        ],
      },
      {
        name: "Ambient Strip Lights",
        tag: "Auto / Interior",
        story: "RGB LED interior lighting systems that transform cabin atmosphere.",
        specGroups: [
          {
            title: "Product Information",
            type: "list",
            items: [
              { label: "Product Type", value: "Automotive Interior RGB Lighting" },
              { label: "Origin", value: "China" },
              { label: "Application", value: "Cars / SUVs / Trucks / Vans" },
              { label: "Installation", value: "Adhesive Backing (Plug & Play)" },
              { label: "Control", value: "Bluetooth App" },
              { label: "Warranty", value: "12 Months" },
            ],
          },
          {
            title: "Technical Specifications",
            type: "list",
            items: [
              { label: "Operating Voltage", value: "DC 12V (Car Adapter)" },
              { label: "LED Type", value: "5050 RGB LED" },
              { label: "Colour System", value: "16 Million+ Colours" },
              { label: "Power Consumption", value: "Low Power" },
              { label: "Waterproof Rating", value: "IP65 (Strip Light)" },
              { label: "Operating Temperature", value: "−20°C ~ +60°C" },
              { label: "Lifespan", value: "> 50,000 Hours" },
              { label: "Lighting Modes", value: "Static / Breathing / Music Sync / Gradient" },
            ],
          },
          {
            title: "Available Models",
            type: "table",
            columns: ["Model", "Length", "LEDs", "Strip Type", "Control", "Application"],
            rows: [
              ["ASL-4IN1", "4 × 60 cm", "48 LEDs / Strip", "4-in-1 Set", "Bluetooth App", "Dashboard + Doors"],
              ["ASL-6IN1", "6 × 60 cm", "48 LEDs / Strip", "6-in-1 Set", "Bluetooth App", "Dashboard + Doors"],
              ["ASL-9IN1", "9 × 60 cm", "48 LEDs / Strip", "9-in-1 Set", "Bluetooth App", "Full Interior"],
              ["ASL-11IN1", "11 × 60 cm", "48 LEDs / Strip", "11-in-1 Set", "Bluetooth App", "Full Interior Premium"],
              ["ASL-CUSTOM", "Custom Length", "Custom", "Custom Set", "Bluetooth App", "Custom Fit Solutions"],
            ],
          },
        ],
      },
      {
        name: "Camping & Off-Road Kits",
        tag: "Auto / Lifestyle",
        story:
          "Rooftop tents, recovery boards, and expedition equipment for India's growing overlanding community.",
        specGroups: [
          {
            title: "Product Information",
            type: "list",
            items: [
              { label: "Product Type", value: "All-in-One Outdoor & Overlanding Kit" },
              { label: "Origin", value: "China" },
              { label: "Application", value: "4x4 / SUV / Truck / Overlanding" },
              { label: "Storage", value: "Compact & Portable" },
              { label: "Configurations", value: "Basic / Adventure / Expedition" },
              { label: "Warranty", value: "12 Months" },
            ],
          },
          {
            title: "Common Specifications",
            type: "list",
            items: [
              { label: "Material", value: "Aluminium / Steel / ABS / Oxford Fabric" },
              { label: "Power Supply", value: "12V DC (Most Accessories)" },
              { label: "Colour", value: "Black / Grey / Khaki" },
              { label: "Operating Temperature", value: "−20°C to +60°C" },
              { label: "Waterproof Rating", value: "IP65 & above (Selected Items)" },
              { label: "Build Quality", value: "Heavy-Duty & Weather Resistant" },
            ],
          },
          {
            title: "Kit Components (Typical)",
            type: "tags",
            items: [
              "Roof Top Tent — Waterproof, UV resistant, easy setup",
              "Portable Fridge — 12V / 24V / 240V, large capacity",
              "LED Lights — Spot, flood & combo, high brightness",
              "Portable Stove — Dual burner, windproof, fuel efficient",
              "LED Lantern — Rechargeable, multi-mode lighting",
              "Folding Chair — Heavy-duty, comfortable & compact",
              "Folding Table — Aluminium, lightweight & sturdy",
              "Recovery Tracks — High strength, anti-slip, sand/mud use",
              "Recovery Kit — Tow rope, shackles, snatch strap",
              "Multi-Function Shovel — Foldable, durable & portable",
              "Air Compressor — 12V, high pressure, fast inflation",
              "Carry Bag — Heavy-duty, organised & easy storage",
            ],
          },
          {
            title: "Available Kit Options",
            type: "table",
            columns: ["Kit", "Description", "Includes"],
            rows: [
              [
                "Basic Kit",
                "Essential gear for short trips & camping",
                "LED Lantern; Folding Chair; Folding Table; Portable Stove; Carry Bag",
              ],
              [
                "Adventure Kit",
                "Enhanced gear for off-road & adventure",
                "Roof Top Tent; Portable Fridge; LED Light Bar; Recovery Kit; Air Compressor; Folding Table & Chair; Carry Bag",
              ],
              [
                "Expedition Kit",
                "Complete premium kit for extreme expeditions",
                "Roof Top Tent; Portable Fridge; LED Light Bar (Set); Recovery Tracks; Recovery Kit; Air Compressor; Multi-Function Shovel; Portable Stove; Folding Table & Chairs; LED Lantern; Carry Bag / Storage Box",
              ],
            ],
          },
        ],
      },
      {
        name: "Sun Film",
        tag: "Auto / Tint",
        story: "Window film for UV rejection, heat reduction, and privacy.",
        specGroups: [
          {
            title: "Specification",
            type: "list",
            items: [
              { label: "Specification", value: "VLT range 5%-70% / Ceramic and nano series" },
              { label: "Origin", value: "Sourced: USA, South Korea" },
            ],
          },
        ],
      },
    ],
  },
];
