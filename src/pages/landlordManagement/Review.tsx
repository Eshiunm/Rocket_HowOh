import Footer from "../../components/footer/Footer";

export default function Review() {
  return (
    <>
      <header className="bg-Landlord-99 py-6">
        <div className="container text-sans-b-h5">評價管理</div>
      </header>
      <main className="container layout-grid mt-6">
        <div className="col-span-7 px-5">
          <nav className="py-3.5 mb-4 border-b border-Neutral-95">
            <button className="outline-button-s mb-3">
              重新整理
            </button>
          </nav>
          <section>
            評價列表
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}