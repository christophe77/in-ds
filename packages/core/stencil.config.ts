import type { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
  namespace: 'ind-ds',
  sourceMap: true,
  globalStyle: 'src/global/global.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
      generateTypeDeclarations: true,
    },
    reactOutputTarget({
      stencilPackageName: '@ind-ds/core',
      outDir: '../react/src/generated/',
    }),
    vueOutputTarget({
      componentCorePackage: '@ind-ds/core',
      proxiesFile: '../vue/src/generated/components.ts',
      includeImportCustomElements: true,
      customElementsDir: 'dist/components',
      componentModels: [
        { elements: ['ind-input', 'ind-textarea', 'ind-slider', 'ind-knob'], event: 'indInput', targetAttr: 'value' },
        { elements: ['ind-select', 'ind-setpoint'], event: 'indChange', targetAttr: 'value' },
        { elements: ['ind-checkbox', 'ind-toggle'], event: 'indChange', targetAttr: 'checked' },
      ],
    }),
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-json',
      file: 'dist/docs.json',
    },
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
  testing: {
    browserHeadless: 'shell',
  },
};
