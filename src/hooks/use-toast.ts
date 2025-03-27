// Tipo simples para as opções de toast
interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

// Hook simplificado de toast
export function toast(options: ToastOptions) {
  const { title, description, variant = 'default' } = options;
  
  console.log(`Toast: ${variant} - ${title} - ${description}`);
  
  // Em um cenário real, isso criaria um elemento toast na UI
  // Como estamos simplificando, apenas exibimos no console
}

// Hook simplificado
export function useToast() {
  return {
    toast,
    toasts: []
  };
} 