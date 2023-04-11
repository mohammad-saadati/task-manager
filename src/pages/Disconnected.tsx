import {} from "react";

const Disconnected = () => {
  return (
    <div className="flex justify-center text-3xl mt-32">
      Connection to server failed
      {window.axiosError}
    </div>
  );
};

export default Disconnected;
