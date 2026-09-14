import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  const isNetlify = process.env.NETLIFY === 'true';

  return {
    plugins: [react()],
    base: isNetlify
      ? '/'
      : command === 'build'
        ? '/maqta-lab-03-safra-react-ecommerce/'
        : '/',
  };
});
