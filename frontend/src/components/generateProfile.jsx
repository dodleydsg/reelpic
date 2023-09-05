const GenerateProfile = ({ username }) => {
  // Function generates a pseudorandom colored profile picture from the name initials
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  return (
    <span
      className="flex justify-center items-center h-10 w-10 rounded-[40px] cursor-pointer text-lg"
      style={{ backgroundColor: `${"#" + randomColor}`, color: "white" }}
    >
      {username.charAt(0).toUpperCase()}
    </span>
  );
};

export default GenerateProfile;
