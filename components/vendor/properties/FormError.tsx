export const FormError = ({ message }: { message?: string }) => 
  message ? <p className="text-rose-500 text-xs mt-1">{message}</p> : null;