import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    { ignores: ["dist", "src/config.js"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: { react: react, "react-hooks": reactHooks, "react-refresh": reactRefresh },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            ...reactHooks.configs["recommended-latest"].rules,
            ...react.configs.recommended.rules,
            "react/no-deprecated": "error",
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            "@typescript-eslint/no-explicit-any": "warn",
            "react-hooks/exhaustive-deps": "warn",
            "react/react-in-jsx-scope": "off", // Not needed with React 17+ https://kinsta.com/knowledgebase/react-must-be-in-scope-when-using-jsx/#2-update-eslint-configuration-fix-for-react-v17-and-higher
            "react/jsx-uses-react": "off", // Not needed with React 17+ https://kinsta.com/knowledgebase/react-must-be-in-scope-when-using-jsx/#2-update-eslint-configuration-fix-for-react-v17-and-higher
            "react/prop-types": "off", // CoPilot: "TypeScript makes PropTypes unnecessary, so you can turn off the ESLint rule that enforces them."
        },
    },
);
