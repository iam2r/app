const path = require('path')

const defaultPolyfills = [
  // promise polyfill alone doesn't work in IE,
  // needs this as well. see: #1642
  'es.array.iterator',
  // this is required for webpack code splitting, vuex etc.
  'es.promise',
  // this is needed for object rest spread support in templates
  // as vue-template-es2015-compiler 1.8+ compiles it to Object.assign() calls.
  'es.object.assign',
  // #2012 es6.promise replaces native Promise in FF and causes missing finally
  'es.promise.finally'
]

function getPolyfills(targets, includes, {
  ignoreBrowserslistConfig,
  configPath
}) {
  const {
    isPluginRequired
  } = require('@babel/preset-env')
  const builtInsList = require('core-js-compat/data')
  const getTargets = require('@babel/preset-env/lib/targets-parser').default
  const builtInTargets = getTargets(targets, {
    ignoreBrowserslistConfig,
    configPath
  })

  return includes.filter(item => {
    return isPluginRequired(builtInTargets, builtInsList[item])
  })
}

module.exports = (context, options = {}) => {
  const presets = []
  const plugins = []
  const defaultEntryFiles = JSON.parse(process.env.ENTRY_FILES || '[]');
  const defaultIgnoreBrowserslistConfig = isModern = process.env.BUILD_MODE == 'modern';
  const demandList = options.demandList || [];
  const appsTypes = options.appsTypes || {};
  // Though in the vue-cli repo, we only use the two envrionment variables
  // for tests, users may have relied on them for some features,
  // dropping them may break some projects.
  // So in the following blocks we don't directly test the `NODE_ENV`.
  // Rather, we turn it into the two commonly used feature flags.

  // JSX
  if (options.jsx !== false && options.appsTypes != false) {
    appsTypes.react && appsTypes.react.includes(process.env.APP_NAME) && presets.push("@babel/preset-react");
    appsTypes.vue && appsTypes.vue.includes(process.env.APP_NAME) && presets.push([require('@vue/babel-preset-jsx'), typeof options.jsx === 'object' ? options.jsx : {}])
  }

  const runtimePath = path.dirname(require.resolve('@babel/runtime/package.json'))
  const {
    polyfills: userPolyfills,
    loose = false,
    debug = false,
    useBuiltIns = 'usage',
    modules = false,
    targets: rawTargets,
    spec,
    ignoreBrowserslistConfig = defaultIgnoreBrowserslistConfig,
    configPath,
    include,
    exclude,
    shippedProposals,
    forceAllTransforms,
    decoratorsBeforeExport,
    decoratorsLegacy,
    // entry file list
    entryFiles = defaultEntryFiles,

    // Undocumented option of @babel/plugin-transform-runtime.
    // When enabled, an absolute path is used when importing a runtime helper after transforming.
    // This ensures the transpiled file always use the runtime version required in this package.
    // However, this may cause hash inconsistency if the project is moved to another directory.
    // So here we allow user to explicit disable this option if hash consistency is a requirement
    // and the runtime version is sure to be correct.
    absoluteRuntime = runtimePath
  } = options

  // resolve targets
  let targets;
  if (isModern) {
    // targeting browsers that support <script type="module">
    targets = {
      esmodules: true
    }
  } else {
    targets = rawTargets
  }

  console.log(targets)

  // included-by-default polyfills. These are common polyfills that 3rd party
  // dependencies may rely on (e.g. Vuex relies on Promise), but since with
  // useBuiltIns: 'usage' we won't be running Babel on these deps, they need to
  // be force-included.
  let polyfills
  if (
    useBuiltIns === 'usage' &&
    !isModern
  ) {
    polyfills = getPolyfills(targets, userPolyfills || defaultPolyfills, {
      ignoreBrowserslistConfig,
      configPath
    })
    plugins.push([
      require('./polyfillsPlugin'),
      {
        polyfills,
        entryFiles,
        useAbsolutePath: !!absoluteRuntime
      }
    ])
  } else {
    polyfills = []
  }

  const envOptions = {
    corejs: 3,
    spec,
    loose,
    debug,
    modules,
    targets,
    useBuiltIns,
    ignoreBrowserslistConfig,
    configPath,
    include,
    exclude: polyfills.concat(exclude || []),
    shippedProposals,
    forceAllTransforms
  }

  // pass options along to babel-preset-env
  presets.unshift([require('@babel/preset-env'), envOptions])

  // additional <= stage-3 plugins
  // Babel 7 is removing stage presets altogether because people are using
  // too many unstable proposals. Let's be conservative in the defaults here.
  plugins.push(
    ...demandList,
    require('@babel/plugin-syntax-jsx'),
    require('@babel/plugin-syntax-dynamic-import'),
    [require('@babel/plugin-proposal-decorators'), {
      decoratorsBeforeExport,
      legacy: decoratorsLegacy !== false
    }],
    [require('@babel/plugin-proposal-class-properties'), {
      loose
    }],
  )

  // transform runtime, but only for helpers
  plugins.push([require('@babel/plugin-transform-runtime'), {
    regenerator: useBuiltIns !== 'usage',

    // polyfills are injected by preset-env & polyfillsPlugin, so no need to add them again
    corejs: false,

    helpers: useBuiltIns === 'usage',
    useESModules: true,

    absoluteRuntime
  }])

  return {
    sourceType: 'unambiguous',
    overrides: [{
      exclude: [/@babel[\/|\\\\]runtime/, /core-js/],
      presets,
      plugins
    }, {
      // there are some untranspiled code in @babel/runtime
      // https://github.com/babel/babel/issues/9903
      include: [/@babel[\/|\\\\]runtime/],
      presets: [
        [require('@babel/preset-env'), {
          useBuiltIns,
          corejs: 3
        }]
      ]
    }]
  }
}