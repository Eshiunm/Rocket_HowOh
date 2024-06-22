import logo from "../../assets/imgs/howohLogo_whiteMode.svg";

export default function BigLoading() {
  return (
    <div className="fixed z-[60] left-0 top-0 w-screen h-screen flex items-center justify-center bg-Landlord-50 opacity-80">
        <div className="px-10 py-5 flex flex-col justify-center items-center gap-2 bg-Neutral-99 rounded-xl">
          <div className="flex gap-6 pt-3">
            <img src={logo} alt="howohLogo" className="animate-bounce-1 w-6 h-6" />
            <img src={logo} alt="howohLogo" className="animate-bounce-2 w-6 h-6" />
            <img src={logo} alt="howohLogo" className="animate-bounce-3 w-6 h-6" />
          </div>
          <p className="text-sans-caption">Loading...</p>
        </div>
    </div>
  );
}