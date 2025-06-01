import React from "react";

const HeaderAdminPage = () => {
  return (
    <>
      <header className="px-6 py-4 border-b flex">
        <div className="flex items-center gap-4 flex-1">
          <button className="border px-4 py-3 rounded-xl">
            <i className="ri-menu-2-fill"></i>
          </button>
          <div
            className="border rounded-lg py-3 px-4 flex items-center gap-4 group
                       focus-within:border-pink-500 focus-within:shadow-lg focus-within:shadow-pink-200 transition duration-200 ease-in-out w-[50%]"
          >
            <i
              className="ri-search-2-line text-xl group
                       focus-within:border-pink-500 transition duration-200 ease-in-out"
            ></i>
            <input
              type="text"
              placeholder="Search..."
              className="focus:outline-none text-sm"
            />
          </div>
        </div>
        <div className="flex-1"></div>
      </header>
    </>
  );
};

export default HeaderAdminPage;
