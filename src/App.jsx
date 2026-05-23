import { useState, useEffect, useRef } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import pic1 from "./assets/1.jpeg";
import pic2 from "./assets/12.jpeg";
import pic3 from "./assets/123.jpeg";
import pic4 from "./assets/1234.jpeg";
import pic5 from "./assets/12345.jpeg";

const FONT = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Montserrat:wght@300;400;500;600&display=swap";

const rooms = [
  { id: 1, name: "Standard Room",  type: "Cozy & Comfortable",   price: "PKR 3,000 / night", image: pic1, beds: "2 Beds",          guests: "2 Guests", size: "25 m²", desc: "A warm and cozy room with two comfortable beds, air conditioning, and purple LED ceiling lights.", features: ["Free WiFi", "Air Conditioning", "TV", "Private Bathroom", "Sofa"] },
  { id: 2, name: "Deluxe Room",    type: "Spacious & Stylish",   price: "PKR 4,500 / night", image: pic2, beds: "2 Beds",          guests: "3 Guests", size: "35 m²", desc: "A stylish black-themed room with a king bed, single bed, sofa, mirror, and purple LED ambiance.", features: ["Free WiFi", "Air Conditioning", "TV", "Mirror", "Sofa", "Private Bathroom"] },
  { id: 3, name: "Family Suite",   type: "Perfect for Families", price: "PKR 6,000 / night", image: pic3, beds: "2 Queen Beds",    guests: "4 Guests", size: "55 m²", desc: "A spacious family room with two queen beds, calligraphy wall art, sofa, and elegant marble walls.", features: ["Free WiFi", "Air Conditioning", "TV", "Sofa", "Marble Walls", "2 Bathrooms"] },
  { id: 4, name: "Triple Room",    type: "Great for Groups",     price: "PKR 5,500 / night", image: pic4, beds: "2 Beds + Sofa",  guests: "3 Guests", size: "45 m²", desc: "A comfortable room with two beds, a sofa, and warm decor — perfect for small groups or families.", features: ["Free WiFi", "Air Conditioning", "Sofa", "Private Bathroom", "Purple LED Lights"] },
];

