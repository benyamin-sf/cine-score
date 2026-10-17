/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    'selector-class-pattern': null,
    'unit-allowed-list': ['%', 'deg', 'em', 'rem', 'svh', 'svw', 's', 'ms'],
    'color-named': 'never',
    'color-no-hex': true,
  },
}
