import { useMemo, useState } from "react";

const IMG = "/images/";

const services = [
  {
    title: "Luxe Exterior Detail",
    price: 125,
    desc: "A premium exterior refresh designed to restore gloss, clean the details, and leave your vehicle protected.",
    items: ["Foam pre-wash", "Hand wash", "Wheels & tires", "Bug & tar removal", "Exterior glass", "Spray sealant"],
    image: `${IMG}service-exterior.jpg`,
  },
  {
    title: "Luxe Interior Detail",
    price: 150,
    desc: "A detailed interior reset for the surfaces you touch and the spaces you see every day.",
    items: ["Full vacuum", "Dash & console", "Door panels", "Interior glass", "Leather/vinyl cleaning", "UV protectant"],
    image: `${IMG}service-interior.jpg`,
  },
  {
    title: "Luxe Signature Detail",
    price: 275,
    desc: "Our complete interior and exterior transformation for vehicles ready for the full Luxe treatment.",
    items: ["Complete interior", "Deep vacuum", "Carpet & mat cleaning", "Leather treatment", "Exterior decontamination", "Paint sealant"],
    image: `${IMG}service-signature.jpg`,
  },
  {
    title: "Paint Correction",
    price: 350,
    desc: "Professional paint enhancement to improve the appearance of swirls, oxidation, water spots, and light imperfections.",
    items: ["Paint inspection", "Decontamination", "Machine polishing", "Gloss enhancement", "Panel-by-panel finish"],
    image: `${IMG}service-correction.jpg`,
  },
  {
    title: "Luxe Ceramic Coating",
    price: 650,
    desc: "Long-lasting hydrophobic protection paired with gloss enhancement and meticulous paint preparation.",
    items: ["Paint preparation", "Chemical decontamination", "Clay treatment", "Coating application", "Cure inspection"],
    image: `${IMG}service-ceramic.jpg`,
  },
];

const packages = [
  {
    name: "Luxe Essential",
    price: 175,
    tag: "The refresh",
    desc: "For vehicles that need a premium reset without the full restoration.",
    features: ["Exterior hand wash", "Wheels & tires", "Interior vacuum", "Surface cleaning", "Interior & exterior glass", "Spray protection"],
  },
  {
    name: "Luxe Signature",
    price: 275,
    tag: "Most popular",
    desc: "Our balanced full-detail experience for a dramatic before-and-after.",
    features: ["Everything in Essential", "Deep interior cleaning", "Carpet & mat cleaning", "Leather conditioning", "Door jamb cleaning", "Exterior decontamination"],
    featured: true,
  },
  {
    name: "Luxe Elite",
    price: 450,
    tag: "The full treatment",
    desc: "For the vehicle that deserves the most complete detailing experience.",
    features: ["Full interior detail", "Deep extraction", "Leather treatment", "Exterior detail", "Paint decontamination", "Paint enhancement", "Premium sealant"],
  },
];

const addOns = [
  ["Pet Hair Removal", 75],
  ["Odor Treatment", 75],
  ["Engine Bay Detail", 100],
  ["Headlight Restoration", 100],
  ["Leather Conditioning", 75],
  ["Glass Coating", 125],
  ["Wheel Ceramic Coating", 250],
  ["Trim Restoration", 100],
  ["Carpet Extraction", 100],
  ["Ceramic Interior Protection", 200],
];

const vehicleSizes = [
  { name: "Sedan / Coupe", extra: 0 },
  { name: "Small SUV / Crossover", extra: 25 },
  { name: "Large SUV / Truck", extra: 50 },
  { name: "Three-Row SUV / Large Truck", extra: 75 },
];

const memberships = [
  {
    name: "Luxe Monthly",
    price: 99,
    desc: "Consistent upkeep for drivers who like their vehicle ready every month.",
    features: ["Monthly exterior wash", "Wheel cleaning", "Tire dressing", "Interior maintenance", "Glass cleaning"],
  },
  {
    name: "Luxe Plus",
    price: 149,
    desc: "A deeper maintenance rhythm with protection and priority scheduling.",
    features: ["Everything in Monthly", "Interior deep clean every 3 months", "Spray protection", "Priority scheduling"],
  },
  {
    name: "Luxe VIP",
    price: 249,
    desc: "Our highest-touch maintenance plan for vehicles that stay immaculate.",
    features: ["Monthly full maintenance detail", "Interior protection", "Exterior protection", "Priority scheduling", "Quarterly complimentary add-on"],
  },
];

