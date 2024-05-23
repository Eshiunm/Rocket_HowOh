import HouseDatas from "../../components/landLordManagement/HouseDatas";
import Footer from "../../components/footer/Footer";

export default function PublishHouse() {

  const houseDatas = {
    formData:{},
    photos:[],
    facilities:{},
    expenses:{},
    introduction:"",
    restrictions:{},
  };
  return (
    <>
      <header className="bg-Landlord-99">
        <div className="container py-6">
          <span className="badge-m  bg-Landlord-90">刊登中</span>
          <h2 className="text-sans-b-h5 mt-3 mb-6">信義國小套房 捷運3分鐘</h2>
          <div className="flex justify-between items-end">
            <div>
              <h6 className="mb-2 text-sans-body2">變更狀態</h6>
              <div className="flex gap-3">
                <button type="button" className="outline-button-m">更改為已承租</button>
                <button type="button" className="outline-button-m">更改為已完成</button>
              </div>
            </div>
            <div className="flex gap-6">
              <button type="button" className="outline-button-m">返回房源管理頁面</button>
              <button type="button" className="outline-button-m">查看合約</button>
              <button type="button" className="filled-button-m">查看租客預約請求</button>
            </div>
          </div>
        </div>
      </header>
      <main className="container layout-grid">
        <div className="col-span-7 pt-6 pb-52">
          <HouseDatas houseDatas={houseDatas}/>
        </div>
      </main>
      <Footer />
    </>
  );
}