// ── BOOKING COUNTER COMPONENT ──
function BookingCounter() {
  const [checkIn, setCheckIn]   = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests]     = useState("1");
  const [room, setRoom]         = useState("");
  const [step, setStep]         = useState(1); // 1=form, 2=confirm, 3=done
  const [bookingId, setBookingId] = useState("");
  const [count, setCount]       = useState(247); // live bookings counter

  useEffect(() => {
    const t = setInterval(() => {
      setCount(c => c + Math.floor(Math.random() * 2));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const nights = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000))
    : 0;

  const priceMap = { "Standard Room": 3000, "Deluxe Room": 4500, "Family Suite": 6000, "Triple Room": 5500 };
  const total = room ? (priceMap[room] || 0) * nights : 0;

  const handleBook = () => {
    if (!checkIn || !checkOut || !room || nights < 1) return;
    setBookingId("AGH-" + Math.floor(10000 + Math.random() * 90000));
    setStep(2);
  };

  const handleConfirm = () => {
    setCount(c => c + 1);
    setStep(3);
  };

  return (
    <div style={{ background: "#0f0f0f", padding: "90px 60px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ Reserve Your Room ✦</span>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 52, fontWeight: 300, color: "#fff", marginBottom: 12 }}>Book Your Stay</h2>
        <div style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto 20px" }} />
        {/* Live counter */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#1a1a1a", border: "1px solid rgba(201,169,110,0.2)", padding: "10px 24px" }}>
          <div style={{ width: 8, height: 8, background: "#4caf50", borderRadius: "50%", animation: "pulse 1.5s infinite" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
            <span style={{ color: "#c9a96e", fontWeight: 600, fontSize: 16 }}>{count}</span> guests booked this month
          </span>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }`}</style>

      <div className="booking-inner" style={{ maxWidth: 800, margin: "0 auto" }}>
        {step === 1 && (
          <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)", padding: 48 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
              {/* Check In */}
              <div>
                <label style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 10 }}>Check In Date</label>
                <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}
                  style={{ width: "100%", background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "14px 16px", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
              {/* Check Out */}
              <div>
                <label style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 10 }}>Check Out Date</label>
                <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}
                  style={{ width: "100%", background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "14px 16px", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
              {/* Guests */}
              <div>
                <label style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 10 }}>Number of Guests</label>
                <select value={guests} onChange={e => setGuests(e.target.value)}
                  style={{ width: "100%", background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "14px 16px", fontSize: 13, outline: "none", boxSizing: "border-box" }}>
                  {["1 Guest","2 Guests","3 Guests","4 Guests"].map(o => <option key={o} style={{ background: "#1e1e1e" }}>{o}</option>)}
                </select>
              </div>
              {/* Room */}
              <div>
                <label style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 10 }}>Select Room</label>
                <select value={room} onChange={e => setRoom(e.target.value)}
                  style={{ width: "100%", background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "14px 16px", fontSize: 13, outline: "none", boxSizing: "border-box" }}>
                  <option value="" style={{ background: "#1e1e1e" }}>-- Choose a Room --</option>
                  {rooms.map(r => <option key={r.id} style={{ background: "#1e1e1e" }}>{r.name} — {r.price}</option>)}
                </select>
              </div>
            </div>
            {/* Summary */}
            {nights > 0 && room && (
              <div style={{ background: "#1a1a1a", border: "1px solid rgba(201,169,110,0.2)", padding: "20px 24px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>{nights} night{nights > 1 ? "s" : ""} · {guests} · {room.split(" —")[0]}</div>
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, color: "#c9a96e" }}>PKR {total.toLocaleString()}</div>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "right" }}>
                  <div>{checkIn} → {checkOut}</div>
                  <div style={{ color: "#4caf50", marginTop: 4 }}>✓ Room Available</div>
                </div>
              </div>
            )}
            <button onClick={handleBook}
              style={{ width: "100%", background: nights > 0 && room ? "#c9a96e" : "#333", color: nights > 0 && room ? "#1a1205" : "#666", border: "none", padding: "18px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: nights > 0 && room ? "pointer" : "not-allowed", transition: "all 0.3s" }}>
              {nights > 0 && room ? "Proceed to Confirm Booking" : "Fill In All Details to Continue"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ background: "#141414", border: "1px solid rgba(201,169,110,0.3)", padding: 48, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>📋</div>
            <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 34, color: "#fff", marginBottom: 8 }}>Confirm Your Booking</h3>
            <div style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto 32px" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, textAlign: "left", marginBottom: 32 }}>
              {[
                { l: "Booking ID",   v: bookingId },
                { l: "Room",         v: room.split(" —")[0] },
                { l: "Check In",     v: checkIn },
                { l: "Check Out",    v: checkOut },
                { l: "Guests",       v: guests },
                { l: "Nights",       v: `${nights} night${nights > 1 ? "s" : ""}` },
                { l: "Total Amount", v: `PKR ${total.toLocaleString()}` },
                { l: "Status",       v: "Pending Confirmation" },
              ].map((item, i) => (
                <div key={i} style={{ background: "#1a1a1a", padding: "16px 20px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#c9a96e", marginBottom: 6 }}>{item.l}</div>
                  <div style={{ fontSize: 14, color: "#fff" }}>{item.v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "16px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>← Go Back</button>
              <button onClick={handleConfirm} style={{ flex: 2, background: "#c9a96e", color: "#1a1205", border: "none", padding: "16px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: "pointer" }}>✓ Confirm Booking</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ background: "#141414", border: "1px solid rgba(201,169,110,0.3)", padding: 60, textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
            <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 42, color: "#c9a96e", marginBottom: 16 }}>Booking Confirmed!</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 2, marginBottom: 8 }}>Thank you for choosing AL Hamid Guest House.</p>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, color: "#fff", marginBottom: 32 }}>Your Booking ID: <span style={{ color: "#c9a96e" }}>{bookingId}</span></p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 40 }}>We will contact you shortly to confirm your reservation. Please save your booking ID.</p>
            <button onClick={() => { setStep(1); setCheckIn(""); setCheckOut(""); setRoom(""); setGuests("1"); }}
              style={{ background: "#c9a96e", color: "#1a1205", border: "none", padding: "16px 48px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: "pointer" }}>
              Book Another Room
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── TRANSPARENT NAV (used on all pages) ──
function Nav({ page, setPage, solid }) {
  return (
    <nav className="main-nav" style={{
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 60px", height: 110,
      background: solid ? "rgba(8,8,8,0.92)" : "transparent",
      borderBottom: solid ? "1px solid rgba(255,255,255,0.05)" : "none",
      boxSizing: "border-box",
      backdropFilter: solid ? "blur(12px)" : "none",
      transition: "background 0.4s",
    }}>
      {/* Logo — left, alone */}
      <div onClick={() => setPage("home")} style={{ cursor: "pointer", flexShrink: 0, marginTop: 20 }}>
        <img src={logo} alt="AL Hamid Guest House" style={{ height: 140, width: "auto", objectFit: "contain", display: "block" }} />
      </div>

      {/* Nav links — centered absolutely, gap between each */}
      <ul style={{ display: "flex", gap: 44, listStyle: "none", margin: 0, padding: 0, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
        {["Home", "Rooms", "Services", "About"].map(item => (
          <li key={item}>
            <a href="#"
              onClick={e => { e.preventDefault(); setPage(item.toLowerCase()); }}
              style={{
                color: page === item.toLowerCase() ? "#c9a96e" : "rgba(255,255,255,0.85)",
                textDecoration: "none", fontSize: 11, letterSpacing: 3,
                textTransform: "uppercase", cursor: "pointer", fontWeight: 500,
                transition: "color 0.2s",
                paddingBottom: 4,
                borderBottom: page === item.toLowerCase() ? "1px solid #c9a96e" : "1px solid transparent",
              }}>{item}</a>
          </li>
        ))}
      </ul>

      {/* Book Now — right */}
      <button onClick={() => setPage("rooms")} style={{
        background: "#c9a96e", border: "none", color: "#1a1205",
        padding: "11px 28px", fontSize: 10, letterSpacing: 3,
        textTransform: "uppercase", cursor: "pointer", fontWeight: 700, flexShrink: 0,
      }}>Book Now</button>
    </nav>
  );
}

// ── ANIMATED ROOM CARD ──
function RoomCard({ room, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", overflow: "hidden", cursor: "pointer", height: 420,
        transform: hovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
        boxShadow: hovered ? "0 30px 80px rgba(201,169,110,0.25)" : "0 4px 20px rgba(0,0,0,0.4)",
        transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.5s",
      }}>
      <img src={room.image} alt={room.name} style={{
        width: "100%", height: "100%", objectFit: "cover",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        transition: "transform 0.6s ease",
      }} />
      {/* Gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: hovered ? "linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.15))" : "linear-gradient(to top, rgba(0,0,0,0.80), rgba(0,0,0,0.05))", transition: "background 0.4s" }} />

      {/* Gold border animation on hover */}
      <div style={{ position: "absolute", inset: 0, border: hovered ? "1px solid rgba(201,169,110,0.5)" : "1px solid transparent", transition: "border 0.4s", pointerEvents: "none" }} />

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "30px 30px 34px" }}>
        <p style={{ fontSize: 10, letterSpacing: 3, color: "#c9a96e", textTransform: "uppercase", marginBottom: 8 }}>{room.type}</p>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, fontWeight: 300, color: "#fff", marginBottom: 10 }}>{room.name}</h2>

        {/* Extra details slide up on hover */}
        <div style={{ overflow: "hidden", maxHeight: hovered ? 80 : 0, transition: "max-height 0.4s ease", marginBottom: hovered ? 14 : 0 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: "0 0 10px" }}>{room.beds} · {room.guests} · {room.size}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, color: "#c9a96e" }}>{room.price}</span>
          <button style={{
            background: hovered ? "#c9a96e" : "transparent",
            color: hovered ? "#1a1205" : "#c9a96e",
            border: "1px solid #c9a96e", padding: "9px 22px", fontSize: 10, letterSpacing: 2,
            textTransform: "uppercase", fontWeight: 700, cursor: "pointer",
            transition: "all 0.3s",
          }}>View Room</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage]               = useState("home");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [scrolled, setScrolled]       = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ────────────────────────────────────────
  // SERVICES PAGE
  // ────────────────────────────────────────
  if (page === "services") return (
    <div className="app-root" style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff", fontFamily: "Montserrat, sans-serif" }}>
      <link href={FONT} rel="stylesheet" />
      <Nav page={page} setPage={setPage} solid={false} />

      {/* Hero — full bleed photo, no nav background */}
      <div className="page-hero" style={{ position: "relative", height: "60vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src={pic5} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(10,10,10,1))" }} />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", paddingTop: 110 }}>
          <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ What We Provide ✦</span>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 72, fontWeight: 300, color: "#fff" }}>Our Services</h1>
          <div style={{ width: 60, height: 1, background: "#c9a96e", margin: "20px auto 0" }} />
        </div>
      </div>

      {/* Service cards */}
      <div style={{ textAlign: "center", padding: "70px 60px 30px" }}>
        <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ Everything You Need ✦</span>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 48, fontWeight: 300, color: "#fff", marginBottom: 12 }}>Facilities & Services</h2>
        <div style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto" }} />
      </div>
      <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, padding: "30px 60px 70px" }}>
        {[
          { icon: "📶", title: "Free High-Speed WiFi",    text: "Fast internet in every room and common area. Stay connected for work or leisure throughout your stay." },
          { icon: "🛏", title: "Premium Room Comfort",    text: "Fresh bedsheets daily, AC, private bathrooms with hot water, ceiling fans, and mood LED lighting." },
          { icon: "🍳", title: "Breakfast & Tea Service", text: "Start every morning with a freshly prepared breakfast and unlimited tea or coffee service." },
          { icon: "🧹", title: "Daily Housekeeping",      text: "Rooms are cleaned and fresh towels provided daily. Full laundry service also available." },
          { icon: "🛎", title: "24/7 Guest Support",      text: "Our front desk is open all night. We help with taxi booking, local info, and airport pickup." },
          { icon: "🔒", title: "Safety & Security",       text: "CCTV cameras, secure parking, fire safety equipment, and secure door locks in every room." },
          { icon: "🚗", title: "Free Parking",            text: "Spacious and secure parking area available for all guests at no extra charge." },
          { icon: "📺", title: "Entertainment",           text: "Flat-screen TV in every room with local and international channels for your entertainment." },
          { icon: "❄️", title: "Air Conditioning",        text: "Individual AC units in every room so you can set your perfect temperature any time." },
        ].map((card, i) => (
          <div key={i}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(201,169,110,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
            style={{ background: "#141414", border: "1px solid rgba(201,169,110,0.12)", padding: "36px 28px", transition: "all 0.4s ease" }}>
            <div style={{ fontSize: 40, marginBottom: 18 }}>{card.icon}</div>
            <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, color: "#c9a96e", marginBottom: 12 }}>{card.title}</div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.9 }}>{card.text}</p>
          </div>
        ))}
      </div>

      {/* Photo + text */}
      <div className="stack-mobile photo-text" style={{ padding: "80px 60px", display: "flex", alignItems: "center", gap: 70, background: "#0d0d0d", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <img src={pic3} alt="Facilities"
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 30px 80px rgba(201,169,110,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
            style={{ width: "100%", height: 420, objectFit: "cover", transition: "all 0.5s ease" }} />
        </div>
        <div style={{ flex: 1, minWidth: 300 }}>
          <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ Complete Comfort ✦</span>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 46, fontWeight: 300, color: "#fff", lineHeight: 1.2, marginBottom: 24 }}>Everything Ready<br />For Your Stay</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 2, marginBottom: 24 }}>We have carefully designed every room at AL Hamid Guest House to ensure maximum comfort and convenience for all our guests.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {["Free Wi-Fi", "Comfortable Rooms", "Breakfast Service", "Free Parking", "24-Hour Reception", "Laundry Service", "Airport Pickup", "Security System"].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "rgba(255,255,255,0.65)" }}>
                <div style={{ width: 6, height: 6, background: "#c9a96e", borderRadius: "50%", flexShrink: 0 }} />{f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking */}
      <BookingCounter />

      {/* Footer */}
      <Footer setPage={setPage} />
    </div>
  );

  // ────────────────────────────────────────
  // ABOUT PAGE
  // ────────────────────────────────────────
  if (page === "about") return (
    <div className="app-root" style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff", fontFamily: "Montserrat, sans-serif" }}>
      <link href={FONT} rel="stylesheet" />
      <Nav page={page} setPage={setPage} solid={false} />

      {/* Hero — transparent nav over photo */}
      <div className="page-hero" style={{ position: "relative", height: "65vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src={pic1} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(10,10,10,1))" }} />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", paddingTop: 110 }}>
          <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ Our Story ✦</span>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 80, fontWeight: 300, color: "#fff" }}>About AL Hamid</h1>
          <div style={{ width: 60, height: 1, background: "#c9a96e", margin: "20px auto 0" }} />
        </div>
      </div>

      {/* Quote */}
      <div style={{ padding: "80px 60px", textAlign: "center" }}>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.75)", lineHeight: 1.9, maxWidth: 800, margin: "0 auto" }}>
          "AL Hamid Guest House is a comfortable and peaceful place for travelers who want a relaxing stay. We provide clean rooms, friendly service, and a welcoming environment for visitors from all around the world."
        </p>
      </div>

      {/* 3 cards */}
      <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, padding: "0 60px 70px" }}>
        {[
          { icon: "📍", title: "Our Location",  text: "Located in a quiet and beautiful area close to the city center, restaurants, and tourist attractions. Easy access for all guests." },
          { icon: "🏨", title: "Hospitality",   text: "Our friendly staff is always ready to help guests. We believe in providing warm hospitality and making every guest feel at home." },
          { icon: "🎯", title: "Our Mission",   text: "To provide a safe, clean, and affordable place for travelers while delivering excellent service, comfort, and genuine warmth." },
        ].map((card, i) => (
          <div key={i}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-12px)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.15)"; }}
            style={{ background: "#141414", border: "1px solid rgba(201,169,110,0.15)", padding: "40px 32px", transition: "all 0.4s ease" }}>
            <div style={{ fontSize: 36, marginBottom: 20 }}>{card.icon}</div>
            <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 600, color: "#c9a96e", marginBottom: 14 }}>{card.title}</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.9 }}>{card.text}</p>
          </div>
        ))}
      </div>

      {/* Our Story section */}
      <div className="stack-mobile photo-text" style={{ padding: "80px 60px", display: "flex", alignItems: "center", gap: 80, background: "#0d0d0d", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <img src={pic4} alt="Our Story" style={{ width: "100%", height: 420, objectFit: "cover" }} />
        </div>
        <div style={{ flex: 1, minWidth: 300 }}>
          <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ Our Story ✦</span>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 46, fontWeight: 300, color: "#fff", marginBottom: 24, lineHeight: 1.2 }}>Established With<br />Love & Purpose</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 2.1, marginBottom: 16 }}>AL Hamid Guest House was founded with a single dream — to give every traveler a home away from home. A place where warmth, cleanliness, and genuine care come together naturally.</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 2.1, marginBottom: 16 }}>Every room is designed with the guest in mind. Every smile from our staff is genuine. We are not just a place to sleep — we are a family that welcomes you.</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 2.1 }}>Over 15 years of service and 5,000+ happy guests later, our mission remains the same: make every stay unforgettable.</p>
        </div>
      </div>

      {/* Facilities list */}
      <div style={{ padding: "70px 60px", background: "#0f0f0f" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ What We Offer ✦</span>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 48, fontWeight: 300, color: "#fff", marginBottom: 12 }}>Rooms & Facilities</h2>
          <div style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto" }} />
        </div>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {["Comfortable Rooms", "Free Wi-Fi", "Clean Bathrooms", "Air Conditioning", "Breakfast Service", "Parking Space", "Daily Housekeeping", "24/7 Concierge", "Security & Safety", "Purple LED Mood Lights", "Sofa Seating", "Flat Screen TV"].map((f, i) => (
            <div key={i}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)"; e.currentTarget.style.transform = "translateX(8px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateX(0)"; }}
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 22px", border: "1px solid rgba(255,255,255,0.06)", background: "#141414", transition: "all 0.3s" }}>
              <div style={{ width: 7, height: 7, background: "#c9a96e", borderRadius: "50%", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", letterSpacing: 0.5 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="hero-stats stack-mobile" style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {[{ num: "15+", label: "Years of Service" }, { num: "5K+", label: "Happy Guests" }, { num: "4.9★", label: "Average Rating" }, { num: "24/7", label: "Support" }].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: "44px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 52, fontWeight: 300, color: "#c9a96e", display: "block" }}>{s.num}</span>
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Booking */}
      <BookingCounter />
      <Footer setPage={setPage} />
    </div>
  );

  // ────────────────────────────────────────
  // ROOM DETAIL PAGE
  // ────────────────────────────────────────
  if (page === "roomDetail" && selectedRoom) return (
    <div className="app-root" style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff", fontFamily: "Montserrat, sans-serif" }}>
      <link href={FONT} rel="stylesheet" />
      <Nav page="rooms" setPage={setPage} solid={false} />
      <div style={{ position: "relative", height: 500, overflow: "hidden" }}>
        <img src={selectedRoom.image} alt={selectedRoom.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(10,10,10,1))" }} />
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
          {["Check In", "Check Out"].map((l, i) => (
            <div key={i}>
              <label style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 8 }}>{l}</label>
              <input type="date" style={{ width: "100%", background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "12px 16px", marginBottom: 20, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
          <label style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 8 }}>Guests</label>
          <select style={{ width: "100%", background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "12px 16px", marginBottom: 32, fontSize: 13, outline: "none", boxSizing: "border-box" }}>
            {["1 Guest","2 Guests","3 Guests","4 Guests"].map(o => <option key={o} style={{ background: "#1e1e1e" }}>{o}</option>)}
          </select>
          <button style={{ width: "100%", background: "#c9a96e", color: "#1a1205", border: "none", padding: "18px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: "pointer" }}>Book This Room</button>
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );

  // ────────────────────────────────────────
  // ROOMS PAGE
  // ────────────────────────────────────────
  if (page === "rooms") return (
    <div className="app-root" style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff", fontFamily: "Montserrat, sans-serif" }}>
      <link href={FONT} rel="stylesheet" />
      <Nav page={page} setPage={setPage} solid={false} />

      {/* Hero — your photo, no nav background */}
      <div className="page-hero" style={{ position: "relative", height: "50vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src={pic3} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(10,10,10,1))" }} />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", paddingTop: 110 }}>
          <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ Choose Your Stay ✦</span>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 70, fontWeight: 300, color: "#fff" }}>Our Rooms</h1>
          <div style={{ width: 60, height: 1, background: "#c9a96e", margin: "20px auto 0" }} />
        </div>
      </div>

      {/* Animated room cards grid */}
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, padding: "50px 40px" }}>
        {rooms.map(room => (
          <RoomCard key={room.id} room={room} onClick={() => { setSelectedRoom(room); setPage("roomDetail"); }} />
        ))}
      </div>

      <BookingCounter />
      <Footer setPage={setPage} />
    </div>
  );

  // ────────────────────────────────────────
  // HOME PAGE
  // ────────────────────────────────────────
  return (
    <div className="app-root" style={{ fontFamily: "Montserrat, sans-serif", background: "#0a0a0a", color: "#fff" }}>
      <link href={FONT} rel="stylesheet" />
      <Nav page="home" setPage={setPage} solid={scrolled} />

      {/* HERO */}
      <div className="page-hero" style={{ position: "relative", width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={pic2} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px" }}>
          
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 90, fontWeight: 300, lineHeight: 1.05, color: "#fff", marginBottom: 16 }}>
            Where <em style={{ color: "#e8d5b0" }}>Comfort</em><br />Meets Elegance
          </h1>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontStyle: "italic", color: "rgba(255,255,255,0.7)", marginBottom: 52 }}>A sanctuary of warmth, beauty & unforgettable stays</p>
         
        </div>
        {/* Stats */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.82)", display: "flex", backdropFilter: "blur(10px)" }}>
          {[{ num: "4", label: "Room Types" }, { num: "4.9★", label: "Guest Rating" }, { num: "15+", label: "Years of Service" }, { num: "24/7", label: "Concierge" }].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: "24px 20px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 600, color: "#c9a96e" }}>{s.num}</div>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK BOOKING */}
      <div className="quick-booking stack-mobile" style={{ background: "#111", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "0 60px" }}>
          {[{ label: "Check In", type: "date" }, { label: "Check Out", type: "date" }].map((f, i) => (
            <div key={i} style={{ flex: 1, padding: "22px 28px", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#c9a96e", marginBottom: 8 }}>{f.label}</div>
              <input type={f.type} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 13, outline: "none", width: "100%" }} />
            </div>
          ))}
          <div style={{ flex: 1, padding: "22px 28px", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#c9a96e", marginBottom: 8 }}>Guests</div>
            <select style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 13, outline: "none" }}>
              {["1 Guest","2 Guests","3 Guests","4 Guests"].map(o => <option key={o} style={{ background: "#111" }}>{o}</option>)}
            </select>
          </div>
          <button onClick={() => setPage("rooms")} style={{ background: "#c9a96e", color: "#1a1205", border: "none", padding: "22px 40px", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>Check Availability</button>
        </div>
      </div>

      {/* WELCOME */}
      <div className="stack-mobile hero-welcome" style={{ padding: "100px 60px", display: "flex", alignItems: "center", gap: 90, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <div style={{ position: "relative" }}>
            <img src={pic1} alt="AL Hamid Room" style={{ width: "100%", height: 520, objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: -32, right: -32, background: "#c9a96e", padding: "28px 32px", textAlign: "center" }}>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 44, fontWeight: 300, color: "#1a1205" }}>15+</div>
              <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#1a1205" }}>Years of Service</div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 300, paddingBottom: 32 }}>
          <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 20 }}>✦ Welcome to AL Hamid ✦</span>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 56, fontWeight: 300, color: "#fff", lineHeight: 1.15, marginBottom: 30 }}>A Place That<br />Feels Like <em>Home</em></h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 2.2, marginBottom: 20 }}>AL Hamid Guest House was built on a simple belief — every guest deserves to feel welcomed, valued, and truly comfortable. Since our founding, we have opened our doors to thousands of travelers, families, and business guests.</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 2.2, marginBottom: 36 }}>Our staff treats every guest like a member of the family. From the moment you arrive to the moment you leave, we are here for you — always with a warm smile.</p>
          <button onClick={() => setPage("about")} style={{ background: "transparent", border: "1px solid rgba(201,169,110,0.6)", color: "#c9a96e", padding: "14px 36px", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer" }}>Our Story →</button>
        </div>
      </div>

      {/* ROOMS PREVIEW — animated cards */}
      <div style={{ padding: "0 40px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ Choose Your Stay ✦</span>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 52, fontWeight: 300, color: "#fff", marginBottom: 12 }}>Our Rooms</h2>
          <div style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto" }} />
        </div>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 40 }}>
          {rooms.map(room => (
            <RoomCard key={room.id} room={room} onClick={() => { setSelectedRoom(room); setPage("roomDetail"); }} />
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => setPage("rooms")} style={{ background: "#c9a96e", color: "#1a1205", border: "none", padding: "16px 52px", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: "pointer" }}>View All Rooms</button>
        </div>
      </div>

      {/* WHY AL HAMID */}
      <div style={{ background: "#0f0f0f", padding: "90px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ Why Guests Love Us ✦</span>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 52, fontWeight: 300, color: "#fff", marginBottom: 12 }}>The AL HAMID Difference</h2>
          <div style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto" }} />
        </div>
        <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {[
            { icon: "🤝", title: "Personal Welcome",     text: "Every guest is greeted by name and shown to their room personally by our staff." },
            { icon: "🍽",  title: "Home-Cooked Meals",   text: "Fresh homemade breakfast every morning — made with care like your own kitchen." },
            { icon: "🌙", title: "Peaceful Nights",      text: "Quiet rooms, mood LED lighting, and soft bedding for the best sleep of your life." },
            { icon: "📍", title: "Local Knowledge",      text: "Our team shares the best local spots, hidden restaurants, and must-see places." },
          ].map((c, i) => (
            <div key={i}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.1)"; }}
              style={{ background: "#141414", border: "1px solid rgba(201,169,110,0.1)", padding: "36px 28px", textAlign: "center", transition: "all 0.3s ease" }}>
              <div style={{ fontSize: 36, marginBottom: 20 }}>{c.icon}</div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, color: "#c9a96e", marginBottom: 14 }}>{c.title}</div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.9 }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ padding: "90px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 16 }}>✦ Guest Words ✦</span>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 52, fontWeight: 300, color: "#fff", marginBottom: 12 }}>What Our Guests Say</h2>
          <div style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto" }} />
        </div>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {[
            { name: "Sarah M.",  country: "United Kingdom", rating: "★★★★★", text: "AL Hamid Guest House felt like a home away from home. The staff remembered my name, the breakfast was delicious, and my room was spotless. I will absolutely return." },
            { name: "Tariq A.", country: "Saudi Arabia",    rating: "★★★★★", text: "I have stayed in many hotels but AL Hamid's warmth and personal touch is unmatched. The owner personally checked in on my comfort every day. Truly exceptional." },
            { name: "Emily R.", country: "Australia",       rating: "★★★★★", text: "Arrived tired from a long flight and the team at AL Hamid had everything ready for me. Peaceful room, perfect breakfast, friendly faces. Highly recommended!" },
          ].map((t, i) => (
            <div key={i} style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)", padding: "36px 32px" }}>
              <div style={{ color: "#c9a96e", fontSize: 18, marginBottom: 16 }}>{t.rating}</div>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 17, fontStyle: "italic", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 24 }}>"{t.text}"</p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20 }}>
                <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{t.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginTop: 4 }}>{t.country}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PHOTO GALLERY — each image individually animated */}
      <div style={{ padding: "0 0 0 0" }}>
        <div style={{ textAlign: "center", padding: "40px 60px 36px" }}>
          <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 12 }}>✦ Room Gallery ✦</span>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 46, fontWeight: 300, color: "#fff" }}>Real Rooms, Real Comfort</h2>
        </div>
        <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 3, height: 280 }}>
          {[pic1, pic2, pic3, pic4, pic5].map((src, i) => (
            <div key={i} style={{ overflow: "hidden", position: "relative", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.querySelector("img").style.transform = "scale(1.12)"; e.currentTarget.querySelector(".overlay").style.opacity = "0"; }}
              onMouseLeave={e => { e.currentTarget.querySelector("img").style.transform = "scale(1)"; e.currentTarget.querySelector(".overlay").style.opacity = "1"; }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", display: "block" }} />
              <div className="overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)", transition: "opacity 0.4s" }} />
            </div>
          ))}
        </div>
      </div>

      {/* BOOKING COUNTER */}
      <BookingCounter />

      {/* CONTACT */}
      <div className="contact-grid stack-mobile" style={{ background: "#0d0d0d", padding: "90px 60px", display: "flex", alignItems: "center", gap: 80, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: 20 }}>✦ Get In Touch ✦</span>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 52, fontWeight: 300, color: "#fff", lineHeight: 1.2, marginBottom: 28 }}>We Are Here<br />For You — Always</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 2, marginBottom: 36 }}>Whether you have a question, need help with a special request, or simply want to say hello — our team is always ready.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[{ icon: "📞", label: "Phone", val: "+92 300 000 0000" }, { icon: "📧", label: "Email", val: "info@alhamidguesthouse.com" }, { icon: "📍", label: "Address", val: "123 Peaceful Lane, City, Pakistan" }].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 22 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#c9a96e", marginBottom: 3 }}>{c.label}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 300, background: "#141414", border: "1px solid rgba(255,255,255,0.07)", padding: 48 }}>
          <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, fontWeight: 300, color: "#fff", marginBottom: 32 }}>Send Us a Message</h3>
          {[{ label: "Your Name", placeholder: "Ahmad Ali", type: "text" }, { label: "Email Address", placeholder: "you@example.com", type: "email" }].map((f, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 8 }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} style={{ width: "100%", background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "12px 16px", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 8 }}>Message</label>
            <textarea rows={4} placeholder="How can we help you?" style={{ width: "100%", background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "12px 16px", fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
          </div>
          <button style={{ width: "100%", background: "#c9a96e", color: "#1a1205", border: "none", padding: "16px", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: "pointer" }}>Send Message</button>
        </div>
      </div>

      <Footer setPage={setPage} />
    </div>
  );
}

// ── SHARED FOOTER ──
function Footer({ setPage }) {
  return (
 <div className="footer" style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "44px 60px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
  <div>
    <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, color: "#c9a96e", marginBottom: 4 }}>AL HAMID Guest House</div>
    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>Peace, Comfort & Warm Hospitality</div>
  </div>
  
  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>© 2025 AL HAMID Guest House. All rights reserved.</div>
</div>
  );
}
