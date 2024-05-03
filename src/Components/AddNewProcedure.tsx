export default function AddNewProcedure() {
  const procedure = [
    {
      title: "基本資訊",
      isActive: false,
      isDone: true,
    },
    {
      title: "房源照片",
      isActive: false,
      isDone: true,
    },
    {
      title: "特色",
      isActive: true,
      isDone: false,
    },
    {
      title: "設備",
      isActive: false,
      isDone: false,
    },
    {
      title: "雜支",
      isActive: false,
      isDone: false,
    },
    {
      title: "訂金與租金",
      isActive: false,
      isDone: false,
    },
    {
      title: "房源介紹",
      isActive: false,
      isDone: false,
    },
    {
      title: "租客限制",
      isActive: false,
      isDone: false,
    }
  ];

  return (
    <div className="p-10 border-r border-gray-400">
      <div className="relative after:content-[''] after:w-[1px] after:h-full after:bg-gray-400 after:absolute after:left-4 after:-z-10 after:top-0">
        {
          procedure.map((item, index) => {
            const {title,isActive,isDone} = item;
            return (
              <button key={title} className="flex gap-3 mb-8">
                <div className={isActive ? "add-new-step-index-active" : "add-new-step-index"}>{isDone?"✓":index + 1}</div>
                <div className={isActive ? "black leading-8" : "text-gray-400 leading-8"}>{title}</div>
              </button>
            )
          })
        }
      </div>
    </div>
  );
}