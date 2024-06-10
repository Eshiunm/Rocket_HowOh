import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";

function FeedbackManagementPage() {
  return (
    <>
      <div className="h-screen">
        <section className="py-6 mb-6 border-b border-t border-Neutral-95 bg-Neutral-99">
          <div className="container">
            <h2 className="text-sans-b-h5 ">租屋管理</h2>
          </div>
        </section>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
export default FeedbackManagementPage;
