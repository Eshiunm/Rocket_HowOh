import RefreshBtn from "../../components/buttons/RefreshBtn";
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
            <RefreshBtn />
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