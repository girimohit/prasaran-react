import { IoMdArrowRoundBack } from "react-icons/io";

const SearchScreen = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center mt-4">
        <div className="w-[90%] bg-green-300">
          <input
            className="w-full self-center rounded-full"
            type="text"
            placeholder="Search"
          />
          {/* <IoMdArrowRoundBack /> */}
        </div>
      </div>
    </>
  );
};
export default SearchScreen;
