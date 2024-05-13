import { useParams } from "react-router-dom";

function CurrentStep() {
  // 取的結尾路徑
  const params = useParams();
  return (
    <>
      {params.currentStep?.includes("enterPhone") ? (
        <h1>Step 1</h1>
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
