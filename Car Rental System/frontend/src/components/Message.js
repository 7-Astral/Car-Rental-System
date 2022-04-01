import React, { useEffect } from "react";
import Popup from "./styled.components/Popup";

function Message({ value }) {
  return <Popup>{value}</Popup>;
}

export default Message;
