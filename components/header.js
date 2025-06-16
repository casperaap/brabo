import React from 'react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="navbar bg-[#070707CC] shadow-sm">
        <a
          href="/homepage.png"
          className="btn btn-ghost text-xl"
        >
          Brabo Community
        </a>
      </div>
    </header>
  );
}
