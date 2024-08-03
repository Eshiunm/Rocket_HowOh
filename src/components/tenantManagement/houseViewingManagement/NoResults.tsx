import whenNoItemsShowThisImg from "../../../assets/imgs/tenantManagement/whenNoItemsShowThisImg.svg";
function NoResults() {
  return (
    <div className="flex gap-x-3 items-center p-5">
      <img src={whenNoItemsShowThisImg} alt="whenNoItemsShowThisImg" />
      <p>此狀態尚無房源</p>
    </div>
  );
}

export default NoResults;
