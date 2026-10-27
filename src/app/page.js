'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import PersonalForm from './components/PersonalForm';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';
import SkillsForm from './components/SkillsForm';
import LanguagesForm from './components/LanguagesForm';
import AdditionalSections from './components/AdditionalSections';
import TemplateSelector from './components/TemplateSelector';
import CVPreview from './components/CVPreview';
import ExportButtons from './components/ExportButtons';
import { loadCV, saveCV, clearCV } from '@/lib/storage';

const initialData = {
  personal: {
    firstName: '', lastName: '', profession: '', email: '', phone: '',
    city: '', address: '', postalCode: '', country: '', birthDate: '',
    nationality: '', gender: '', linkedin: '', github: '', website: '',
    photo: '', about: '',
  },
  experiences: [],
  educations: [],
  skills: [],
  languages: [],
  certificates: [],
  projects: [],
  volunteer: [],
  interests: [],
  references: [],
  extraInfo: '',
  template: 'europass',
  theme: {
    primaryColor: '#1e3a8a',
    accentColor: '#3b82f6',
    sidebarBg: '#e0e7ff',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
  },
};

export default function Home() {
  const [data, setData] = useState(initialData);
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | saved | error

  // Leximi nga LocalStorage vetëm në klient
  useEffect(() => {
    const stored = loadCV();
    if (stored) setData((prev) => ({ ...prev, ...stored }));
    setLoaded(true);
  }, []);

  // Ruajtja automatike
  useEffect(() => {
    if (!loaded) return;
    setSaveStatus('saving');
    const timeout = setTimeout(() => {
      const result = saveCV(data);
      setSaveStatus(result.ok ? 'saved' : 'error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
    return () => clearTimeout(timeout);
  }, [data, loaded]);

  // Ndryshim fushash të personal
  const updatePersonal = (field, value) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  // Ndryshim teme
  const updateTheme = (field, value) => {
    setData((prev) => ({ ...prev, theme: { ...prev.theme, [field]: value } }));
  };

  // Menaxhim listash (përvoja, arsimi, aftësi, gjuhë, etj.)
  const listHelpers = (listKey, emptyItem) => ({
    add: () =>
      setData((prev) => ({
        ...prev,
        [listKey]: [...prev[listKey], { ...emptyItem, id: Date.now() }],
      })),
    update: (id, field, value) =>
      setData((prev) => ({
        ...prev,
        [listKey]: prev[listKey].map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      })),
    remove: (id) =>
      setData((prev) => ({
        ...prev,
        [listKey]: prev[listKey].filter((item) => item.id !== id),
      })),
    move: (id, dir) =>
      setData((prev) => {
        const list = [...prev[listKey]];
        const idx = list.findIndex((i) => i.id === id);
        const target = idx + dir;
        if (target < 0 || target >= list.length) return prev;
        [list[idx], list[target]] = [list[target], list[idx]];
        return { ...prev, [listKey]: list };
      }),
  });

  const handleClearAll = () => {
    if (!confirm('A jeni i sigurt që doni të fshini të gjitha të dhënat?')) return;
    clearCV();
    setData(initialData);
  };

  const setTemplate = (tpl) => setData((prev) => ({ ...prev, template: tpl }));
  const setExtraInfo = (val) => setData((prev) => ({ ...prev, extraInfo: val }));

  if (!loaded) {
    return <div className="loading">Duke ngarkuar...</div>;
  }

  return (
    <>
      <Header
        saveStatus={saveStatus}
        onClearAll={handleClearAll}
        onExport={() => window.print()}
      />

      <main className="app-container">
        <div className="toolbar">
          <TemplateSelector
            current={data.template}
            onChange={setTemplate}
            theme={data.theme}
            onThemeChange={updateTheme}
          />
          <ExportButtons data={data} />
        </div>

        <div className="layout">
          {/* Kolona e majtë: Formulari */}
          <div className="form-column">
            <PersonalForm
              personal={data.personal}
              onChange={updatePersonal}
            />
            <ExperienceForm
              items={data.experiences}
              helpers={listHelpers('experiences', {
                position: '', company: '', location: '', startDate: '',
                endDate: '', current: false, description: '', achievements: '', technologies: '',
              })}
            />
            <EducationForm
              items={data.educations}
              helpers={listHelpers('educations', {
                school: '', degree: '', field: '', location: '',
                startDate: '', endDate: '', current: false, grade: '', description: '',
              })}
            />
            <SkillsForm
              items={data.skills}
              helpers={listHelpers('skills', { name: '', level: 'Mesatar' })}
            />
            <LanguagesForm
              items={data.languages}
              helpers={listHelpers('languages', { name: '', level: 'B1' })}
            />
            <AdditionalSections
              data={data}
              listHelpers={listHelpers}
              setExtraInfo={setExtraInfo}
            />
          </div>

          {/* Kolona e djathtë: CV Preview */}
          <div className="preview-column">
            <CVPreview data={data} />
          </div>
        </div>
      </main>
    </>
  );
}