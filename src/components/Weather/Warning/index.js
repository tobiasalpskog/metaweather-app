import { useState, useEffect } from "react";

import types from "./Types";

export default function Warning({ warningTypes }) {
  const [warnings, setWarnings] = useState([]);

  useEffect(() => {
    updateIcons(warningTypes);
  }, [warningTypes]);

  function updateIcons(newWarningTypes) {
    let newTypes = types.filter((type) => {
      console.log(type.name);
      return newWarningTypes.includes(type.name);
    });
    setWarnings(newTypes);
  }
  return (
    <>
      <div className="warnings">
        {warnings.map((warning) => (
          <span
            class="material-icons md-36"
            style={{ color: `${warning.color}` }}
          >
            {warning.icon}
          </span>
        ))}
      </div>
    </>
  );
}
