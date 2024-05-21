import { TypeAnimation } from "react-type-animation";
import SearchForm from "../components/homePage/SearchForm";
import Recommendation from "../components/homePage/Recommandation";
import Footer from "../components/footer/Footer";

function HomePage() {
  return (
    <>
      <section className="search bg-homeSearchImg bg-center bg-cover h-[842px]">
        {/* Title */}
        <div className="container pt-20 mb-8">
          <h2 className="w-[559px] mx-auto text-center bg-Neutral-10 text-white font-Dela-Gothic-One text-dela-display1 pl-8 rounded-[12px]">
            {/* <span className="text-Brand-90 font-Dela-Gothic-One text-dela-display1">
              找好房東
            </span> */}
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "找好房東",
                1500, // wait 1s before replacing "Mice" with "Hamsters"
                "愛在一起",
                1500,
                "孟母三遷",
                1500,
                "安居樂業",
                1500,
                "租屋補助",
                1500,
              ]}
              wrapper="span"
              speed={{ type: "keyStrokeDelayInMs", value: 250 }}
              className={
                "type-animation text-Brand-90 font-Dela-Gothic-One text-dela-display1"
              }
              repeat={Infinity}
            />
            ,好窩！
          </h2>
        </div>

        {/* Search body */}
        <div className="container layout-grid">
          <div className="col-start-2 col-span-10">
            <SearchForm />
          </div>
        </div>
      </section>
      <Recommendation />
      <section className="aboutMe pt-16 pb-[88px] bg-Neutral-99">
        <div className="container mb-16">
          <h3 className="text-sans-b-h4 text-center">
            <span className="before:block before:absolute before:h-6 before:w-[140px] before:bg-Tenant-95 before:bottom-[-10%] before:right-[-10%] before:rounded-md relative">
              <span className="relative text-black">關於好窩</span>
            </span>
          </h3>
        </div>
        <div className="container layout-grid">
          <div className="col-start-2 col-span-10">
            <ul className="flex flex-wrap gap-x-6">
              <li className="md:w-[338px] w-full relative">
                <div className="bg-aboutMeImg_1 bg-cover bg-no-repeat rounded-2xl">
                  <div className="bg-transparent rounded-2xl hover:bg-black hover:bg-opacity-40 transition delay-150 duration-300 ease-in">
                    <a
                      href=""
                      className="inline-block text-white pt-5 px-5 h-[380px] rounded-2xl"
                    >
                      <h5 className="text-sans-body2 mb-3 z-10">評價守則</h5>
                      <p className="text-sans-b-h5">
                        避免謾罵字眼，好的租賃環境需要你我守護
                      </p>
                    </a>
                  </div>
                </div>
              </li>
              <li className="md:w-[338px] w-full">
                <div className="bg-aboutMeImg_2 bg-cover bg-no-repeat rounded-2xl">
                  <div className="bg-transparent rounded-2xl hover:bg-black hover:bg-opacity-40 transition delay-150 duration-300 ease-in">
                    <a
                      href=""
                      className="inline-block text-white pt-5 px-5 h-[380px] rounded-2xl"
                    >
                      <h5 className="text-sans-body2 mb-3 z-10">隱私與安全</h5>
                      <p className="text-sans-b-h5">
                        你的個資交由你掌控，平台安全交給我們
                      </p>
                    </a>
                  </div>
                </div>
              </li>
              <li className="md:w-[338px] w-full ">
                <div className="bg-aboutMeImg_3 bg-cover bg-no-repeat rounded-2xl">
                  <div className="bg-transparent rounded-2xl  hover:bg-black hover:bg-opacity-40 transition delay-150 duration-300 ease-in">
                    <a
                      href=""
                      className="inline-block text-black pt-5 px-5 h-[380px] rounded-2xl hover:text-white transition delay-150 duration-300 ease-in"
                    >
                      <h5 className="text-sans-body2 mb-3 z-10">透明</h5>
                      <p className="text-sans-b-h5 ">
                        房東租客互評機制，避免遇到爛房與惡房東
                      </p>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default HomePage;
