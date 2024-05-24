const config = {
  presets: [require('@repo/shared-ui/tailwind.config')],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@repo/shared-ui/src/**/*.{js,jsx,ts,tsx}',
  ],
};

export default config;
