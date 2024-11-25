const colors = require('tailwindcss/colors')

module.exports = {
  content: [ 
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}' 
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px'
    },
    colors: {
      ...colors,
      calcite: {
        "brand": "var(--calcite-ui-brand)",
        "brand-hover": "var(--calcite-ui-brand-hover)",
        "brand-press": "var(--calcite-ui-brand-press)",
        "info": "var(--calcite-ui-info)",
        "success": "var(--calcite-ui-success)",
        "warning": "var(--calcite-ui-warning)",
        "danger": "var(--calcite-ui-danger)",
        "danger-hover": "var(--calcite-ui-danger-hover)",
        "danger-press": "var(--calcite-ui-danger-press)",
        background: {
          DEFAULT: 'var(--calcite-ui-background)',
          black: '#323232'
        },
        foreground: {
          1: "var(--calcite-ui-foreground-1)",
          2: "var(--calcite-ui-foreground-2)",
          3: "var(--calcite-ui-foreground-3)"
        },
        text: {
          1: "var(--calcite-ui-text-1)",
          2: "var(--calcite-ui-text-2)",
          3: "var(--calcite-ui-text-3)",
          "inverse": "var(--calcite-ui-text-inverse)",
          "link": "var(--calcite-ui-text-link)"
        },
        border: {
          1: "var(--calcite-ui-border-1)",
          2: "var(--calcite-ui-border-2)",
          3: "var(--calcite-ui-border-3)",
          "input": "var(--calcite-ui-border-input)",
        }
      },
      theme: {
        'background': 'var(--theme-background)',
        'foreground': 'var(--theme-foreground)',
      }
    },
    container: {
      center: true,
      padding: ".5rem"
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
