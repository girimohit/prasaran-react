const EditField = ({ field_name, field_data }) => {
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
  return (
    <>
      <p>Edit Profie Screen</p>
    </>
  );
};
export default EditProfileScreen;