'use client';

export default function ExportButtons() {
  const handlePrint = () => window.print();

  const handleDownloadPDF = async () => {
    const el = document.getElementById('cv-print-area');
    if (!el) return;
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');
    const canvas = await html2canvas(el, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    let y = 0;
    let remaining = imgHeight;
    while (remaining > 0) {
      pdf.addImage(imgData, 'PNG', 0, y, pageWidth, imgHeight);
      remaining -= pageHeight;
      if (remaining > 0) {
        pdf.addPage();
        y -= pageHeight;
      }
    }
    pdf.save('CV.pdf');
  };

  const handleDownloadJPG = async () => {
    const el = document.getElementById('cv-print-area');
    if (!el) return;
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(el, { scale: 2, useCORS: true });
    const link = document.createElement('a');
    link.download = 'CV.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  return (
    <div className="export-buttons">
      <button className="btn btn-primary" onClick={handleDownloadPDF}>📄 Shkarko PDF</button>
      <button className="btn btn-secondary" onClick={handleDownloadJPG}>🖼 Shkarko JPG</button>
      <button className="btn btn-secondary" onClick={handlePrint}>🖨 Printo</button>
    </div>
  );
}