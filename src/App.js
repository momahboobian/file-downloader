import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [apkFiles, setApkFiles] = useState(null);

  useEffect(() => {
    const importApkFiles = async () => {
      const apkFileContext = require.context(
        "../../apk-files",
        false,
        /\.apk$/
      );
      const apkFilePaths = apkFileContext.keys();
      const apkFileNames = apkFilePaths.map((filePath) =>
        filePath.replace("./", "")
      );
      setApkFiles(apkFileNames.sort());
    };
    importApkFiles();
  }, []);

  return (
    <div className="container">
      <h1>APK Downloads</h1>
      <div className="divider"></div>
      {apkFiles ? (
        <div className="apk-list">
          {apkFiles.map((fileName) => (
            <a href={`/static/media/${fileName}`} download="" key={fileName}>
              <div className="apk">
                <div className="apk-name">{fileName}</div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
