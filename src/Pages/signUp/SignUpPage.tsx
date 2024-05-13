function SignUpPage() {
  return (
    <div className="wrap h-screen pt-[170px] bg-Neutral-99 ">
      <div className="container layout-grid">
        <div className="col-span-4 col-start-3 p-8 bg-Neutral-95 rounded-2xl hover:bg-black hover:bg-opacity-10">
          <h2 className="text-sans-b-h5">我是租客</h2>
        </div>
        <div className="col-span-4 col-start-7 p-8 bg-Neutral-95 rounded-2xl">
          <h2 className="text-sans-b-h5">我是房東</h2>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
