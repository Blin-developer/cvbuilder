'use client';

const TEMPLATES = [
  { id: 'europass', name: 'Europass Classic' },
  { id: 'modern', name: 'Modern Professional' },
  { id: 'creative', name: 'Creative Portfolio' },
];

export default function TemplateSelector({ current, onChange, theme, onThemeChange }) {
  return (
    <div className="template-selector">
      <label>Modeli:</label>
      <select value={current} onChange={(e) => onChange(e.target.value)}>
        {TEMPLATES.map((t) => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>

      <label>Ngjyra kryesore:</label>
      <input type="color" value={theme.primaryColor} onChange={(e) => onThemeChange('primaryColor', e.target.value)} />

      <label>Fonti:</label>
      <select value={theme.fontFamily} onChange={(e) => onThemeChange('fontFamily', e.target.value)}>
        <option value="Arial, sans-serif">Arial</option>
        <option value="Georgia, serif">Georgia</option>
        <option value="'Courier New', monospace">Courier</option>
        <option value="'Segoe UI', sans-serif">Segoe UI</option>
      </select>

      <label>Madhësia:</label>
      <select value={theme.fontSize} onChange={(e) => onThemeChange('fontSize', e.target.value)}>
        <option value="12px">12px</option>
        <option value="13px">13px</option>
        <option value="14px">14px</option>
        <option value="15px">15px</option>
      </select>
    </div>
  );
}