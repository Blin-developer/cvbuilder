'use client';

import { useState } from 'react';

export default function PersonalForm({ personal, onChange }) {
  const [open, setOpen] = useState(true);

  const handleChange = (e) => onChange(e.target.name, e.target.value);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Fotografia është shumë e madhe (max 2MB).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => onChange('photo', ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <section className="form-card">
      <div className="card-header" onClick={() => setOpen(!open)}>
        <h2>👤 Të dhënat personale</h2>
        <span>{open ? '−' : '+'}</span>
      </div>

      {open && (
        <div className="card-body">
          {/* Foto */}
          <div className="photo-uploader">
            {personal.photo ? (
              <img src={personal.photo} alt="Foto" className="photo-preview" />
            ) : (
              <div className="photo-placeholder">Foto</div>
            )}
            <div className="photo-actions">
              <label className="btn btn-secondary">
                Ngarko foto
                <input type="file" accept="image/*" onChange={handlePhoto} hidden />
              </label>
              {personal.photo && (
                <button className="btn btn-danger" onClick={() => onChange('photo', '')}>
                  Hiq foton
                </button>
              )}
            </div>
          </div>

          <div className="form-row">
            <Field label="Emri" name="firstName" value={personal.firstName} onChange={handleChange} required />
            <Field label="Mbiemri" name="lastName" value={personal.lastName} onChange={handleChange} required />
          </div>
          <Field label="Profesioni / Pozita" name="profession" value={personal.profession} onChange={handleChange} />
          <div className="form-row">
            <Field label="Email" name="email" type="email" value={personal.email} onChange={handleChange} />
            <Field label="Telefon" name="phone" type="tel" value={personal.phone} onChange={handleChange} />
          </div>
          <div className="form-row">
            <Field label="Qyteti" name="city" value={personal.city} onChange={handleChange} />
            <Field label="Adresa" name="address" value={personal.address} onChange={handleChange} />
          </div>
          <div className="form-row">
            <Field label="Kodi postar" name="postalCode" value={personal.postalCode} onChange={handleChange} />
            <Field label="Shteti" name="country" value={personal.country} onChange={handleChange} />
          </div>
          <div className="form-row">
            <Field label="Data e lindjes" name="birthDate" type="date" value={personal.birthDate} onChange={handleChange} />
            <Field label="Shtetësia" name="nationality" value={personal.nationality} onChange={handleChange} />
          </div>
          <Field label="Gjinia (opsionale)" name="gender" value={personal.gender} onChange={handleChange} />
          <div className="form-row">
            <Field label="LinkedIn" name="linkedin" value={personal.linkedin} onChange={handleChange} />
            <Field label="GitHub" name="github" value={personal.github} onChange={handleChange} />
          </div>
          <Field label="Website / Portfolio" name="website" value={personal.website} onChange={handleChange} />

          <div className="form-group">
            <label>Rreth meje</label>
            <textarea
              name="about"
              value={personal.about}
              onChange={handleChange}
              rows={4}
              placeholder="Përshkrim profesional i shkurtër..."
            />
          </div>
        </div>
      )}
    </section>
  );
}

function Field({ label, name, value, onChange, type = 'text', required }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label} {required && <span className="req">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
      />
    </div>
  );
}