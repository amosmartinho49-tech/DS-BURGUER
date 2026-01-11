import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cart }) => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    endereco: '',
    obs: ''
  });

  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let texto = `*NOVO PEDIDO - DS BURGUER*\n\n`;
    texto += `*Cliente:* ${formData.nome}\n`;
    texto += `*Telefone:* ${formData.telefone}\n`;
    texto += `*Endereço:* ${formData.endereco}\n\n`;
    texto += `*PEDIDO:*\n`;
    
    cart.forEach(item => {
        texto += `• ${item.qty}x ${item.name} (${(item.qty * item.price).toLocaleString()} Kz)\n`;
    });

    texto += `\n*TOTAL: ${total.toLocaleString()} Kz*`;
    if(formData.obs) texto += `\n\n*Obs:* ${formData.obs}`;

    // Updated WhatsApp number
    const url = `https://wa.me/244940723636?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-end sm:items-center justify-center backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-t-2xl sm:rounded-2xl p-6 max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold text-text-dark">Finalizar Pedido</h3>
          <button onClick={onClose} className="text-text-gray hover:text-primary text-2xl transition-colors">
            &times;
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {cart.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-text-dark">
                <span className="font-bold mr-2">{item.qty}x</span> 
                {item.name}
              </span>
              <span className="text-sm font-bold text-text-gray">
                {(item.qty * item.price).toLocaleString()} Kz
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-3 border-t-2 border-dashed border-gray-200">
            <span className="font-extrabold text-lg">Total</span>
            <span className="font-extrabold text-lg text-primary">{total.toLocaleString()} Kz</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-text-gray mb-1.5 uppercase">Nome Completo</label>
            <input 
              type="text" 
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Como te chamas?" 
              required
              className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-gray mb-1.5 uppercase">Telefone</label>
            <input 
              type="tel" 
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="Teu número de Angola" 
              required
              className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-gray mb-1.5 uppercase">Localização / Endereço</label>
            <input 
              type="text" 
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              placeholder="Bairro, Rua, Prédio..." 
              required
              className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-gray mb-1.5 uppercase">Observações</label>
            <textarea 
              rows={2} 
              name="obs"
              value={formData.obs}
              onChange={handleChange}
              placeholder="Sem cebola, bem passado..."
              className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#25D366] text-white p-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-[#1da851] transition-colors shadow-lg active:scale-[0.98]"
          >
            <i className="fab fa-whatsapp text-lg"></i> ENVIAR PEDIDO AO WHATSAPP
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;