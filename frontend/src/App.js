import UploadImage from "./components/UploadImage";
import VerifyHash from "./components/VerifyHash";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex flex-col items-center py-10 px-4">
      
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center">
        🔐 AI Media Verification
      </h1>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl">
        <UploadImage />
        <VerifyHash />
      </div>

    </div>
  );
}

export default App;
