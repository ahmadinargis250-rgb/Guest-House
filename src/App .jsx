import { useState } from "react";
import "./App.css";

const rooms = [
  { id: 1, name: "Standard Room", type: "Cozy & Comfortable", price: "$80 / night", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", beds: "1 King Bed", guests: "2 Guests", size: "25 m²", desc: "A warm and cozy room perfect for solo travelers or couples.", features: ["Free WiFi", "Air Conditioning", "TV", "Private Bathroom"] },
  { id: 2, name: "Deluxe Room", type: "Spacious & Stylish", price: "$130 / night", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80", beds: "1 King Bed", guests: "2 Guests", size: "35 m²", desc: "A stylish and spacious room with premium furnishings and a beautiful view.", features: ["Free WiFi", "Air Conditioning", "Smart TV", "Mini Bar", "Balcony"] },
  { id: 3, name: "Family Suite", type: "Perfect for Families", price: "$200 / night", image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80", beds: "2 Queen Beds", guests: "4 Guests", size: "55 m²", desc: "A large suite designed for families with two bedrooms and a living area.", features: ["Free WiFi", "Kitchenette", "Living Room", "2 Bathrooms"] },
  { id: 4, name: "Presidential Suite", type: "Ultimate Luxury", price: "$350 / night", image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80", beds: "1 King Bed + Sofa", guests: "3 Guests", size: "80 m²", desc: "The finest room with a private jacuzzi, butler service and breathtaking views.", features: ["Butler Service", "Jacuzzi", "Private Bar", "Panoramic View"] },
];

const FONT = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Montserrat:wght@300;400;500;600&display=swap";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedRoom, setSelectedRoom] = useState(null);

  const NAV = (
    <nav style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 60px", background: "rgba(10,10,10,0.96)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div onClick={() => setPage("home")} style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 600, letterSpacing: 3, color: "#fff", textTransform: "uppercase", cursor: "pointer" }}>
        The <span style={{ color: "#c9a96e" }}>Serenity</span> House
      </div>
      <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }}>
        {["Home", "Rooms", "Services", "About"].map((item) => (
          <li key={item}>
            <a href="#" onClick={(e) => { e.preventDefault(); if (item === "Home") setPage("home"); if (item === "Rooms") setPage("rooms"); if (item === "About") setPage("about"); if (item === "Services") setPage("services"); }}
              style={{ color: page === item.toLowerCase() ? "#c9a96e" : "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontWeight: 500 }}>{item}</a>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage("rooms")} style={{ background: "#c9a96e", border: "none", color: "#1a1205", padding: "10px 26px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontWeight: 600 }}>Book Now</button>
    </nav>
  );

  // ── SERVICES PAGE ──
  if (page === "services") {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff", fontFamily: "Montserrat, sans-serif" }}>
        <link href={FONT} rel="stylesheet" />
        {NAV}

        {/* Hero */}
        <div style={{ position: "relative", height: "55vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(10,10,10,1))" }} />
          <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
            <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ What We Provide ✦</span>
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 68, fontWeight: 300, color: "#fff" }}>Our Services</h1>
            <div style={{ width: 60, height: 1, background: "#c9a96e", margin: "16px auto 0" }} />
          </div>
        </div>

        {/* Section heading */}
        <div style={{ textAlign: "center", padding: "60px 60px 20px" }}>
          <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ Everything You Need ✦</span>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 48, fontWeight: 300, color: "#fff", marginBottom: 12 }}>Facilities & Services</h2>
          <div style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto" }} />
        </div>

        {/* 6 Service Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, padding: "40px 60px 60px" }}>
          {[
            { icon: "📶", title: "Internet & Technology", text: "Free high-speed Wi-Fi, television in every room, charging points, and a work desk so you stay connected and productive." },
            { icon: "🛏", title: "Room Comfort", text: "Comfortable beds, clean bedsheets, air conditioning, private bathrooms with hot and cold water, and wardrobe storage." },
            { icon: "🍳", title: "Food & Drinks", text: "Fresh breakfast every morning, tea and coffee service, nearby restaurant options, and kitchen access for guests." },
            { icon: "🧹", title: "Cleaning & Maintenance", text: "Daily housekeeping, clean fresh towels, and a full laundry service to keep your room spotless throughout your stay." },
            { icon: "🛎", title: "Guest Support", text: "24-hour reception, tourist information, taxi booking, and airport pickup. Our team is always ready to help you." },
            { icon: "🔒", title: "Safety & Security", text: "Security cameras, safe parking, secure door locks, and fire safety equipment so every guest feels completely safe." },
          ].map((card, i) => (
            <div key={i}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(201,169,110,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
              style={{ background: "#141414", border: "1px solid rgba(201,169,110,0.12)", padding: "36px 28px", transition: "all 0.4s ease", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 40, marginBottom: 18 }}>{card.icon}</div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, color: "#c9a96e", marginBottom: 12 }}>{card.title}</div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.9 }}>{card.text}</p>
            </div>
          ))}
        </div>

        {/* 3D Image Section */}
        <div style={{ padding: "80px 60px", display: "flex", alignItems: "center", gap: 70, background: "#0d0d0d", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 300, perspective: "1000px" }}>
            <img
              src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80"
              alt="Facilities"
              onMouseEnter={e => { e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg)"; e.currentTarget.style.boxShadow = "0 30px 80px rgba(201,169,110,0.2), 0 0 0 1px rgba(201,169,110,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "rotateY(-8deg) rotateX(4deg)"; e.currentTarget.style.boxShadow = "-20px 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.2)"; }}
              style={{ width: "100%", height: 420, objectFit: "cover", transform: "rotateY(-8deg) rotateX(4deg)", boxShadow: "-20px 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.2)", transition: "transform 0.6s ease, box-shadow 0.6s ease", display: "block" }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 300 }}>
            <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ Complete Comfort ✦</span>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 46, fontWeight: 300, color: "#fff", lineHeight: 1.2, marginBottom: 24 }}>Everything Ready<br />For Your Stay</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 2, marginBottom: 16 }}>We have carefully designed every aspect of our guest house to make sure you have everything you need the moment you arrive.</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 2, marginBottom: 28 }}>From check-in to checkout, our team and facilities are here to make your stay as comfortable as possible.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {["Free Wi-Fi", "Comfortable Rooms", "Breakfast Service", "Free Parking", "24-Hour Reception", "Laundry Service", "Airport Pickup", "Security System"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "rgba(255,255,255,0.65)" }}>
                  <div style={{ width: 6, height: 6, background: "#c9a96e", borderRadius: "50%", flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Icons Strip */}
        <div style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.05)", background: "#111" }}>
          {[{ e: "📶", l: "Free Wi-Fi" }, { e: "🛏", l: "Rooms" }, { e: "🍳", l: "Breakfast" }, { e: "🚗", l: "Parking" }, { e: "🧺", l: "Laundry" }, { e: "🔒", l: "Security" }].map((s, i) => (
            <div key={i}
              onMouseEnter={e => e.currentTarget.style.background = "#161616"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              style={{ flex: 1, padding: "30px 16px", textAlign: "center", borderRight: i < 5 ? "1px solid rgba(255,255,255,0.05)" : "none", transition: "background 0.3s" }}>
              <span style={{ fontSize: 28, display: "block", marginBottom: 10 }}>{s.e}</span>
              <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{s.l}</span>
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
        <div style={{ position: "relative", height: "60vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(10,10,10,1))" }} />
          <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
            <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ Our Story ✦</span>
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 72, fontWeight: 300, color: "#fff" }}>About Us</h1>
            <div style={{ width: 60, height: 1, background: "#c9a96e", margin: "20px auto 0" }} />
          </div>
        </div>
        <div style={{ padding: "80px", textAlign: "center" }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 300, color: "rgba(255,255,255,0.75)", lineHeight: 1.9, maxWidth: 800, margin: "0 auto" }}>
            "Our guest house is a comfortable and peaceful place for travelers who want a relaxing stay. We provide clean rooms, friendly service, and a welcoming environment for visitors from all around the world."
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, padding: "0 60px 60px" }}>
          {[
            { icon: "📍", title: "Our Location", text: "Located in a quiet and beautiful area close to the city center, restaurants, and tourist attractions." },
            { icon: "🏨", title: "Hospitality", text: "Our friendly staff is always ready to help guests. We believe in providing warm hospitality and making every guest feel at home." },
            { icon: "🎯", title: "Our Mission", text: "To provide a safe, clean, and affordable place for travelers while delivering excellent service and comfort." },
          ].map((card, i) => (
            <div key={i}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-12px)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(201,169,110,0.15)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.15)"; }}
              style={{ background: "#141414", border: "1px solid rgba(201,169,110,0.15)", padding: "40px 32px", transition: "all 0.4s ease" }}>
              <div style={{ fontSize: 36, marginBottom: 20 }}>{card.icon}</div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 600, color: "#c9a96e", marginBottom: 14 }}>{card.title}</div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.9 }}>{card.text}</p>
            </div>
          ))}
        </div>
        <div style={{ padding: "60px", background: "#0f0f0f" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ What We Offer ✦</span>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 48, fontWeight: 300, color: "#fff", marginBottom: 12 }}>Rooms & Facilities</h2>
            <div style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {["Comfortable Rooms", "Free Wi-Fi", "Clean Bathrooms", "Air Conditioning", "Breakfast Service", "Parking Space", "Daily Housekeeping", "24/7 Concierge", "Security & Safety"].map((f, i) => (
              <div key={i}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)"; e.currentTarget.style.transform = "translateX(6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateX(0)"; }}
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px 24px", border: "1px solid rgba(255,255,255,0.06)", background: "#141414", transition: "all 0.3s" }}>
                <div style={{ width: 8, height: 8, background: "#c9a96e", borderRadius: "50%", flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", letterSpacing: 1 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "80px 60px", display: "flex", alignItems: "center", gap: 80, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <img src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80" alt="Our Story" style={{ width: "100%", height: 400, objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1, minWidth: 300 }}>
            <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ Our Story ✦</span>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 46, fontWeight: 300, color: "#fff", marginBottom: 24, lineHeight: 1.2 }}>Established With<br />Love & Purpose</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 2, marginBottom: 16 }}>Our guest house was established to give travelers a peaceful place to rest and enjoy their journey.</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 2 }}>Every room and every smile from our staff reflects our dedication to making your stay unforgettable.</p>
          </div>
        </div>
        <div style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[{ num: "15+", label: "Years of Service" }, { num: "5K+", label: "Happy Guests" }, { num: "4.9★", label: "Average Rating" }, { num: "24/7", label: "Support" }].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: "40px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 52, fontWeight: 300, color: "#c9a96e", display: "block" }}>{s.num}</span>
              <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{s.label}</span>
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
        <div style={{ paddingTop: 90 }}>
          <div style={{ width: "100%", height: 480, overflow: "hidden", position: "relative" }}>
            <img src={selectedRoom.image} alt={selectedRoom.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
            <div style={{ position: "absolute", bottom: 40, left: 60 }}>
              <p style={{ fontSize: 11, letterSpacing: 4, color: "#c9a96e", textTransform: "uppercase", marginBottom: 10 }}>{selectedRoom.type}</p>
              <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 60, fontWeight: 300, color: "#fff" }}>{selectedRoom.name}</h1>
            </div>
          </div>
          <div style={{ display: "flex", gap: 60, padding: "60px", flexWrap: "wrap" }}>
            <div style={{ flex: 2, minWidth: 300 }}>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 2, marginBottom: 40 }}>{selectedRoom.desc}</p>
              <div style={{ display: "flex", gap: 40, marginBottom: 40 }}>
                {[{ label: "Beds", val: selectedRoom.beds }, { label: "Guests", val: selectedRoom.guests }, { label: "Size", val: selectedRoom.size }].map((s, i) => (
                  <div key={i}>
                    <p style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#c9a96e", marginBottom: 6 }}>{s.label}</p>
                    <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, color: "#fff" }}>{s.val}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {selectedRoom.features.map((f, i) => (
                  <span key={i} style={{ border: "1px solid rgba(201,169,110,0.4)", color: "rgba(255,255,255,0.7)", padding: "8px 18px", fontSize: 11 }}>{f}</span>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 280, background: "#141414", padding: 40, border: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, color: "#c9a96e", marginBottom: 4 }}>{selectedRoom.price}</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 32 }}>per night, taxes included</p>
              <label style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 8 }}>Check In</label>
              <input type="date" style={{ width: "100%", background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "12px 16px", marginBottom: 20, fontSize: 13, outline: "none" }} />
              <label style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 8 }}>Check Out</label>
              <input type="date" style={{ width: "100%", background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "12px 16px", marginBottom: 20, fontSize: 13, outline: "none" }} />
              <label style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 8 }}>Guests</label>
              <select style={{ width: "100%", background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "12px 16px", marginBottom: 32, fontSize: 13, outline: "none" }}>
                <option>1 Guest</option><option>2 Guests</option><option>3 Guests</option><option>4 Guests</option>
              </select>
              <button style={{ width: "100%", background: "#c9a96e", color: "#1a1205", border: "none", padding: "18px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: "pointer" }}>Book This Room</button>
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
        <div style={{ textAlign: "center", padding: "120px 20px 50px" }}>
          <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ Choose Your Stay ✦</span>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 64, fontWeight: 300, color: "#fff", marginBottom: 16 }}>Our Rooms</h1>
          <div style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 3, padding: "0 3px 60px" }}>
          {rooms.map((room) => (
            <div key={room.id} style={{ position: "relative", overflow: "hidden", cursor: "pointer", height: 400 }}
              onClick={() => { setSelectedRoom(room); setPage("roomDetail"); }}>
              <img src={room.image} alt={room.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1))" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 30 }}>
                <p style={{ fontSize: 10, letterSpacing: 3, color: "#c9a96e", textTransform: "uppercase", marginBottom: 8 }}>{room.type}</p>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, fontWeight: 300, color: "#fff", marginBottom: 12 }}>{room.name}</h2>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, color: "#c9a96e" }}>{room.price}</span>
                  <button style={{ background: "#c9a96e", color: "#1a1205", border: "none", padding: "10px 24px", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, cursor: "pointer" }}>View Room</button>
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
      <nav style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 60px", background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)" }}>
        <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 600, letterSpacing: 3, color: "#fff", textTransform: "uppercase" }}>
          The <span style={{ color: "#c9a96e" }}>Serenity</span> House
        </div>
        <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }}>
          {["Home", "Rooms", "Services", "About"].map((item) => (
            <li key={item}>
              <a href="#" onClick={(e) => { e.preventDefault(); if (item === "Rooms") setPage("rooms"); if (item === "About") setPage("about"); if (item === "Services") setPage("services"); }}
                style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", fontWeight: 500, cursor: "pointer" }}>{item}</a>
            </li>
          ))}
        </ul>
        <button onClick={() => setPage("rooms")} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.6)", color: "#fff", padding: "10px 28px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>Book Now</button>
      </nav>
      <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px" }}>
          <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 20 }}>✦ Luxury Guest House ✦</span>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 90, fontWeight: 300, lineHeight: 1.05, color: "#fff", marginBottom: 16 }}>
            Where <em style={{ color: "#e8d5b0" }}>Comfort</em><br />Meets Elegance
          </h1>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontStyle: "italic", color: "rgba(255,255,255,0.7)", marginBottom: 48 }}>A sanctuary of warmth, beauty & unforgettable stays</p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
            <button onClick={() => setPage("rooms")} style={{ background: "#c9a96e", color: "#1a1205", border: "none", padding: "16px 44px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}>Reserve Your Stay</button>
            <button onClick={() => setPage("rooms")} style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.55)", padding: "16px 44px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer" }}>Explore Rooms</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.8)", display: "flex" }}>
          {[{ num: "24", label: "Luxury Rooms" }, { num: "4.9★", label: "Guest Rating" }, { num: "15+", label: "Years of Service" }, { num: "24/7", label: "Concierge" }].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: "24px 20px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 600, color: "#c9a96e" }}>{s.num}</div>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
