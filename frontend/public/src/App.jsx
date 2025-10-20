import React, { useEffect, useState } from "react";
import ServerList from "./components/ServerList.jsx";
import ServerPage from "./components/ServerPage.jsx";

function App() {
  const [selectedServer, setSelectedServer] = useState(null);

  return (
    <div>
      {!selectedServer && <ServerList onSelect={setSelectedServer} />}
      {selectedServer && <ServerPage server={selectedServer} />}
    </div>
  );
}

export default App;
