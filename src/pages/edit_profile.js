import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const EditField = ({ field_name, field_data }) => {
  // history.goBack();
  return (
    <>
      <div className="my-3 flex flex-col justify-center rounded-lg border border-gray-400 p-2 px-4">
        <p className="text-gray-400">{field_name}</p>
        <p>{field_data}</p>
      </div>
    </>
  );
};

const EditProfileScreen = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className="mb-8 flex flex-col items-center justify-center">
        <div className="grid w-full grid-cols-3 items-center justify-center  px-10">
          <IoMdArrowRoundBack onClick={() => navigate(-1)} />
          <h2 className="my-10 text-center font-bold">Edit Profile</h2>
        </div>

        <div className="mb-6 h-32 w-32 rounded-full border-2 border-black bg-gray-50"></div>
        <h3 className="font-semibold">Full Name</h3>
        <p className="text-gray-400">@username</p>
      </div>

      <hr className="mx-5 my-1 h-1 border-0 bg-gray-300" />

      <div id="setting-options" className="mx-6 grid grid-cols-2 gap-x-3">
        <EditField field_name="Username" field_data={"username"} />
        <EditField field_name="Gender" field_data={"Male"} />
        <EditField field_name="Date of Birth" field_data={"12/12/1999"} />
        <EditField field_name="Full Name" field_data={"John Wick"} />
        <EditField field_name="Email" field_data={"johnwick@gmail.com"} />
      </div>

      <div className="fixed bottom-4 left-0 right-0 flex justify-center">
        <button className="w-96 rounded-xl bg-black px-5 py-2 text-white">
          Save
        </button>
      </div>
    </>
  );
};
export default EditProfileScreen;