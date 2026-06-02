/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Dentist, Testimonial, BlogPost } from './types';

export const SERVICES: Service[] = [
  {
    id: 'preventive',
    name: 'Preventive Dentistry',
    shortDescription: 'Advanced routine checkups, deep cleanings, and digital screenings designed to halt dental decay before it begins.',
    fullDescription: 'Preventive dental care is the cornerstone of lifelong wellness. Utilizing state-of-the-art ultrasonic scalers and low-radiation digital imaging, our team ensures your teeth and supporting tissues remain healthy. We focus on comprehensive cleanings, early cavity detection, periodontal health mapping, and targeted remineralization treatments.',
    iconName: 'ShieldAlert', // Will map to Lucide icons
    price: 'From $120',
    duration: '45 - 60 mins',
    benefits: [
      'Comprehensive digital radiography with 90% less radiation',
      'Ultrasonic plaque and calculus removal (less hand-scraping)',
      'Individualized high-fluoride glass-ionomer sealants',
      'Personalized dietary & pH-balancing counselling'
    ]
  },
  {
    id: 'cosmetic',
    name: 'Cosmetic Shaping',
    shortDescription: 'Transformative veneers, bonding, and bespoke whitening for a bright, symmetrical, natural-looking smile.',
    fullDescription: 'Enhance your self-confidence with custom aesthetic enhancements. From conservative composite bonding that restores small chips to premium porcelain veneers handcrafted by master ceramic technicians, we customize every dimension of your smile. We utilize digital mockups to visualize your final aesthetics before any treatment starts.',
    iconName: 'Sparkles',
    price: 'From $350 / tooth',
    duration: '1 - 2 sessions',
    benefits: [
      'Digital Smile Design (DSD) preview of your personal layout',
      'Ultra-thin e.max® lithium disilicate veneers for strength and realism',
      'In-office Zoom!™ laser whitening (up to 8 shades brighter in 45 min)',
      'Highly polished, biocompatible composite bonding'
    ]
  },
  {
    id: 'implants',
    name: 'Dental Implants',
    shortDescription: 'Permanent, fully integrated titanium roots capped with premium custom porcelain crowns for full function.',
    fullDescription: 'Replace missing teeth with biocompatible titanium or ceramic roots. Using 3D Cone Beam Computed Tomography (CBCT) and computer-guided placement, we achieve optimal precision, ensuring virtual discomfort-free osseointegration and beautiful, lifetime-guaranteed realistic crowns.',
    iconName: 'Activity',
    price: 'From $1,800',
    duration: '3 - 6 months total',
    benefits: [
      'Fully guided surgery using computer-designed precise surgical guides',
      'High-grade titanium and metal-free zirconium implant lines',
      'Custom fabricated crowns for perfect bite alignment and spacing',
      'Bone preservation & facial structure maintenance'
    ]
  },
  {
    id: 'orthodontics',
    name: 'Orthodontics & Aligners',
    shortDescription: 'Invisalign® and discrete crystal ceramic braces tailored for comfortable teeth straightening.',
    fullDescription: 'Correct malocclusions, crowded arches, or bite issues with modern orthodontic platforms. As certified gold-tier Invisalign providers, we offer virtually invisible clear aligner sequences alongside state-of-the-art ceramic braces. Enjoy low force, rapid adjustment sequences for a comfortable journey.',
    iconName: 'Compass',
    price: 'From $2,200',
    duration: '6 - 18 months',
    benefits: [
      'iTero® 3D digital oral scanning (no messy putty impressions)',
      'Proprietary SmartTrack® aligners for more predictable movements',
      'Accelerated alignment options to trim treatment time by 30%',
      'Discreet ceramic or tooth-colored traditional attachments'
    ]
  },
  {
    id: 'pediatric',
    name: 'Pediatric Dentistry',
    shortDescription: 'An ultra-patient, positive, and sensory-friendly environment for children\'s dental milestones.',
    fullDescription: 'Help your child construct a lifetime of healthy dental behaviors. Our pediatric zone is designed specifically to dismantle dental fear through interactive storytelling, painless dental diagnostics, and dedicated child-psychology-trained specialists who put both parents and children at immediate ease.',
    iconName: 'Star',
    price: 'From $95',
    duration: '30 - 45 mins',
    benefits: [
      'Sensory-adapted, anxiety-reducing kid-friendly private pods',
      'Interactive games explaining tooth mechanics and bacteria',
      'Painless laser diagnostics (minimizing the need for dynamic probes)',
      'Strong support and coaching for thumb-sucking and pacifier removal'
    ]
  }
];

