import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  //base: "/expo_pam_ppm_pwm/", // to work with github pages
  plugins: [react()]
})
