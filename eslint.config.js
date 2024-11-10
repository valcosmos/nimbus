import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: true,
      ignores: [],
    }],
  },
})