export const DENTISTS: Dentist[] = [
  {
    id: 'sarah-jenkins',
    name: 'Dr. Sarah Jenkins, DDS',
    title: 'Lead Orthodontist & Clinical Director',
    bio: 'Dr. Jenkins believes that an elegant smile is a balance of aesthetic symmetry and optimal tooth biomechanics. With over 14 years in digital orthodontics, she approaches every aligner system design with warm empathy and surgical precision.',
    specialty: 'Orthodontics & Clear Aligners',
    credentials: ['Doctor of Dental Surgery (DDS) - Columbia University', 'Certified Gold Provider of Invisalign®', 'Member of the American Association of Orthodontists'],
    education: 'Columbia University School of Dental Medicine',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=640'
  },
  {
    id: 'marcus-vance',
    name: 'Dr. Marcus Vance, DMD',
    title: 'Cosmetic & Implant Reconstructive Specialist',
    bio: 'Dr. Vance focuses on minimally invasive, high-fidelity smile restoration. His work merges cosmetic chemistry with biomechanical implant engineering to fabricate strong, breathtakingly natural teeth optimized for individual facial features.',
    specialty: 'Implantology & Aesthetic Veneers',
    credentials: ['Doctor of Medicine in Dentistry (DMD) - Harvard University', 'Fellow of the International Congress of Oral Implantologists (ICOI)', 'Master of Aesthetic Dentistry Post-Grad'],
    education: 'Harvard Harvard School of Dental Medicine',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=640'
  },
  {
    id: 'elena-rostova',
    name: 'Dr. Elena Rostova, DDS',
    title: 'Pediatric & Preventive Dentist',
    bio: 'Dr. Elena has committed her clean-air practice to helping youngsters and dental-anxious adults experience stress-free wellness. Her compassionate approach features active listening and trauma-informed relaxation styles.',
    specialty: 'Pediatric Dentistry & Sedation Protocols',
    credentials: ['Doctor of Dental Surgery (DDS) - Northwestern University', 'Board Certified Pediatric Dentist', 'Specialist in Nitrous Oxide & Conscious Pediatric Sedation'],
    education: 'Northwestern University Dental School',
    imageUrl: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=640'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Clarissa Montgomery',
    rating: 5,
    treatment: 'Porcelain Veneers',
    reviewText: 'Dr. Vance is an actual dental artist! I underwent a smile revitalization with six veneered teeth. The digital roadmap allowed me to see and refine the layout beforehand. The final outcome is balanced, ultra-realistic, and has restored my confidence.',
    date: 'May 12, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: '2',
    name: 'David Reynolds',
    rating: 5,
    treatment: 'Dental Implants',
    reviewText: 'After losing a molar, I was hesitant about dental implant surgery. The staff and Dr. Vance used a fully guided computer template. I felt virtually no discomfort. The crown matches the rest of my bite perfectly, feeling extremely natural and sturdy!',
    date: 'April 28, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: '3',
    name: 'Sophia and Leo',
    rating: 5,
    treatment: 'Pediatric Checkup',
    reviewText: 'Finding a pediatric dentist whom my 6-year-old actually wants to visit was a dream until Apex. Dr. Elena explained all elements with dynamic toys, showed him the water probe, and made him laugh the whole time. Absolute gold standard.',
    date: 'May 20, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: '4',
    name: 'Michael Coleman',
    rating: 5,
    treatment: 'Invisalign Aligners',
    reviewText: 'My teeth and bite alignment were crooked, causing jaw discomfort. Dr. Jenkins custom-designed an Invisalign sequence. It was comfortable, straightforward, and took only 11 months to achieve an awesome aligned outcome. Outstanding clinical experience.',
    date: 'March 15, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'gum-health-tips',
    title: '5 Crucial Tips to Keep Your Gums Healthy and Fight Periodontitis',
    excerpt: 'Many focus solely on brushing teeth, but soft tissues and bone structures are the literal foundations of your smile. Learn how to protect them.',
    content: `When we talk about beautiful teeth, we often overlook the literal foundation keeping those teeth in place: our gums. Gingivitis (gum inflammation) is highly common yet is completely reversible with proper practices. Left untreated, however, it can progress into periodontitis, which degrades the alveolar bone supporting your teeth.

Here are 5 science-backed habits to protect your periodontal wellness immediately:

1. **Adopt a Micro-Brushing Angle at the Gum Line**
A key brushing error is sweeping purely sideways across tooth faces. Instead, position your toothbrush at a precise **45-degree angle pointing gently toward your gum line**. Gently wiggle the brush in small circular vibrations. This breaks down subgingival biofilm directly under the gum flap where decay-causing bacteria thrive.

2. **Integrate Interdental Flossing or Water Flossing Daily**
At least **30% of your raw teeth surface area resides between adjacent teeth**. No horizontal bristles can penetrate this physical groove. Use high-quality waxed floss in a smooth "C-shape" wrapping around both sides of each gap, or utilize a targeted water irrigator to clean active subgingival pockets.

3. **Incorporate pH-Balancing & Xylitol Gums**
Cavities and gum diseases thrive in heavily acidic spaces. Saliva is our body's dynamic buffer. Chewing clinical 100% xylitol gum post-meal stimulates alkaline saliva production, which actively remineralizes enamel surfaces and starves acid-producing strains.

4. **Scrape Your Tongue Daily**
Our tongue harbors billions of active sulfur-producing bacteria that migrate directly to gum pockets, contributing to bad breath (halitosis) and gingival challenges. Buy a metallic or medical-grade tongue scraper, sweep from back to front 4 times each morning for immediate improvement.

5. **Schedule Ultrasonic Professional Hygiene Cleanings Twice a Year**
Even the absolute best home dental regimen cannot scrub away calcified **tartar (dental calculus)**, which acts as a dense porous reef for bacteria colonies. Only a clinical dental hygienist utilizing specialized ultrasonic micro-scalers can gently dislodge tartar without damaging your teeth.

Start prioritizing these periodontal techniques this week! Gentle care is about consistency and the correct mechanics.`,
    date: 'May 10, 2026',
    category: 'Patient Education',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=640',
    author: {
      name: 'Dr. Elena Rostova',
      role: 'Preventive Specialist'
    }
  },
  {
    id: 'truth-about-whitening',
    title: 'The Truth About Teeth Whitening: Professional vs. Over-the-Counter',
    excerpt: 'Is Charcoal paste safe? What is the difference between custom medical dental bleach and drugstore strips? We separate science from hype.',
    content: `Every second social media ad promises instantaneous, porcelain-bright teeth through charcoal powders, non-peroxide LED pens, or generic baking-soda strips. However, the biochemistry of dental stain removal remains exact, and misusing aggressive substances can degrade permanent enamel.

Let\'s examine the actual biological differences between clinic whitening systems and drugstore formulas:

### How Dental Bleaching Actually Works
Enamel is the translucent outer protective shell of your tooth, predominantly built of hydroxyapatite calcium crystals. Directly underneath resides **dentin**, a porous yellow organic layer. Our enamel crystals form micro-tunnels (enamel rods) where food molecules (tanning acids, coffee, polyphenols) accumulate over the years, dulling your smile alignment.

To break down these stubborn nested organic pigmentations, we must use an oxygenating compound—typically **Hydrogen Peroxide (H₂O₂)** or **Carbamide Peroxide (CH₆N₂O₃)**. These molecules break down into free oxygen radicals that sweep down enamel rods to chemically oxidize the staining chains, leaving the mineral architecture entirely intact.

### 1. The Danger of Charcoal and Abrasives
Many popular drugstore tubes contain highly abrasive, gritty materials like activated charcoal, volcanic ash, or coarse silica. While they scrape surface smoke stains, they act as high-grit sandpaper over your enamel shell. Over months, this wears down enamel layers, exposing the **interior yellow dentin**. In seeking white teeth, users accidentally turn their smile permanent yellow, while inducing high enamel hypersensitivity to cold and heat.

### 2. Concentration and Custom Fitting (Drugstore Strips)
Over-The-Counter whitening strips use general sizing that rarely seals correctly against your teeth curves. Consequently:
* **Acid leakages** spill on delicate organic gum margins, creating chemical burns, blistering, and severe irritation.
* **Low Chemical Potency**: Active oxygenation values are limited to 3-6% to minimize consumer risk, requiring weeks to show slight improvements.

### 3. The Professional Dental Advantage
Apex Dental customizes whitening to guarantee instantaneous, safe radiance:
* **Custom Custom-Molded Trays**: Designed matching your exact iTero digital oral scans, ensuring the bleaching gel stays directly locked onto the teeth surface while completely sealing out your gums.
* **In-Office Laser-Assisted Oxidation**: Our Zoom!™ systems utilize standard 25-40% hydrogen peroxide safely guarded, catalyzed by cool light lasers that accelerate oxidation speeds.
* **Sensory Sensitivity Relief**: We formulate custom trays with buffering agents and amorphous calcium phosphate (ACP) to keep nerve impulses completely comfortable during and after bleaching.

If you are ready for dynamic, safe radiance that doesn\'t sacrifice enamel thickness, consult our aesthetic experts for a personalized roadmap.`,
    date: 'April 14, 2026',
    category: 'Cosmetic Dentistry',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=640',
    author: {
      name: 'Dr. Marcus Vance',
      role: 'Cosmetic Specialist'
    }
  },
  {
    id: 'modern-aligner-revolution',
    title: 'Smarter Aligners: Why Modern Orthodontics is Life-Changing',
    excerpt: 'Metal braces are no longer the default. Explaining the bio-physics of clear virtual aligners and how 3D computing makes alignment effortless.',
    content: `Orthodontic correction used to conjure memories of painful silver metal brackets, sharp tension wires, and soft-tissue ulcers during high-school. Fortunately, dental software suites and materials chemistry have revolutionized the treatment process.

### The Bio-Mechanics of Gentle Teeth Movement
Our teeth sit inside bone sockets, bound by a microscopic web called the **periodontal ligament (PDL)**. When light, sustained physical pressure is applied over a tooth:
1. It creates a "compression zone" on one side, and a "tension zone" on the alternate side of the physical root.
2. The body utilizes biological cells called **osteoclasts** to break down bone tissue in the compressed zone.
3. Simultaneously, **osteoblasts** deposit fresh calcium layers in the tension zone.

This biological remodeling allows teeth to physically migrate into balanced position.

### Why Computerized Aligners Excel
Clear aligners utilize SmartTrack plastic resins to distribute forces in a comfortable manner. Here\'s how the modern technology operates:

* **Surgical Precision Mapping**: Our iTero scanners record 6,000 photos per second, constructing a dynamic 3D simulation of your jaw.
* **Iterative Trajectory Calculators**: Using advanced physical modeling, we program exact movements (typically 0.25mm per aligner stage).
* **Fewer Emergency Appointments**: There are no broken metallic brackets or poking custom wires causing physical soft tissue pain.
* **Uncompromising Oral Hygiene**: Because you remove aligners to eat and brush, you don\'t struggle with plaque accumulation and food traps that metal braces perpetuate.

With clear aligners, orthodontic treatment has transformed from dual-year painful commitments into a highly predictable, discreet aesthetic sequence designed around your busy lifestyle. Regardless of age, orthodontic restoration optimizes both bite force mechanics and overall aesthetic harmony!`,
    date: 'March 22, 2026',
    category: 'Orthodontics',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&q=80&w=640',
    author: {
      name: 'Dr. Sarah Jenkins',
      role: 'Orthodontics Director'
    }
  }
];
