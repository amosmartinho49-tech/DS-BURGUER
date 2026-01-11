import React, { useState, useRef } from 'react';
import { editImageWithGemini } from '../services/geminiService';

interface ImageEditorProps {
  onSetBackground?: (bg: string | null) => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ onSetBackground }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Extract base64 data only (remove data:image/jpeg;base64, prefix)
        const base64Data = base64String.split(',')[1];
        setSelectedImage(base64Data);
        setMimeType(file.type);
        setResultImage(null); // Clear previous result
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) return;

    setIsGenerating(true);
    setError(null);
    setResultImage(null);

    try {
      const generatedBase64 = await editImageWithGemini(selectedImage, mimeType, prompt);
      if (generatedBase64) {
        setResultImage(generatedBase64);
      } else {
        setError('Não foi possível gerar a imagem. Tente novamente.');
      }
    } catch (err) {
      setError('Ocorreu um erro ao processar a imagem.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 max-w-2xl mx-auto pb-24">
      <div className="bg-gradient-to-br from-primary to-orange-600 rounded-2xl p-6 text-white mb-6 shadow-lg">
        <h2 className="text-2xl font-extrabold mb-2 flex items-center gap-2">
          <i className="fa-solid fa-wand-magic-sparkles"></i> AI EDITOR
        </h2>
        <p className="text-white/90 text-sm">
          Carrega uma imagem e pede à IA para editá-la. Você pode usar o resultado como novo fundo da app!
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          className="hidden" 
        />
        
        {!selectedImage ? (
          <div 
            onClick={triggerFileInput}
            className="border-2 border-dashed border-gray-300 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-all"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-text-gray mb-3">
              <i className="fa-solid fa-camera text-xl"></i>
            </div>
            <span className="text-sm font-semibold text-text-gray">Tocar para carregar foto</span>
          </div>
        ) : (
          <div className="relative rounded-xl overflow-hidden bg-black mb-4">
             {/* Preview Source */}
            <img 
              src={`data:${mimeType};base64,${selectedImage}`} 
              alt="Source" 
              className="w-full h-auto max-h-[400px] object-contain mx-auto"
            />
            <button 
              onClick={() => { setSelectedImage(null); setResultImage(null); setPrompt(''); }}
              className="absolute top-2 right-2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-red-600 transition-colors"
            >
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
        )}

        {/* Prompt Input */}
        <div className="mt-4">
          <label className="block text-xs font-bold text-text-gray uppercase mb-2">Instrução Mágica</label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Torna o ambiente futurista, ou adiciona neve..."
              disabled={!selectedImage || isGenerating}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-primary resize-none h-24"
            />
            <button
              onClick={handleGenerate}
              disabled={!selectedImage || !prompt || isGenerating}
              className={`
                absolute bottom-3 right-3 rounded-full w-10 h-10 flex items-center justify-center transition-all
                ${!selectedImage || !prompt || isGenerating 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-primary text-white shadow-lg hover:scale-105 active:scale-95'}
              `}
            >
              {isGenerating ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <i className="fa-solid fa-paper-plane"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Result Section */}
      {resultImage && (
        <div className="bg-white rounded-xl p-5 shadow-sm animate-fade-in">
          <h3 className="text-sm font-bold text-text-dark mb-3 flex items-center gap-2">
            <i className="fa-solid fa-check-circle text-green-500"></i> Resultado
          </h3>
          <div className="rounded-xl overflow-hidden bg-black mb-3 border border-gray-100">
            <img 
              src={`data:image/png;base64,${resultImage}`} 
              alt="Generated Result" 
              className="w-full h-auto"
            />
          </div>
          <div className="flex gap-2">
            <a 
              href={`data:image/png;base64,${resultImage}`} 
              download="burger-magic.png"
              className="flex-1 text-center py-3 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-black transition-colors"
            >
              <i className="fa-solid fa-download mr-1"></i> Baixar
            </a>
            {onSetBackground && (
              <button
                onClick={() => onSetBackground(`data:image/png;base64,${resultImage}`)}
                className="flex-1 py-3 bg-primary text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors"
              >
                <i className="fa-solid fa-image mr-1"></i> Usar Fundo
              </button>
            )}
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 text-sm rounded-lg text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageEditor;