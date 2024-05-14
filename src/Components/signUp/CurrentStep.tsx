import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface formDataType {
  phone: string;
}

function CurrentStep() {
  const params = useParams();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<formDataType>();

  const onSubmit = (data: formDataType) => {
    console.log(JSON.stringify(data));
    navigate("/signUp/createAccount/phoneValidation");
  };
  return (
    <>
      {params.currentStep?.includes("enterPhone") ? (
        <div className="wrap h-screen bg-Neutral-99 pt-[60px]">
          <div className="container layout-grid">
            <div className="col-span-6 col-start-4 ">
              <form
                className="bg-white rounded-2xl p-10"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h2 className="text-sans-h5 mb-[50px]">建立帳號</h2>
                <input
                  type="text"
                  placeholder="請以手機建立帳號"
                  className="w-full rounded p-3"
                  {...register("phone", { required: false })}
                />
                <span className="inline-block pl-3 text-sans-caption mb-10">
                  請填入真實手機，我們將驗證您的手機
                </span>
                <button
                  type="submit"
                  className="w-full py-3 mb-3 filled-button-active-l hover:filled-button-hover-l"
                >
                  進行驗證
                </button>
                <NavLink to="/signUp" className="p-2 text-sans-b-body1">
                  取消
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      ) : params.currentStep?.includes("phoneValidation") ? (
        <h1>Step 2</h1>
      ) : params.currentStep?.includes("basicInfo") ? (
        <h1>Step 3</h1>
      ) : (
        <h1>Step4</h1>
      )}
    </>
  );
}

export default CurrentStep;
