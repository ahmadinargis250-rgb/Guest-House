import { useState, useEffect } from "react";

const rooms = [
  { id: 1, name: "Standard Room", type: "Cozy & Comfortable", price: "$80 / night", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", beds: "1 King Bed", guests: "2 Guests", size: "25 m²", desc: "A warm and cozy room perfect for solo travelers or couples.", features: ["Free WiFi", "Air Conditioning", "TV", "Private Bathroom"] },
  { id: 2, name: "Deluxe Room", type: "Spacious & Stylish", price: "$130 / night", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80", beds: "1 King Bed", guests: "2 Guests", size: "35 m²", desc: "A stylish and spacious room with premium furnishings and a beautiful view.", features: ["Free WiFi", "Air Conditioning", "Smart TV", "Mini Bar", "Balcony"] },
  { id: 3, name: "Family Suite", type: "Perfect for Families", price: "$200 / night", image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80", beds: "2 Queen Beds", guests: "4 Guests", size: "55 m²", desc: "A large suite designed for families with two bedrooms and a living area.", features: ["Free WiFi", "Kitchenette", "Living Room", "2 Bathrooms"] },
  { id: 4, name: "Presidential Suite", type: "Ultimate Luxury", price: "$350 / night", image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80", beds: "1 King Bed + Sofa", guests: "3 Guests", size: "80 m²", desc: "The finest room with a private jacuzzi, butler service and breathtaking views.", features: ["Butler Service", "Jacuzzi", "Private Bar", "Panoramic View"] },
];

const FONT = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Montserrat:wght@300;400;500;600&display=swap";

// ── RESPONSIVE HOOK ──
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => { setMenuOpen(false); }, [page]);

  const go = (p) => setPage(p);

  // ── NAV (non-home) ──
  const NAV = (
    <nav style={{
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: isMobile ? "14px 18px" : "22px 60px",
      background: "rgba(10,10,10,0.97)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      boxSizing: "border-box",
    }}>
      <div onClick={() => go("home")} style={{
        fontFamily: "Cormorant Garamond, serif",
        fontSize: isMobile ? 16 : 22,
        fontWeight: 600, letterSpacing: 2, color: "#fff",
        textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap",
      }}>
        The <span style={{ color: "#c9a96e" }}>Serenity</span> House
      </div>

      {!isMobile && (
        <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }}>
          {["Home", "Rooms", "Services", "About"].map((item) => (
            <li key={item}>
              <a href="#" onClick={(e) => { e.preventDefault(); go(item.toLowerCase()); }}
                style={{ color: page === item.toLowerCase() ? "#c9a96e" : "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontWeight: 500 }}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      )}

      {!isMobile && (
        <button onClick={() => go("rooms")} style={{ background: "#c9a96e", border: "none", color: "#1a1205", padding: "10px 26px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontWeight: 600, whiteSpace: "nowrap" }}>
          Book Now
        </button>
      )}

      {isMobile && (
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: "6px", flexShrink: 0 }}>
          <span style={{ display: "block", width: 22, height: 2, background: menuOpen ? "#c9a96e" : "#fff", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#fff", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, background: menuOpen ? "#c9a96e" : "#fff", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      )}

      {isMobile && menuOpen && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "rgba(10,10,10,0.99)", borderBottom: "1px solid rgba(201,169,110,0.2)", zIndex: 300 }}>
          {["Home", "Rooms", "Services", "About"].map((item) => (
            <a key={item} href="#" onClick={(e) => { e.preventDefault(); go(item.toLowerCase()); }}
              style={{ display: "block", padding: "15px 20px", color: page === item.toLowerCase() ? "#c9a96e" : "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {item}
            </a>
          ))}
          <div style={{ padding: "14px 20px 18px" }}>
            <button onClick={() => go("rooms")} style={{ width: "100%", background: "#c9a96e", border: "none", color: "#1a1205", padding: "13px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontWeight: 700 }}>
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  // ── SERVICES PAGE ──
  if (page === "services") {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff", fontFamily: "Montserrat, sans-serif" }}>
        <link href={FONT} rel="stylesheet" />
        {NAV}

        {/* Hero */}
        <div style={{ position: "relative", height: isMobile ? "38vh" : "55vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginTop: isMobile ? 52 : 0 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(10,10,10,1))" }} />
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px" }}>
            <span style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 12 }}>✦ What We Provide ✦</span>
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 36 : 68, fontWeight: 300, color: "#fff", margin: 0, lineHeight: 1.1 }}>Our Services</h1>
            <div style={{ width: 50, height: 1, background: "#c9a96e", margin: "14px auto 0" }} />
          </div>
        </div>

        {/* Heading */}
        <div style={{ textAlign: "center", padding: isMobile ? "32px 20px 16px" : "60px 60px 20px" }}>
          <span style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 14 }}>✦ Everything You Need ✦</span>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 28 : 48, fontWeight: 300, color: "#fff", marginBottom: 12 }}>Facilities & Services</h2>
          <div style={{ width: 50, height: 1, background: "#c9a96e", margin: "0 auto" }} />
        </div>

        {/* Service Cards */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 16, padding: isMobile ? "16px 16px 40px" : "40px 60px 60px" }}>
          {[
            { icon: "📶", title: "Internet & Technology", text: "Free high-speed Wi-Fi, television in every room, charging points, and a work desk so you stay connected and productive." },
            { icon: "🛏", title: "Room Comfort", text: "Comfortable beds, clean bedsheets, air conditioning, private bathrooms with hot and cold water, and wardrobe storage." },
            { icon: "🍳", title: "Food & Drinks", text: "Fresh breakfast every morning, tea and coffee service, nearby restaurant options, and kitchen access for guests." },
            { icon: "🧹", title: "Cleaning & Maintenance", text: "Daily housekeeping, clean fresh towels, and a full laundry service to keep your room spotless throughout your stay." },
            { icon: "🛎", title: "Guest Support", text: "24-hour reception, tourist information, taxi booking, and airport pickup. Our team is always ready to help you." },
            { icon: "🔒", title: "Safety & Security", text: "Security cameras, safe parking, secure door locks, and fire safety equipment so every guest feels completely safe." },
          ].map((card, i) => (
            <div key={i}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.12)"; }}
              style={{ background: "#141414", border: "1px solid rgba(201,169,110,0.12)", padding: isMobile ? "24px 18px" : "36px 28px", transition: "all 0.4s ease" }}>
              <div style={{ fontSize: isMobile ? 32 : 40, marginBottom: 14 }}>{card.icon}</div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 20 : 24, color: "#c9a96e", marginBottom: 10 }}>{card.title}</div>
              <p style={{ fontSize: isMobile ? 13 : 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: 0 }}>{card.text}</p>
            </div>
          ))}
        </div>

        {/* 3D Image Section */}
        <div style={{ padding: isMobile ? "32px 16px" : "80px 60px", display: "flex", alignItems: "center", gap: isMobile ? 24 : 70, background: "#0d0d0d", flexDirection: "column" }}>
          <div style={{ width: "100%", maxWidth: isMobile ? "100%" : 480 }}>
            <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80" alt="Facilities"
              style={{ width: "100%", height: isMobile ? 220 : 420, objectFit: "cover", boxShadow: "0 20px 60px rgba(0,0,0,0.6)", display: "block" }} />
          </div>
          <div style={{ width: "100%" }}>
            <span style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 14 }}>✦ Complete Comfort ✦</span>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 28 : 46, fontWeight: 300, color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>Everything Ready<br />For Your Stay</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.9, marginBottom: 12 }}>We have carefully designed every aspect of our guest house to make sure you have everything you need the moment you arrive.</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.9, marginBottom: 24 }}>From check-in to checkout, our team and facilities are here to make your stay as comfortable as possible.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {["Free Wi-Fi", "Comfortable Rooms", "Breakfast Service", "Free Parking", "24-Hour Reception", "Laundry Service", "Airport Pickup", "Security System"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "rgba(255,255,255,0.65)" }}>
                  <div style={{ width: 5, height: 5, background: "#c9a96e", borderRadius: "50%", flexShrink: 0 }} />{f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Icons Strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid rgba(255,255,255,0.05)", background: "#111" }}>
          {[{ e: "📶", l: "Wi-Fi" }, { e: "🛏", l: "Rooms" }, { e: "🍳", l: "Breakfast" }, { e: "🚗", l: "Parking" }, { e: "🧺", l: "Laundry" }, { e: "🔒", l: "Security" }].map((s, i) => (
            <div key={i} style={{ padding: isMobile ? "18px 8px" : "30px 16px", textAlign: "center", borderRight: (i + 1) % 3 !== 0 ? "1px solid rgba(255,255,255,0.05)" : "none", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <span style={{ fontSize: isMobile ? 22 : 28, display: "block", marginBottom: 8 }}>{s.e}</span>
              <span style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── ABOUT PAGE ──
  if (page === "about") {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff", fontFamily: "Montserrat, sans-serif" }}>
        <link href={FONT} rel="stylesheet" />
        {NAV}

        {/* Hero */}
        <div style={{ position: "relative", height: isMobile ? "38vh" : "60vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginTop: isMobile ? 52 : 0 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(10,10,10,1))" }} />
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px" }}>
            <span style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 12 }}>✦ Our Story ✦</span>
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 40 : 72, fontWeight: 300, color: "#fff", margin: 0, lineHeight: 1.1 }}>About Us</h1>
            <div style={{ width: 50, height: 1, background: "#c9a96e", margin: "16px auto 0" }} />
          </div>
        </div>

        {/* Intro Quote */}
        <div style={{ padding: isMobile ? "32px 20px" : "80px" }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 16 : 22, fontWeight: 300, color: "rgba(255,255,255,0.75)", lineHeight: 1.9, maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            "Our guest house is a comfortable and peaceful place for travelers who want a relaxing stay. We provide clean rooms, friendly service, and a welcoming environment for visitors from all around the world."
          </p>
        </div>

        {/* 3 Cards */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 16, padding: isMobile ? "0 16px 40px" : "0 60px 60px" }}>
          {[
            { icon: "📍", title: "Our Location", text: "Located in a quiet and beautiful area close to the city center, restaurants, and tourist attractions." },
            { icon: "🏨", title: "Hospitality", text: "Our friendly staff is always ready to help guests. We believe in providing warm hospitality and making every guest feel at home." },
            { icon: "🎯", title: "Our Mission", text: "To provide a safe, clean, and affordable place for travelers while delivering excellent service and comfort." },
          ].map((card, i) => (
            <div key={i}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.15)"; }}
              style={{ background: "#141414", border: "1px solid rgba(201,169,110,0.15)", padding: isMobile ? "24px 18px" : "40px 32px", transition: "all 0.4s ease" }}>
              <div style={{ fontSize: isMobile ? 30 : 36, marginBottom: 16 }}>{card.icon}</div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 22 : 26, fontWeight: 600, color: "#c9a96e", marginBottom: 12 }}>{card.title}</div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: 0 }}>{card.text}</p>
            </div>
          ))}
        </div>

        {/* Facilities Grid */}
        <div style={{ padding: isMobile ? "32px 16px" : "60px", background: "#0f0f0f" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 14 }}>✦ What We Offer ✦</span>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 28 : 48, fontWeight: 300, color: "#fff", marginBottom: 12 }}>Rooms & Facilities</h2>
            <div style={{ width: 50, height: 1, background: "#c9a96e", margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 12 }}>
            {["Comfortable Rooms", "Free Wi-Fi", "Clean Bathrooms", "Air Conditioning", "Breakfast Service", "Parking Space", "Daily Housekeeping", "24/7 Concierge", "Security & Safety"].map((f, i) => (
              <div key={i}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)"; e.currentTarget.style.transform = "translateX(6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateX(0)"; }}
                style={{ display: "flex", alignItems: "center", gap: 14, padding: isMobile ? "16px 18px" : "20px 24px", border: "1px solid rgba(255,255,255,0.06)", background: "#141414", transition: "all 0.3s" }}>
                <div style={{ width: 7, height: 7, background: "#c9a96e", borderRadius: "50%", flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", letterSpacing: 1 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story section */}
        <div style={{ padding: isMobile ? "32px 16px" : "80px 60px", display: "flex", alignItems: "center", gap: isMobile ? 24 : 80, flexDirection: "column" }}>
          <div style={{ width: "100%" }}>
            <img src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80" alt="Our Story" style={{ width: "100%", height: isMobile ? 220 : 400, objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ width: "100%" }}>
            <span style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 14 }}>✦ Our Story ✦</span>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 28 : 46, fontWeight: 300, color: "#fff", marginBottom: 20, lineHeight: 1.2 }}>Established With<br />Love & Purpose</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 2, marginBottom: 14 }}>Our guest house was established to give travelers a peaceful place to rest and enjoy their journey.</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 2, margin: 0 }}>Every room and every smile from our staff reflects our dedication to making your stay unforgettable.</p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[{ num: "15+", label: "Years of Service" }, { num: "5K+", label: "Happy Guests" }, { num: "4.9★", label: "Average Rating" }, { num: "24/7", label: "Support" }].map((s, i) => (
            <div key={i} style={{ padding: isMobile ? "28px 10px" : "40px", textAlign: "center", borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none", boxSizing: "border-box" }}>
              <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 32 : 52, fontWeight: 300, color: "#c9a96e", display: "block" }}>{s.num}</span>
              <span style={{ fontSize: isMobile ? 9 : 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── ROOM DETAIL PAGE ──
  if (page === "roomDetail" && selectedRoom) {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff", fontFamily: "Montserrat, sans-serif" }}>
        <link href={FONT} rel="stylesheet" />
        {NAV}
        <div style={{ paddingTop: isMobile ? 52 : 80 }}>
          {/* Room Hero */}
          <div style={{ width: "100%", height: isMobile ? 260 : 480, overflow: "hidden", position: "relative" }}>
            <img src={selectedRoom.image} alt={selectedRoom.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
            <div style={{ position: "absolute", bottom: isMobile ? 18 : 40, left: isMobile ? 18 : 60 }}>
              <p style={{ fontSize: 10, letterSpacing: 3, color: "#c9a96e", textTransform: "uppercase", marginBottom: 8 }}>{selectedRoom.type}</p>
              <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 28 : 60, fontWeight: 300, color: "#fff", margin: 0, lineHeight: 1.1 }}>{selectedRoom.name}</h1>
            </div>
          </div>

          {/* Room Details */}
          <div style={{ display: "flex", gap: isMobile ? 24 : 60, padding: isMobile ? "24px 16px" : "60px", flexDirection: "column" }}>
            {/* Info */}
            <div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 2, marginBottom: 32 }}>{selectedRoom.desc}</p>
              <div style={{ display: "flex", gap: isMobile ? 20 : 40, marginBottom: 32, flexWrap: "wrap" }}>
                {[{ label: "Beds", val: selectedRoom.beds }, { label: "Guests", val: selectedRoom.guests }, { label: "Size", val: selectedRoom.size }].map((s, i) => (
                  <div key={i}>
                    <p style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#c9a96e", marginBottom: 6 }}>{s.label}</p>
                    <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, color: "#fff", margin: 0 }}>{s.val}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {selectedRoom.features.map((f, i) => (
                  <span key={i} style={{ border: "1px solid rgba(201,169,110,0.4)", color: "rgba(255,255,255,0.7)", padding: "8px 14px", fontSize: 11 }}>{f}</span>
                ))}
              </div>
            </div>

            {/* Booking Box */}
            <div style={{ background: "#141414", padding: isMobile ? 20 : 40, border: "1px solid rgba(255,255,255,0.08)", boxSizing: "border-box" }}>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 28 : 36, color: "#c9a96e", marginBottom: 4, marginTop: 0 }}>{selectedRoom.price}</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>per night, taxes included</p>
              <label style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 8 }}>Check In</label>
              <input type="date" style={{ width: "100%", background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "12px 14px", marginBottom: 18, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              <label style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 8 }}>Check Out</label>
              <input type="date" style={{ width: "100%", background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "12px 14px", marginBottom: 18, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              <label style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 8 }}>Guests</label>
              <select style={{ width: "100%", background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "12px 14px", marginBottom: 28, fontSize: 13, outline: "none", boxSizing: "border-box" }}>
                <option>1 Guest</option><option>2 Guests</option><option>3 Guests</option><option>4 Guests</option>
              </select>
              <button style={{ width: "100%", background: "#c9a96e", color: "#1a1205", border: "none", padding: "16px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: "pointer" }}>
                Book This Room
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── ROOMS PAGE ──
  if (page === "rooms") {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff", fontFamily: "Montserrat, sans-serif" }}>
        <link href={FONT} rel="stylesheet" />
        {NAV}
        <div style={{ textAlign: "center", padding: isMobile ? "80px 20px 30px" : "120px 20px 50px" }}>
          <span style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 14 }}>✦ Choose Your Stay ✦</span>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 36 : 64, fontWeight: 300, color: "#fff", marginBottom: 14 }}>Our Rooms</h1>
          <div style={{ width: 50, height: 1, background: "#c9a96e", margin: "0 auto" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 3, padding: isMobile ? "0 0 40px" : "0 3px 60px" }}>
          {rooms.map((room) => (
            <div key={room.id} style={{ position: "relative", overflow: "hidden", cursor: "pointer", height: isMobile ? 240 : 400 }}
              onClick={() => { setSelectedRoom(room); go("roomDetail"); }}>
              <img src={room.image} alt={room.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", display: "block" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0.05))" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? 16 : 30 }}>
                <p style={{ fontSize: 9, letterSpacing: 3, color: "#c9a96e", textTransform: "uppercase", marginBottom: 6 }}>{room.type}</p>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 20 : 32, fontWeight: 300, color: "#fff", marginBottom: 10 }}>{room.name}</h2>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 16 : 22, color: "#c9a96e" }}>{room.price}</span>
                  <button style={{ background: "#c9a96e", color: "#1a1205", border: "none", padding: isMobile ? "7px 14px" : "10px 24px", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, cursor: "pointer" }}>View Room</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── HOME PAGE ──
  return (
    <div style={{ fontFamily: "Montserrat, sans-serif", background: "#0a0a0a", color: "#fff" }}>
      <link href={FONT} rel="stylesheet" />

      {/* Home transparent nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "14px 18px" : "24px 60px",
        background: isMobile ? "rgba(10,10,10,0.95)" : "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
        boxSizing: "border-box",
      }}>
        <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 16 : 26, fontWeight: 600, letterSpacing: 2, color: "#fff", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          The <span style={{ color: "#c9a96e" }}>Serenity</span> House
        </div>

        {!isMobile && (
          <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }}>
            {["Home", "Rooms", "Services", "About"].map((item) => (
              <li key={item}>
                <a href="#" onClick={(e) => { e.preventDefault(); go(item.toLowerCase()); }}
                  style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", fontWeight: 500, cursor: "pointer" }}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        )}

        {!isMobile && (
          <button onClick={() => go("rooms")} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.6)", color: "#fff", padding: "10px 28px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>
            Book Now
          </button>
        )}

        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: "6px", flexShrink: 0 }}>
            <span style={{ display: "block", width: 22, height: 2, background: menuOpen ? "#c9a96e" : "#fff", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 2, background: "#fff", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 2, background: menuOpen ? "#c9a96e" : "#fff", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        )}

        {isMobile && menuOpen && (
          <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "rgba(10,10,10,0.99)", borderBottom: "1px solid rgba(201,169,110,0.2)", zIndex: 300 }}>
            {["Home", "Rooms", "Services", "About"].map((item) => (
              <a key={item} href="#" onClick={(e) => { e.preventDefault(); go(item.toLowerCase()); }}
                style={{ display: "block", padding: "15px 20px", color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {item}
              </a>
            ))}
            <div style={{ padding: "14px 20px 18px" }}>
              <button onClick={() => go("rooms")} style={{ width: "100%", background: "#c9a96e", border: "none", color: "#1a1205", padding: "13px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontWeight: 700 }}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.58)" }} />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: isMobile ? "0 20px" : "0 20px", maxWidth: 700, margin: "0 auto" }}>
          <span style={{ fontSize: isMobile ? 9 : 11, letterSpacing: isMobile ? 3 : 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: isMobile ? 14 : 20 }}>✦ Luxury Guest House ✦</span>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 40 : 90, fontWeight: 300, lineHeight: 1.08, color: "#fff", marginBottom: isMobile ? 12 : 16 }}>
            Where <em style={{ color: "#e8d5b0" }}>Comfort</em><br />Meets Elegance
          </h1>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 15 : 26, fontStyle: "italic", color: "rgba(255,255,255,0.7)", marginBottom: isMobile ? 32 : 48 }}>
            A sanctuary of warmth, beauty & unforgettable stays
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <button onClick={() => go("rooms")} style={{ background: "#c9a96e", color: "#1a1205", border: "none", padding: isMobile ? "14px 0" : "16px 44px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, cursor: "pointer", width: isMobile ? "100%" : "auto", maxWidth: isMobile ? 280 : "none" }}>
              Reserve Your Stay
            </button>
            <button onClick={() => go("rooms")} style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.55)", padding: isMobile ? "14px 0" : "16px 44px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", width: isMobile ? "100%" : "auto", maxWidth: isMobile ? 280 : "none" }}>
              Explore Rooms
            </button>
          </div>
        </div>

        {/* Stats bar — 2x2 grid on mobile, row on desktop */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "rgba(0,0,0,0.82)",
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        }}>
          {[{ num: "24", label: "Luxury Rooms" }, { num: "4.9★", label: "Guest Rating" }, { num: "15+", label: "Years Service" }, { num: "24/7", label: "Concierge" }].map((s, i) => (
            <div key={i} style={{
              padding: isMobile ? "16px 10px" : "24px 20px",
              textAlign: "center",
              borderRight: isMobile ? (i % 2 === 0 ? "1px solid rgba(255,255,255,0.08)" : "none") : (i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none"),
              borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 22 : 28, fontWeight: 600, color: "#c9a96e" }}>{s.num}</div>
              <div style={{ fontSize: isMobile ? 8 : 10, letterSpacing: isMobile ? 1 : 2, textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
