import StyleDictionary from 'style-dictionary';

const baseSources = [
  'tokens/core/**/*.json',
  'tokens/semantic/**/*.json',
];

/**
 * Base build: emits all tokens at :root (dark is the default HMI theme),
 * plus JS/TS/JSON/Dart artifacts for non-CSS consumers (Flutter HMIs, build tools).
 */
async function buildBase() {
  const sd = new StyleDictionary({
    source: baseSources,
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'dist/css/',
        files: [
          {
            destination: 'tokens.css',
            format: 'css/variables',
            options: {
              selector: ':root, [data-theme="dark"]',
              outputReferences: true,
            },
          },
        ],
      },
      js: {
        transformGroup: 'js',
        buildPath: 'dist/js/',
        files: [
          { destination: 'tokens.js', format: 'javascript/esm' },
          { destination: 'tokens.d.ts', format: 'typescript/es6-declarations' },
        ],
      },
      json: {
        transformGroup: 'js',
        buildPath: 'dist/json/',
        files: [
          { destination: 'tokens.json', format: 'json/flat' },
        ],
      },
      dart: {
        transformGroup: 'js',
        buildPath: 'dist/dart/',
        files: [
          {
            destination: 'tokens.dart',
            format: 'flutter/class.dart',
            className: 'IndTokens',
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
}

/**
 * Theme overlay: emits only the tokens defined in tokens/themes/<theme>.json,
 * scoped under [data-theme="<theme>"] so they can be switched at runtime.
 * References still resolve against the full token graph.
 */
async function buildTheme(theme) {
  const sd = new StyleDictionary({
    source: [...baseSources, `tokens/themes/${theme}.json`],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'dist/css/themes/',
        files: [
          {
            destination: `${theme}.css`,
            format: 'css/variables',
            filter: (token) =>
              typeof token.filePath === 'string' &&
              token.filePath.replace(/\\/g, '/').includes(`tokens/themes/${theme}.json`),
            options: {
              selector: `[data-theme="${theme}"]`,
              outputReferences: false,
            },
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
}

await buildBase();
for (const theme of ['light', 'high-contrast']) {
  await buildTheme(theme);
}

console.log('\n✓ @ind-ds/tokens built\n');
