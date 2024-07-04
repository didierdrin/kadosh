// Secondary Navbar
import CategoryDropdown from "./categorydropdown";

const SecondaryNavbar = () => {
    return (
        <div className='flex flex-row items-center justify-between px-5 h-[80px] bg-blue-50 text-black text-[15px]'>
            <a href="/" className="text-black text-[35px] font-bold">Kadosh</a>
            <div className="flex flex-row items-center">
            <CategoryDropdown />
            <div className="relative mx-8">
  <input
    type="text"
    placeholder="Search"
    className="text-slate-500 text-[20px] border border-blue-200 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-sm w-[600px] py-1 px-10 pr-12"
  />
  <svg
    className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-teal-500 hover:text-yellow-900"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
</div>
            </div>
            {/* Making the searchbar more to the center with these containers.*/}
            <div></div>
            <div></div>
        </div>
    );
};

export default SecondaryNavbar; 