import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ContractPreview() {
  const location = useLocation();
  const [pdfUrl, setPdfUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('pdfUrl')) {
      const url = params.get('pdfUrl');
      if (url) {
        setPdfUrl(url);
      }
    } else if (params.get('downloadUrl')) {
      const url = params.get('downloadUrl');
      if (url) {
        setDownloadUrl(url);
      }
    }
  }, [location]);

  return (
    <main className="bg-Neutral-30 py-20">
      <section className="container layout-grid">
        <div className="col-span-10 col-start-2">
          {pdfUrl && (
            <object data={`${pdfUrl}#toolbar=0`} type="application/pdf" className="w-full min-h-[2268px]" />
          )}
          {downloadUrl && (
            <object data={`${downloadUrl}`} type="application/pdf" className="w-full min-h-[2338px]" />
          )}
        </div>
      </section>
    </main>
  );
}