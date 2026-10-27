'use client';

export default function Header({ saveStatus, onClearAll }) {
  const statusText = {
    idle: '',
    saving: '⏳ Duke ruajtur...',
    saved: '✅ Të dhënat u ruajtën',
    error: '❌ Gabim gjatë ruajtjes',
  }[saveStatus];

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">📄</span>
          <span className="logo-text">CVBuilder</span>
        </div>
        <nav className="nav">
          <a href="#home">Ballina</a>
          <a href="#builder">Ndërtuesi i CV-së</a>
          <a href="#about">Rreth projektit</a>
        </nav>
        <div className="header-actions">
          {statusText && <span className="save-status">{statusText}</span>}
          <button className="btn btn-danger" onClick={onClearAll}>
            Pastro të dhënat
          </button>
        </div>
      </div>
    </header>
  );
}