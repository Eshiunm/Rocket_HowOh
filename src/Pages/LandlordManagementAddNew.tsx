import AddNewData from "../Components/AddNewData";
import AddNewProcedure from "../Components/AddNewProcedure";
{/* <Route path="/landlord-management-add-new" element={<LandlordManagementAddNew />}></Route> */}

export default function LandlordManagementAddNew() {
  return (
    <div className="flex">
      <AddNewProcedure />
      <AddNewData />
    </div>
  );
}