import React from "react";
import { useLocation } from "react-router-dom";

const Congratulations = (props) => {
  const location = useLocation();
  // const history = useHistory();
  React.useEffect(() => {
    console.log("locationlocation", location);
  }, []);
  return (
    <div className='h-[30rem] mt-48 flex flex-col	items-center mx-4'>
      <form>
        <h3>
          Congratulations! {location.state.p_first_name}{" "}
          {location.state.p_last_name}
        </h3>
        <p>
          You have successfully created a {location.state.p_user_type} account.
          <br />
          An email confirmation request has been sent to{" "}
          {location.state.p_email}.
          <br />
          Please verify your email address via link sent to you.
        </p>
      </form>
    </div>
  );
};

export default Congratulations;
