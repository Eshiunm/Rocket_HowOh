import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ContractPreview() {
  const location = useLocation();
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const url = params.get('pdfUrl');
    if (url) {
      setPdfUrl(url);
    }
  }, [location]);

  return (
    <main className="bg-Neutral-95 py-20">
      <section className="container layout-grid">
        <div className="col-span-10 col-start-2">
          {pdfUrl && (
            <object data={`${pdfUrl}#toolbar=0`} type="application/pdf" className="w-full min-h-[2268px]" />
          )}
        </div>
      </section>
    </main>
  );
}