const faqs = [
  ["How long does a detail take?", "Timing depends on the vehicle, package, and condition. A standard detail may take several hours, while correction and coating services can require a full day or more."],
  ["Do you offer mobile detailing?", "Yes. Concierge/mobile service can be requested when available. A mobile service fee may apply depending on location and service requirements."],
  ["How much does detailing cost?", "Our services start at the prices shown on the site. Final pricing can change based on vehicle size, condition, and selected add-ons."],
  ["Do you work on luxury and exotic vehicles?", "Yes. Our Luxe Collection is designed for premium, luxury, and specialty vehicles. Specialty vehicles receive a custom quote."],
  ["Can you remove scratches?", "Paint correction can improve many light-to-moderate paint imperfections. Deep scratches that have reached the underlying layers may require a different repair."],
  ["How long does ceramic coating last?", "Protection duration depends on the coating selected, preparation, maintenance, storage, and driving conditions. Ask about our 1-, 3-, and 5-year options."],
  ["Do you require a deposit?", "A deposit can be requested to reserve certain appointments. The exact requirement can be configured when your booking system is connected."],
  ["What if my vehicle is extremely dirty?", "No problem. We assess the vehicle before service. Excessive soil, heavy pet hair, biohazards, or unusually difficult conditions may require an additional charge."],
];

