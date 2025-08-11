import { useState } from "react";

export function ChurchCustomizer({ onSave }: { onSave: (theme: any) => void }) {
  const [primaryColor, setPrimaryColor] = useState("#003366");
  const [secondaryColor, setSecondaryColor] = useState("#ffcc66");

  return (
    <div className="space-y-4">
      <div>
        <label>Couleur principale</label>
        <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
      </div>
      <div>
        <label>Couleur secondaire</label>
        <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
      </div>
      <button onClick={() => onSave({ primaryColor, secondaryColor })} className="bg-green-600 text-white px-4 py-2 rounded">
        Sauvegarder
      </button>
    </div>
  );
}
