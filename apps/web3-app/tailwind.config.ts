import { text } from "stream/consumers";
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
				text:{
					DEFAULT: 'hsl(var(--text-color))',
					light: 'hsl(var(--text-light))',
					dark: 'hsl(var(--text-dark))',
					hover: 'hsl(var(--text-hover))',
					active: 'hsl(var(--text-active))',
					disabled: 'hsl(var(--text-disabled))',
				},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				light: '#c5ff1a',
  				dark: '#9EE37D',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			dark: {
  				DEFAULT: '#04060c',
  				light: '#0c1018',
  				lighter: '#161c26'
  			},
  			accent: {
  				green: '#b2f000',
  				purple: '#6e44ff',
  				blue: '#0095ff',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			state: {
  				success: '#b2f000',
  				error: '#ff4444',
  				warning: '#ffb700',
  				info: '#0095ff'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		animation: {
  			confetti: 'topBubbles var(--animation-duration) ease-in-out forwards, bottomBubbles var(--animation-duration) ease-in-out forwards'
  		},
  		keyframes: {
  			breathe: {
  				'0%': {
  					transform: 'scale(0.5)',
  					opacity: 0.5
  				},
  				'50%': {
  					transform: 'scale(1)',
  					opacity: 1
  				},
  				'100%': {
  					transform: 'scale(0.5)',
  					opacity: 0.5
  				}
  			},
  			topBubbles: {
  				'0%': {
  					backgroundPosition: '5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%',
  					opacity: '0'
  				},
  				'50%': {
  					backgroundPosition: '0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%',
  					opacity: '1'
  				},
  				'100%': {
  					backgroundPosition: '0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%',
  					backgroundSize: '0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%',
  					opacity: '0'
  				}
  			},
  			bottomBubbles: {
  				'0%': {
  					backgroundPosition: '10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%'
  				},
  				'50%': {
  					backgroundPosition: '0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%'
  				},
  				'100%': {
  					backgroundPosition: '0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%',
  					backgroundSize: '0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%'
  				}
  			}
  		},
  		boxShadow: {
  			'custom-lg': '0 10px 15px -3px rgba(178, 240, 0, 0.1), 0 4px 6px -2px rgba(178, 240, 0, 0.05)',
  			'custom-xl': '0 20px 25px -5px rgba(178, 240, 0, 0.15), 0 10px 10px -5px rgba(178, 240, 0, 0.1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")], //这是我们添加的内容.
  // plugins: [], //这是我们添加的内容.
} satisfies Config;