function money(value) {
  return `$${value.toLocaleString()}`;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceFilter, setServiceFilter] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [vehicle, setVehicle] = useState(0);
  const [condition, setCondition] = useState("Light");
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [formSent, setFormSent] = useState(false);

  const estimated = useMemo(() => {
    const base = packages[selectedPackage].price;
    const size = vehicleSizes[vehicle].extra;
    const conditionExtra = condition === "Moderate" ? 35 : condition === "Heavy" ? 75 : condition === "Severe" ? 125 : 0;
    const extras = selectedAddOns.reduce((sum, index) => sum + addOns[index][1], 0);
    return base + size + conditionExtra + extras;
  }, [selectedPackage, vehicle, condition, selectedAddOns]);

  const toggleAddOn = (index) => {
    setSelectedAddOns((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    );
  };

  const filteredServices =
    serviceFilter === "All"
      ? services
      : services.filter((service) => service.title.toLowerCase().includes(serviceFilter.toLowerCase()));

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site">
      <header className="nav">
        <button className="brand" onClick={() => scrollTo("home")} aria-label="North Splash Auto Luxe home">
          <span className="brand-mark">NS</span>
          <span>
            <strong>NORTH SPLASH</strong>
            <small>AUTO LUXE</small>
          </span>
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <button onClick={() => scrollTo("services")}>Services</button>
          <button onClick={() => scrollTo("packages")}>Packages</button>
          <button onClick={() => scrollTo("protection")}>Protection</button>
          <button onClick={() => scrollTo("gallery")}>Gallery</button>
          <button onClick={() => scrollTo("membership")}>Membership</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
        </nav>

        <button className="nav-cta" onClick={() => scrollTo("booking")}>Book Now</button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          ☰
        </button>
      </header>

      <main>
        <section id="home" className="hero">
          <img src={`${IMG}hero-luxury-car.jpg`} alt="Luxury vehicle with a polished finish" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">PREMIUM AUTOMOTIVE CARE</p>
            <h1>Elevate<br /><span>Your Drive.</span></h1>
            <p className="hero-copy">A higher standard of vehicle care. Precision detailing, paint enhancement, ceramic protection, and concierge service designed for the way your vehicle deserves to look.</p>
            <div className="hero-actions">
              <button className="button primary" onClick={() => scrollTo("booking")}>Book Your Detail</button>
              <button className="button ghost" onClick={() => scrollTo("services")}>Explore Services</button>
            </div>
            <div className="hero-stats">
              <div><strong>DETAIL</strong><span>Precision care</span></div>
              <div><strong>PROTECT</strong><span>Long-term finish</span></div>
              <div><strong>MAINTAIN</strong><span>Luxe standards</span></div>
            </div>
          </div>
        </section>

        <section className="intro section">
          <div>
            <p className="eyebrow">THE LUXE STANDARD</p>
            <h2>Clean is the beginning.<br /><em>Exceptional is the goal.</em></h2>
          </div>
          <p className="intro-copy">North Splash Auto Luxe brings a premium mindset to automotive care. Every service is built around the condition of your vehicle, the finish you want, and the experience you expect.</p>
        </section>

        <section id="services" className="section dark-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SERVICES</p>
              <h2>Care without shortcuts.</h2>
            </div>
            <p>From a polished daily driver to a full paint transformation, choose the level of care your vehicle needs.</p>
          </div>

          <div className="filter-row">
            {["All", "Detail", "Paint", "Ceramic"].map((filter) => (
              <button key={filter} className={serviceFilter === filter ? "filter active" : "filter"} onClick={() => setServiceFilter(filter)}>
                {filter}
              </button>
            ))}
          </div>

          <div className="service-grid">
            {filteredServices.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="service-body">
                  <div className="card-top">
                    <h3>{service.title}</h3>
                    <strong>{money(service.price)}<small>+</small></strong>
                  </div>
                  <p>{service.desc}</p>
                  <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  <button className="text-link" onClick={() => scrollTo("booking")}>Book service <span>↗</span></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="packages" className="section">
          <div className="center-heading">
            <p className="eyebrow">SIGNATURE PACKAGES</p>
            <h2>Choose your level of Luxe.</h2>
            <p>Simple starting prices. Personalized service. A finish that speaks for itself.</p>
          </div>

          <div className="package-grid">
            {packages.map((pack, index) => (
              <article className={`package-card ${pack.featured ? "featured" : ""}`} key={pack.name}>
                <span className="package-tag">{pack.tag}</span>
                <h3>{pack.name}</h3>
                <div className="package-price">{money(pack.price)}<small>+</small></div>
                <p>{pack.desc}</p>
                <ul>{pack.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
                <button className="button dark" onClick={() => { setSelectedPackage(index); scrollTo("booking"); }}>Choose {pack.name}</button>
              </article>
            ))}
          </div>

          <div className="pricing-note">
            <strong>Vehicle-size pricing:</strong> Sedan/Coupe +$0 · Small SUV/Crossover +$25 · Large SUV/Truck +$50 · Three-Row SUV/Large Truck +$75. Final pricing may vary by condition.
          </div>
        </section>

        <section id="protection" className="split-section">
          <div className="split-image">
            <img src={`${IMG}ceramic-coating.jpg`} alt="Ceramic coating application on a luxury vehicle" />
          </div>
          <div className="split-content">
            <p className="eyebrow">LUXE PROTECTION</p>
            <h2>More than shine.<br /><em>Built to protect.</em></h2>
            <p>Our ceramic coating service combines meticulous preparation with long-lasting hydrophobic protection. The result is deeper gloss, easier maintenance, and a finish built for the road.</p>
            <div className="protection-levels">
              <div><span>1 YEAR</span><strong>$650+</strong></div>
              <div><span>3 YEAR</span><strong>$950+</strong></div>
              <div><span>5 YEAR</span><strong>$1,250+</strong></div>
            </div>
            <button className="button dark" onClick={() => scrollTo("booking")}>Request Coating Quote</button>
          </div>
        </section>

        <section className="section dark-section addons">
          <div className="section-heading">
            <div>
              <p className="eyebrow">LUXE ADD-ONS</p>
              <h2>Make it yours.</h2>
            </div>
            <p>Build your service around what your vehicle actually needs.</p>
          </div>
          <div className="addon-grid">
            {addOns.map(([name, price], index) => (
              <button key={name} className={`addon ${selectedAddOns.includes(index) ? "selected" : ""}`} onClick={() => toggleAddOn(index)}>
                <span>{name}</span><strong>+{money(price)}</strong>
              </button>
            ))}
          </div>
        </section>

        <section id="gallery" className="section gallery-section">
          <div className="center-heading">
            <p className="eyebrow">THE LUXE COLLECTION</p>
            <h2>Made to be seen.</h2>
            <p>Premium vehicles. Precise finishes. Attention to the details that change the whole look.</p>
          </div>
          <div className="gallery">
            <div className="gallery-large"><img src={`${IMG}gallery-01.jpg`} alt="Luxury vehicle exterior" /></div>
            <div><img src={`${IMG}gallery-02.jpg`} alt="Detailed vehicle interior" /></div>
            <div><img src={`${IMG}gallery-03.jpg`} alt="Polished sports car" /></div>
            <div><img src={`${IMG}gallery-04.jpg`} alt="Premium wheel and tire detail" /></div>
            <div><img src={`${IMG}gallery-05.jpg`} alt="Glossy black vehicle" /></div>
          </div>
        </section>

        <section className="luxury-banner">
          <img src={`${IMG}exotic-car.jpg`} alt="Exotic vehicle" />
          <div className="luxury-overlay" />
          <div className="luxury-content">
            <p className="eyebrow">THE LUXE COLLECTION</p>
            <h2>Luxury vehicles<br />deserve luxury care.</h2>
            <p>Specialized service for premium, exotic, collector, and specialty vehicles.</p>
            <button className="button ghost" onClick={() => scrollTo("contact")}>Request a Custom Quote</button>
          </div>
        </section>

        <section id="membership" className="section">
          <div className="center-heading">
            <p className="eyebrow">LUXE MEMBERSHIP</p>
            <h2>Don't wait until your car needs rescuing.</h2>
            <p>Keep the finish you love with a maintenance plan built around consistency.</p>
          </div>
          <div className="membership-grid">
            {memberships.map((plan) => (
              <article className="membership-card" key={plan.name}>
                <p className="eyebrow">{plan.name.toUpperCase()}</p>
                <div className="member-price">{money(plan.price)}<small>/month</small></div>
                <p>{plan.desc}</p>
                <ul>{plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
                <button className="text-link" onClick={() => scrollTo("contact")}>Ask about membership <span>↗</span></button>
              </article>
            ))}
          </div>
        </section>

        <section className="concierge">
          <div>
            <p className="eyebrow">LUXE CONCIERGE</p>
            <h2>We can come to you.</h2>
            <p>Home. Office. Garage. Wherever your vehicle lives. Mobile/concierge availability depends on location and service requirements.</p>
          </div>
          <button className="button primary" onClick={() => scrollTo("booking")}>Request Mobile Service</button>
        </section>

        <section className="section process-section">
          <div className="center-heading">
            <p className="eyebrow">THE PROCESS</p>
            <h2>Simple from booking to pickup.</h2>
          </div>
          <div className="process-grid">
            {[
              ["01", "Choose Your Service", "Select the package or service your vehicle needs."],
              ["02", "Tell Us About Your Vehicle", "Share the year, make, model, size, and condition."],
              ["03", "Schedule", "Choose your preferred appointment date and time."],
              ["04", "Experience Auto Luxe", "Drop off or request concierge service."],
              ["05", "Drive Away Different", "Leave with a vehicle ready to be noticed."],
            ].map(([number, title, desc]) => (
              <div className="process-card" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="booking" className="section booking-section">
          <div className="booking-copy">
            <p className="eyebrow">BUILD YOUR LUXE SERVICE</p>
            <h2>Get an instant starting estimate.</h2>
            <p>Select a package, vehicle size, condition, and optional add-ons. This is an estimate only. Final pricing can be confirmed after vehicle inspection.</p>
            <div className="estimate-box">
              <span>Estimated starting total</span>
              <strong>{money(estimated)}</strong>
              <small>Before any custom-service adjustments</small>
            </div>
          </div>

          <form className="booking-form" onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}>
            <div className="form-group">
              <label>Package</label>
              <div className="choice-grid">
                {packages.map((pack, index) => (
                  <button type="button" key={pack.name} className={selectedPackage === index ? "choice active" : "choice"} onClick={() => setSelectedPackage(index)}>
                    <span>{pack.name}</span><strong>{money(pack.price)}+</strong>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Vehicle size</label>
              <select value={vehicle} onChange={(e) => setVehicle(Number(e.target.value))}>
                {vehicleSizes.map((item, index) => <option key={item.name} value={index}>{item.name}{item.extra ? ` (+$${item.extra})` : ""}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Vehicle condition</label>
              <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                <option>Light</option>
                <option>Moderate</option>
                <option>Heavy</option>
                <option>Severe</option>
              </select>
            </div>

            <div className="form-group">
              <label>Optional add-ons</label>
              <div className="mini-addon-grid">
                {addOns.map(([name, price], index) => (
                  <button type="button" key={name} className={selectedAddOns.includes(index) ? "mini-addon active" : "mini-addon"} onClick={() => toggleAddOn(index)}>
                    {name}<span>+${price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-fields">
              <input required placeholder="Full name" />
              <input required type="tel" placeholder="Phone number" />
              <input required type="email" placeholder="Email address" />
              <input placeholder="Year / Make / Model" />
            </div>

            <textarea placeholder="Tell us anything we should know about your vehicle..." rows="4" />
            <button className="button dark full" type="submit">{formSent ? "Request Ready ✓" : "Request My Appointment"}</button>
            {formSent && <p className="success-message">Your request has been prepared. Connect this form to your preferred form/booking service to receive submissions.</p>}
          </form>
        </section>

        <section className="section faq-section">
          <div className="faq-title">
            <p className="eyebrow">FAQ</p>
            <h2>Questions, answered.</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <div className="faq-item" key={question}>
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  <span>{question}</span><span>{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index && <p>{answer}</p>}
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div>
            <p className="eyebrow">NORTH SPLASH AUTO LUXE</p>
            <h2>Your vehicle.<br /><em>Our standard.</em></h2>
            <p>Ready to elevate the finish? Let's build the right service for your vehicle.</p>
          </div>
          <div className="contact-actions">
            <a href="tel:3309903956" className="contact-line">330-990-3956</a>
            <a href="mailto:support@northsplash.com" className="contact-line">support@northsplash.com</a>
            <button className="button primary" onClick={() => scrollTo("booking")}>Book Auto Luxe</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-mark">NS</span>
          <div><strong>NORTH SPLASH</strong><small>AUTO LUXE</small></div>
        </div>
        <p>Premium automotive care. Built around the finish.</p>
        <div className="footer-links">
          <button onClick={() => scrollTo("services")}>Services</button>
          <button onClick={() => scrollTo("packages")}>Packages</button>
          <button onClick={() => scrollTo("booking")}>Book</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
        </div>
        <small>© 2026 North Splash Auto Luxe. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default App;

