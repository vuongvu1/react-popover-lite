import { FC, useEffect } from "react";
import { createPortal } from "react-dom";

let bodyElement: HTMLBodyElement;
let portalElement: HTMLDivElement;

if (typeof window != "undefined" && window.document) {
  bodyElement = window.document.getElementsByTagName("body")[0];
  portalElement = window.document.createElement("div");
}

const Portal: FC = ({ children }) => {
  useEffect(() => {
    if (bodyElement && portalElement) {
      bodyElement.appendChild(portalElement);
    }

    return () => {
      if (bodyElement && portalElement) {
        bodyElement.removeChild(portalElement);
      }
    };
  }, []);

  return createPortal(children, portalElement);
};

export default Portal;
