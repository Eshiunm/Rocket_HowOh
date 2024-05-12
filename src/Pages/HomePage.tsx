import SearchForm from "../components/homePage/SearchForm"

interface FormElementsState {
  District: {
    noLimit: {
      content: string;
      checked: boolean;
      disabled: boolean;
    };
    districts: {
      content: string;
      checked: boolean;
    }[];
  };
  HouseType: {
    noLimit: {
      content: string;
      checked: boolean;
      disabled: boolean;
    };
    houseTypes: {
      content: string;
      checked: boolean;
    }[];
  };
  RentRange: {
    noLimit: {
      content: string;
      checked: boolean;
      disabled: boolean;
    };
    rentRanges: {
      content: string;
      checked: boolean;
    }[];
  };
}

function HomePage() {

  
  return (
    <>
      <section className="search bg-homeSearchImg bg-center bg-cover h-[842px]">
        {/* Title */}
        <div className="container pt-20 mb-8">
          <h2 className="w-[559px] mx-auto text-center bg-Neutral-10 text-white font-Dela-Gothic-One text-dela-display1 pl-8 rounded-[12px]">
            <span className="text-Brand-90 font-Dela-Gothic-One text-dela-display1">
              找好房東
            </span>
            ,好窩！
          </h2>
        </div>

        {/* Search body */}
        <div className="container layout-grid">
          <div className="col-start-2 col-span-10">
           <SearchForm/>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
