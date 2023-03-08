/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx,json}",
    ],
    theme: {
        extend: {
            colors: {
                //light mode
                primary: '#ff6600',
                secondary: '#6366f1',
                tertiary: '#06b6d4',
                quaternary: '#ec4899',
                neutral1: '#6b7280',
                neutral2: '#cbd5e1',
                label: '#94a3b8',
                placeholder: '#94a3b8',
                info: '#3b82f6',
                success: '#22c55e',
                warning: '#f59e0b',
                danger: '#ef4444',

                //dark mode
                primaryDark: '#ea580c',
                secondaryDark: '#4f46e5',
                tertiaryDark: '#0891b2',
                quaternaryDark: '#be185d',
                neutral1Dark: '#737373',
                neutral2Dark: '#1e293b',
                labelDark: '#94a3b8',
                placeholderDark: '#9ca3af',
                infoDark: '#2563eb',
                successDark: '#047857',
                warningDark: '#d97706',
                dangerDark: '#b91c1c'
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
