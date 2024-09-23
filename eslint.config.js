import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
export default [
  // add more generic rulesets here, such as:
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      // override/add rules settings here, such as:
      'vue/no-unused-vars': 'error',
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['Popup']
        }
      ]
    }
  },
  eslintConfigPrettier
]
