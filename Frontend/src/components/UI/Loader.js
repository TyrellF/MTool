import React from "react";
import "../../bootstrap.min.css";

const Loader = () => {
  return (
    <div>
      {/* <ScaleLoader className="loader" size="10px" color="#485785"/> */}
      <i class="fa-brands fa-watchman-monitoring fa-flip fa-5x"></i>
      <br />
      <br />
      Fetching statuses, hold on...
    </div>
    
  );
};

export default Loader;
