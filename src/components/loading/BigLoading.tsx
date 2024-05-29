import logo from "../../assets/imgs/howohLogo_whiteMode.svg";

export default function BigLoading() {
  return (
    <div className="fixed z-[60] left-0 top-0 w-screen h-screen flex items-center justify-center bg-Landlord-50 opacity-80">
        <div className="px-10 py-5 flex flex-col justify-center items-center gap-2 bg-Neutral-99 rounded-xl animate-pulse">
          <div className="flex gap-2">
            <img src={logo} alt="howohLogo" />
            <img src={logo} alt="howohLogo" />
            <img src={logo} alt="howohLogo" />
          </div>
          <p className="text-sans-caption">Loading...</p>
        </div>
    </div>
  );
}