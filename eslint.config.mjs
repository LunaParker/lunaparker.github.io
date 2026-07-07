import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // wrangler dev writes generated bundles into worker/.wrangler while it
  // runs; they aren't ours to lint.
  { ignores: ['worker/.wrangler/**'] },
)
