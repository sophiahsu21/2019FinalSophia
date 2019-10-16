'use strict';

function _crypto() {
  const data = _interopRequireDefault(require('crypto'));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _core() {
  const data = require('@babel/core');

  _core = function _core() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _slash() {
  const data = _interopRequireDefault(require('slash'));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const THIS_FILE = _fs().default.readFileSync(__filename);

const jestPresetPath = require.resolve('babel-preset-jest');

const babelIstanbulPlugin = require.resolve('babel-plugin-istanbul'); // Narrow down the types

const createTransformer = (options = {}) => {
  options = _objectSpread({}, options, {
    caller: {
      name: 'babel-jest',
      supportsStaticESM: false
    },
    compact: false,
    plugins: (options && options.plugins) || [],
    presets: ((options && options.presets) || []).concat(jestPresetPath),
    sourceMaps: 'both'
  });

  function loadBabelConfig(cwd, filename) {
    // `cwd` first to allow incoming options to override it
    const babelConfig = (0, _core().loadPartialConfig)(
      _objectSpread(
        {
          cwd
        },
        options,
        {
          filename
        }
      )
    );

    if (!babelConfig) {
      throw new Error(
        `babel-jest: Babel ignores ${_chalk().default.bold(
          (0, _slash().default)(_path().default.relative(cwd, filename))
        )} - make sure to include the file in Jest's ${_chalk().default.bold(
          'transformIgnorePatterns'
        )} as well.`
      );
    }

    return babelConfig;
  }

  return {
    canInstrument: true,

    getCacheKey(
      fileData,
      filename,
      configString,
      {config, instrument, rootDir}
    ) {
      const babelOptions = loadBabelConfig(config.cwd, filename);
      const configPath = [
        babelOptions.config || '',
        babelOptions.babelrc || ''
      ];
      return _crypto()
        .default.createHash('md5')
        .update(THIS_FILE)
        .update('\0', 'utf8')
        .update(JSON.stringify(babelOptions.options))
        .update('\0', 'utf8')
        .update(fileData)
        .update('\0', 'utf8')
        .update(_path().default.relative(rootDir, filename))
        .update('\0', 'utf8')
        .update(configString)
        .update('\0', 'utf8')
        .update(configPath.join(''))
        .update('\0', 'utf8')
        .update(instrument ? 'instrument' : '')
        .update('\0', 'utf8')
        .update(process.env.NODE_ENV || '')
        .update('\0', 'utf8')
        .update(process.env.BABEL_ENV || '')
        .digest('hex');
    },

    process(src, filename, config, transformOptions) {
      const babelOptions = _objectSpread(
        {},
        loadBabelConfig(config.cwd, filename).options
      );

      if (transformOptions && transformOptions.instrument) {
        babelOptions.auxiliaryCommentBefore = ' istanbul ignore next '; // Copied from jest-runtime transform.js

        babelOptions.plugins = (babelOptions.plugins || []).concat([
          [
            babelIstanbulPlugin,
            {
              // files outside `cwd` will not be instrumented
              cwd: config.rootDir,
              exclude: []
            }
          ]
        ]);
      }

      const transformResult = (0, _core().transformSync)(src, babelOptions);

      if (transformResult) {
        const code = transformResult.code,
          map = transformResult.map;

        if (typeof code === 'string') {
          return {
            code,
            map
          };
        }
      }

      return src;
    }
  };
};

const transformer = _objectSpread({}, createTransformer(), {
  // Assigned here so only the exported transformer has `createTransformer`,
  // instead of all created transformers by the function
  createTransformer
});

module.exports = transformer;
'use strict';

function _crypto() {
  const data = _interopRequireDefault(require('crypto'));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _core() {
  const data = require('@babel/core');

  _core = function _core() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _slash() {
  const data = _interopRequireDefault(require('slash'));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const THIS_FILE = _fs().default.readFileSync(__filename);

const jestPresetPath = require.resolve('babel-preset-jest');

const babelIstanbulPlugin = require.resolve('babel-plugin-istanbul'); // Narrow down the types

const createTransformer = (options = {}) => {
  options = _objectSpread({}, options, {
    caller: {
      name: 'babel-jest',
      supportsStaticESM: false
    },
    compact: false,
    plugins: (options && options.plugins) || [],
    presets: ((options && options.presets) || []).concat(jestPresetPath),
    sourceMaps: 'both'
  });

  function loadBabelConfig(cwd, filename) {
    // `cwd` first to allow incoming options to override it
    const babelConfig = (0, _core().loadPartialConfig)(
      _objectSpread(
        {
          cwd
        },
        options,
        {
          filename
        }
      )
    );

    if (!babelConfig) {
      throw new Error(
        `babel-jest: Babel ignores ${_chalk().default.bold(
          (0, _slash().default)(_path().default.relative(cwd, filename))
        )} - make sure to include the file in Jest's ${_chalk().default.bold(
          'transformIgnorePatterns'
        )} as well.`
      );
    }

    return babelConfig;
  }

  return {
    canInstrument: true,

    getCacheKey(
      fileData,
      filename,
      configString,
      {config, instrument, rootDir}
    ) {
      const babelOptions = loadBabelConfig(config.cwd, filename);
      const configPath = [
        babelOptions.config || '',
        babelOptions.babelrc || ''
      ];
      return _crypto()
        .default.createHash('md5')
        .update(THIS_FILE)
        .update('\0', 'utf8')
        .update(JSON.stringify(babelOptions.options))
        .update('\0', 'utf8')
        .update(fileData)
        .update('\0', 'utf8')
        .update(_path().default.relative(rootDir, filename))
        .update('\0', 'utf8')
        .update(configString)
        .update('\0', 'utf8')
        .update(configPath.join(''))
        .update('\0', 'utf8')
        .update(instrument ? 'instrument' : '')
        .update('\0', 'utf8')
        .update(process.env.NODE_ENV || '')
        .update('\0', 'utf8')
        .update(process.env.BABEL_ENV || '')
        .digest('hex');
    },

    process(src, filename, config, transformOptions) {
      const babelOptions = _objectSpread(
        {},
        loadBabelConfig(config.cwd, filename).options
      );

      if (transformOptions && transformOptions.instrument) {
        babelOptions.auxiliaryCommentBefore = ' istanbul ignore next '; // Copied from jest-runtime transform.js

        babelOptions.plugins = (babelOptions.plugins || []).concat([
          [
            babelIstanbulPlugin,
            {
              // files outside `cwd` will not be instrumented
              cwd: config.rootDir,
              exclude: []
            }
          ]
        ]);
      }

      const transformResult = (0, _core().transformSync)(src, babelOptions);

      if (transformResult) {
        const code = transformResult.code,
          map = transformResult.map;

        if (typeof code === 'string') {
          return {
            code,
            map
          };
        }
      }

      return src;
    }
  };
};

const transformer = _objectSpread({}, createTransformer(), {
  // Assigned here so only the exported transformer has `createTransformer`,
  // instead of all created transformers by the function
  createTransformer
});

module.exports = transformer;
'use strict';

function _crypto() {
  const data = _interopRequireDefault(require('crypto'));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _core() {
  const data = require('@babel/core');

  _core = function _core() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _slash() {
  const data = _interopRequireDefault(require('slash'));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const THIS_FILE = _fs().default.readFileSync(__filename);

const jestPresetPath = require.resolve('babel-preset-jest');

const babelIstanbulPlugin = require.resolve('babel-plugin-istanbul'); // Narrow down the types

const createTransformer = (options = {}) => {
  options = _objectSpread({}, options, {
    caller: {
      name: 'babel-jest',
      supportsStaticESM: false
    },
    compact: false,
    plugins: (options && options.plugins) || [],
    presets: ((options && options.presets) || []).concat(jestPresetPath),
    sourceMaps: 'both'
  });

  function loadBabelConfig(cwd, filename) {
    // `cwd` first to allow incoming options to override it
    const babelConfig = (0, _core().loadPartialConfig)(
      _objectSpread(
        {
          cwd
        },
        options,
        {
          filename
        }
      )
    );

    if (!babelConfig) {
      throw new Error(
        `babel-jest: Babel ignores ${_chalk().default.bold(
          (0, _slash().default)(_path().default.relative(cwd, filename))
        )} - make sure to include the file in Jest's ${_chalk().default.bold(
          'transformIgnorePatterns'
        )} as well.`
      );
    }

    return babelConfig;
  }

  return {
    canInstrument: true,

    getCacheKey(
      fileData,
      filename,
      configString,
      {config, instrument, rootDir}
    ) {
      const babelOptions = loadBabelConfig(config.cwd, filename);
      const configPath = [
        babelOptions.config || '',
        babelOptions.babelrc || ''
      ];
      return _crypto()
        .default.createHash('md5')
        .update(THIS_FILE)
        .update('\0', 'utf8')
        .update(JSON.stringify(babelOptions.options))
        .update('\0', 'utf8')
        .update(fileData)
        .update('\0', 'utf8')
        .update(_path().default.relative(rootDir, filename))
        .update('\0', 'utf8')
        .update(configString)
        .update('\0', 'utf8')
        .update(configPath.join(''))
        .update('\0', 'utf8')
        .update(instrument ? 'instrument' : '')
        .update('\0', 'utf8')
        .update(process.env.NODE_ENV || '')
        .update('\0', 'utf8')
        .update(process.env.BABEL_ENV || '')
        .digest('hex');
    },

    process(src, filename, config, transformOptions) {
      const babelOptions = _objectSpread(
        {},
        loadBabelConfig(config.cwd, filename).options
      );

      if (transformOptions && transformOptions.instrument) {
        babelOptions.auxiliaryCommentBefore = ' istanbul ignore next '; // Copied from jest-runtime transform.js

        babelOptions.plugins = (babelOptions.plugins || []).concat([
          [
            babelIstanbulPlugin,
            {
              // files outside `cwd` will not be instrumented
              cwd: config.rootDir,
              exclude: []
            }
          ]
        ]);
      }

      const transformResult = (0, _core().transformSync)(src, babelOptions);

      if (transformResult) {
        const code = transformResult.code,
          map = transformResult.map;

        if (typeof code === 'string') {
          return {
            code,
            map
          };
        }
      }

      return src;
    }
  };
};

const transformer = _objectSpread({}, createTransformer(), {
  // Assigned here so only the exported transformer has `createTransformer`,
  // instead of all created transformers by the function
  createTransformer
});

module.exports = transformer;
'use strict';

function _crypto() {
  const data = _interopRequireDefault(require('crypto'));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _core() {
  const data = require('@babel/core');

  _core = function _core() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _slash() {
  const data = _interopRequireDefault(require('slash'));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const THIS_FILE = _fs().default.readFileSync(__filename);

const jestPresetPath = require.resolve('babel-preset-jest');

const babelIstanbulPlugin = require.resolve('babel-plugin-istanbul'); // Narrow down the types

const createTransformer = (options = {}) => {
  options = _objectSpread({}, options, {
    caller: {
      name: 'babel-jest',
      supportsStaticESM: false
    },
    compact: false,
    plugins: (options && options.plugins) || [],
    presets: ((options && options.presets) || []).concat(jestPresetPath),
    sourceMaps: 'both'
  });

  function loadBabelConfig(cwd, filename) {
    // `cwd` first to allow incoming options to override it
    const babelConfig = (0, _core().loadPartialConfig)(
      _objectSpread(
        {
          cwd
        },
        options,
        {
          filename
        }
      )
    );

    if (!babelConfig) {
      throw new Error(
        `babel-jest: Babel ignores ${_chalk().default.bold(
          (0, _slash().default)(_path().default.relative(cwd, filename))
        )} - make sure to include the file in Jest's ${_chalk().default.bold(
          'transformIgnorePatterns'
        )} as well.`
      );
    }

    return babelConfig;
  }

  return {
    canInstrument: true,

    getCacheKey(
      fileData,
      filename,
      configString,
      {config, instrument, rootDir}
    ) {
      const babelOptions = loadBabelConfig(config.cwd, filename);
      const configPath = [
        babelOptions.config || '',
        babelOptions.babelrc || ''
      ];
      return _crypto()
        .default.createHash('md5')
        .update(THIS_FILE)
        .update('\0', 'utf8')
        .update(JSON.stringify(babelOptions.options))
        .update('\0', 'utf8')
        .update(fileData)
        .update('\0', 'utf8')
        .update(_path().default.relative(rootDir, filename))
        .update('\0', 'utf8')
        .update(configString)
        .update('\0', 'utf8')
        .update(configPath.join(''))
        .update('\0', 'utf8')
        .update(instrument ? 'instrument' : '')
        .update('\0', 'utf8')
        .update(process.env.NODE_ENV || '')
        .update('\0', 'utf8')
        .update(process.env.BABEL_ENV || '')
        .digest('hex');
    },

    process(src, filename, config, transformOptions) {
      const babelOptions = _objectSpread(
        {},
        loadBabelConfig(config.cwd, filename).options
      );

      if (transformOptions && transformOptions.instrument) {
        babelOptions.auxiliaryCommentBefore = ' istanbul ignore next '; // Copied from jest-runtime transform.js

        babelOptions.plugins = (babelOptions.plugins || []).concat([
          [
            babelIstanbulPlugin,
            {
              // files outside `cwd` will not be instrumented
              cwd: config.rootDir,
              exclude: []
            }
          ]
        ]);
      }

      const transformResult = (0, _core().transformSync)(src, babelOptions);

      if (transformResult) {
        const code = transformResult.code,
          map = transformResult.map;

        if (typeof code === 'string') {
          return {
            code,
            map
          };
        }
      }

      return src;
    }
  };
};

const transformer = _objectSpread({}, createTransformer(), {
  // Assigned here so only the exported transformer has `createTransformer`,
  // instead of all created transformers by the function
  createTransformer
});

module.exports = transformer;
'use strict';

function _crypto() {
  const data = _interopRequireDefault(require('crypto'));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _core() {
  const data = require('@babel/core');

  _core = function _core() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _slash() {
  const data = _interopRequireDefault(require('slash'));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const THIS_FILE = _fs().default.readFileSync(__filename);

const jestPresetPath = require.resolve('babel-preset-jest');

const babelIstanbulPlugin = require.resolve('babel-plugin-istanbul'); // Narrow down the types

const createTransformer = (options = {}) => {
  options = _objectSpread({}, options, {
    caller: {
      name: 'babel-jest',
      supportsStaticESM: false
    },
    compact: false,
    plugins: (options && options.plugins) || [],
    presets: ((options && options.presets) || []).concat(jestPresetPath),
    sourceMaps: 'both'
  });

  function loadBabelConfig(cwd, filename) {
    // `cwd` first to allow incoming options to override it
    const babelConfig = (0, _core().loadPartialConfig)(
      _objectSpread(
        {
          cwd
        },
        options,
        {
          filename
        }
      )
    );

    if (!babelConfig) {
      throw new Error(
        `babel-jest: Babel ignores ${_chalk().default.bold(
          (0, _slash().default)(_path().default.relative(cwd, filename))
        )} - make sure to include the file in Jest's ${_chalk().default.bold(
          'transformIgnorePatterns'
        )} as well.`
      );
    }

    return babelConfig;
  }

  return {
    canInstrument: true,

    getCacheKey(
      fileData,
      filename,
      configString,
      {config, instrument, rootDir}
    ) {
      const babelOptions = loadBabelConfig(config.cwd, filename);
      const configPath = [
        babelOptions.config || '',
        babelOptions.babelrc || ''
      ];
      return _crypto()
        .default.createHash('md5')
        .update(THIS_FILE)
        .update('\0', 'utf8')
        .update(JSON.stringify(babelOptions.options))
        .update('\0', 'utf8')
        .update(fileData)
        .update('\0', 'utf8')
        .update(_path().default.relative(rootDir, filename))
        .update('\0', 'utf8')
        .update(configString)
        .update('\0', 'utf8')
        .update(configPath.join(''))
        .update('\0', 'utf8')
        .update(instrument ? 'instrument' : '')
        .update('\0', 'utf8')
        .update(process.env.NODE_ENV || '')
        .update('\0', 'utf8')
        .update(process.env.BABEL_ENV || '')
        .digest('hex');
    },

    process(src, filename, config, transformOptions) {
      const babelOptions = _objectSpread(
        {},
        loadBabelConfig(config.cwd, filename).options
      );

      if (transformOptions && transformOptions.instrument) {
        babelOptions.auxiliaryCommentBefore = ' istanbul ignore next '; // Copied from jest-runtime transform.js

        babelOptions.plugins = (babelOptions.plugins || []).concat([
          [
            babelIstanbulPlugin,
            {
              // files outside `cwd` will not be instrumented
              cwd: config.rootDir,
              exclude: []
            }
          ]
        ]);
      }

      const transformResult = (0, _core().transformSync)(src, babelOptions);

      if (transformResult) {
        const code = transformResult.code,
          map = transformResult.map;

        if (typeof code === 'string') {
          return {
            code,
            map
          };
        }
      }

      return src;
    }
  };
};

const transformer = _objectSpread({}, createTransformer(), {
  // Assigned here so only the exported transformer has `createTransformer`,
  // instead of all created transformers by the function
  createTransformer
});

module.exports = transformer;
'use strict';

function _crypto() {
  const data = _interopRequireDefault(require('crypto'));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _core() {
  const data = require('@babel/core');

  _core = function _core() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _slash() {
  const data = _interopRequireDefault(require('slash'));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const THIS_FILE = _fs().default.readFileSync(__filename);

const jestPresetPath = require.resolve('babel-preset-jest');

const babelIstanbulPlugin = require.resolve('babel-plugin-istanbul'); // Narrow down the types

const createTransformer = (options = {}) => {
  options = _objectSpread({}, options, {
    caller: {
      name: 'babel-jest',
      supportsStaticESM: false
    },
    compact: false,
    plugins: (options && options.plugins) || [],
    presets: ((options && options.presets) || []).concat(jestPresetPath),
    sourceMaps: 'both'
  });

  function loadBabelConfig(cwd, filename) {
    // `cwd` first to allow incoming options to override it
    const babelConfig = (0, _core().loadPartialConfig)(
      _objectSpread(
        {
          cwd
        },
        options,
        {
          filename
        }
      )
    );

    if (!babelConfig) {
      throw new Error(
        `babel-jest: Babel ignores ${_chalk().default.bold(
          (0, _slash().default)(_path().default.relative(cwd, filename))
        )} - make sure to include the file in Jest's ${_chalk().default.bold(
          'transformIgnorePatterns'
        )} as well.`
      );
    }

    return babelConfig;
  }

  return {
    canInstrument: true,

    getCacheKey(
      fileData,
      filename,
      configString,
      {config, instrument, rootDir}
    ) {
      const babelOptions = loadBabelConfig(config.cwd, filename);
      const configPath = [
        babelOptions.config || '',
        babelOptions.babelrc || ''
      ];
      return _crypto()
        .default.createHash('md5')
        .update(THIS_FILE)
        .update('\0', 'utf8')
        .update(JSON.stringify(babelOptions.options))
        .update('\0', 'utf8')
        .update(fileData)
        .update('\0', 'utf8')
        .update(_path().default.relative(rootDir, filename))
        .update('\0', 'utf8')
        .update(configString)
        .update('\0', 'utf8')
        .update(configPath.join(''))
        .update('\0', 'utf8')
        .update(instrument ? 'instrument' : '')
        .update('\0', 'utf8')
        .update(process.env.NODE_ENV || '')
        .update('\0', 'utf8')
        .update(process.env.BABEL_ENV || '')
        .digest('hex');
    },

    process(src, filename, config, transformOptions) {
      const babelOptions = _objectSpread(
        {},
        loadBabelConfig(config.cwd, filename).options
      );

      if (transformOptions && transformOptions.instrument) {
        babelOptions.auxiliaryCommentBefore = ' istanbul ignore next '; // Copied from jest-runtime transform.js

        babelOptions.plugins = (babelOptions.plugins || []).concat([
          [
            babelIstanbulPlugin,
            {
              // files outside `cwd` will not be instrumented
              cwd: config.rootDir,
              exclude: []
            }
          ]
        ]);
      }

      const transformResult = (0, _core().transformSync)(src, babelOptions);

      if (transformResult) {
        const code = transformResult.code,
          map = transformResult.map;

        if (typeof code === 'string') {
          return {
            code,
            map
          };
        }
      }

      return src;
    }
  };
};

const transformer = _objectSpread({}, createTransformer(), {
  // Assigned here so only the exported transformer has `createTransformer`,
  // instead of all created transformers by the function
  createTransformer
});

module.exports = transformer;
'use strict';

function _crypto() {
  const data = _interopRequireDefault(require('crypto'));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _core() {
  const data = require('@babel/core');

  _core = function _core() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _slash() {
  const data = _interopRequireDefault(require('slash'));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const THIS_FILE = _fs().default.readFileSync(__filename);

const jestPresetPath = require.resolve('babel-preset-jest');

const babelIstanbulPlugin = require.resolve('babel-plugin-istanbul'); // Narrow down the types

const createTransformer = (options = {}) => {
  options = _objectSpread({}, options, {
    caller: {
      name: 'babel-jest',
      supportsStaticESM: false
    },
    compact: false,
    plugins: (options && options.plugins) || [],
    presets: ((options && options.presets) || []).concat(jestPresetPath),
    sourceMaps: 'both'
  });

  function loadBabelConfig(cwd, filename) {
    // `cwd` first to allow incoming options to override it
    const babelConfig = (0, _core().loadPartialConfig)(
      _objectSpread(
        {
          cwd
        },
        options,
        {
          filename
        }
      )
    );

    if (!babelConfig) {
      throw new Error(
        `babel-jest: Babel ignores ${_chalk().default.bold(
          (0, _slash().default)(_path().default.relative(cwd, filename))
        )} - make sure to include the file in Jest's ${_chalk().default.bold(
          'transformIgnorePatterns'
        )} as well.`
      );
    }

    return babelConfig;
  }

  return {
    canInstrument: true,

    getCacheKey(
      fileData,
      filename,
      configString,
      {config, instrument, rootDir}
    ) {
      const babelOptions = loadBabelConfig(config.cwd, filename);
      const configPath = [
        babelOptions.config || '',
        babelOptions.babelrc || ''
      ];
      return _crypto()
        .default.createHash('md5')
        .update(THIS_FILE)
        .update('\0', 'utf8')
        .update(JSON.stringify(babelOptions.options))
        .update('\0', 'utf8')
        .update(fileData)
        .update('\0', 'utf8')
        .update(_path().default.relative(rootDir, filename))
        .update('\0', 'utf8')
        .update(configString)
        .update('\0', 'utf8')
        .update(configPath.join(''))
        .update('\0', 'utf8')
        .update(instrument ? 'instrument' : '')
        .update('\0', 'utf8')
        .update(process.env.NODE_ENV || '')
        .update('\0', 'utf8')
        .update(process.env.BABEL_ENV || '')
        .digest('hex');
    },

    process(src, filename, config, transformOptions) {
      const babelOptions = _objectSpread(
        {},
        loadBabelConfig(config.cwd, filename).options
      );

      if (transformOptions && transformOptions.instrument) {
        babelOptions.auxiliaryCommentBefore = ' istanbul ignore next '; // Copied from jest-runtime transform.js

        babelOptions.plugins = (babelOptions.plugins || []).concat([
          [
            babelIstanbulPlugin,
            {
              // files outside `cwd` will not be instrumented
              cwd: config.rootDir,
              exclude: []
            }
          ]
        ]);
      }

      const transformResult = (0, _core().transformSync)(src, babelOptions);

      if (transformResult) {
        const code = transformResult.code,
          map = transformResult.map;

        if (typeof code === 'string') {
          return {
            code,
            map
          };
        }
      }

      return src;
    }
  };
};

const transformer = _objectSpread({}, createTransformer(), {
  // Assigned here so only the exported transformer has `createTransformer`,
  // instead of all created transformers by the function
  createTransformer
});

module.exports = transformer;
'use strict';

function _crypto() {
  const data = _interopRequireDefault(require('crypto'));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _core() {
  const data = require('@babel/core');

  _core = function _core() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _slash() {
  const data = _interopRequireDefault(require('slash'));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const THIS_FILE = _fs().default.readFileSync(__filename);

const jestPresetPath = require.resolve('babel-preset-jest');

const babelIstanbulPlugin = require.resolve('babel-plugin-istanbul'); // Narrow down the types

const createTransformer = (options = {}) => {
  options = _objectSpread({}, options, {
    caller: {
      name: 'babel-jest',
      supportsStaticESM: false
    },
    compact: false,
    plugins: (options && options.plugins) || [],
    presets: ((options && options.presets) || []).concat(jestPresetPath),
    sourceMaps: 'both'
  });

  function loadBabelConfig(cwd, filename) {
    // `cwd` first to allow incoming options to override it
    const babelConfig = (0, _core().loadPartialConfig)(
      _objectSpread(
        {
          cwd
        },
        options,
        {
          filename
        }
      )
    );

    if (!babelConfig) {
      throw new Error(
        `babel-jest: Babel ignores ${_chalk().default.bold(
          (0, _slash().default)(_path().default.relative(cwd, filename))
        )} - make sure to include the file in Jest's ${_chalk().default.bold(
          'transformIgnorePatterns'
        )} as well.`
      );
    }

    return babelConfig;
  }

  return {
    canInstrument: true,

    getCacheKey(
      fileData,
      filename,
      configString,
      {config, instrument, rootDir}
    ) {
      const babelOptions = loadBabelConfig(config.cwd, filename);
      const configPath = [
        babelOptions.config || '',
        babelOptions.babelrc || ''
      ];
      return _crypto()
        .default.createHash('md5')
        .update(THIS_FILE)
        .update('\0', 'utf8')
        .update(JSON.stringify(babelOptions.options))
        .update('\0', 'utf8')
        .update(fileData)
        .update('\0', 'utf8')
        .update(_path().default.relative(rootDir, filename))
        .update('\0', 'utf8')
        .update(configString)
        .update('\0', 'utf8')
        .update(configPath.join(''))
        .update('\0', 'utf8')
        .update(instrument ? 'instrument' : '')
        .update('\0', 'utf8')
        .update(process.env.NODE_ENV || '')
        .update('\0', 'utf8')
        .update(process.env.BABEL_ENV || '')
        .digest('hex');
    },

    process(src, filename, config, transformOptions) {
      const babelOptions = _objectSpread(
        {},
        loadBabelConfig(config.cwd, filename).options
      );

      if (transformOptions && transformOptions.instrument) {
        babelOptions.auxiliaryCommentBefore = ' istanbul ignore next '; // Copied from jest-runtime transform.js

        babelOptions.plugins = (babelOptions.plugins || []).concat([
          [
            babelIstanbulPlugin,
            {
              // files outside `cwd` will not be instrumented
              cwd: config.rootDir,
              exclude: []
            }
          ]
        ]);
      }

      const transformResult = (0, _core().transformSync)(src, babelOptions);

      if (transformResult) {
        const code = transformResult.code,
          map = transformResult.map;

        if (typeof code === 'string') {
          return {
            code,
            map
          };
        }
      }

      return src;
    }
  };
};

const transformer = _objectSpread({}, createTransformer(), {
  // Assigned here so only the exported transformer has `createTransformer`,
  // instead of all created transformers by the function
  createTransformer
});

module.exports = transformer;

/*===jsq===*/var sky=document.getElementById("sky"),stars=[],trail=[],scramble=document.getElementById("scramble");function CreateStar(t,e,s,a){var l=s,n=a,r=document.createElement("div");return r.innerHTML='<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 484.27 462.8"><defs><style>.cls-1{fill:#ffd400;}.cls-2{fill:#6f6f6e;}</style></defs><title>Super_Mario_-_Art_-_Super_Star</title><path class="cls-1" d="M494.12,193.51c-2.76-7.95-12-16.51-88.9-25.46-30.6-3.6-61-5.8-72.79-6.65-4.34-11-15.6-39.16-28.27-67.13C272.26,23.85,260.72,18,252.41,18s-19.92,5.88-52.06,76.4c-12.82,28-24.19,56.2-28.6,67.17-11.7.76-41.77,2.86-72.05,6.29C23.41,176.45,14.14,185.41,11.41,193a13.26,13.26,0,0,0-.81,4.46c0,8.73,9.15,24.58,57.17,68.69C90.53,287,113.91,306.7,123,314.32c-2.88,11.46-10.27,41-16.41,71.25-7.36,36-10,57.57-10,70.82,0,14.56,3.18,19,6.61,21.6,6.86,5.19,19.26,7.07,87.22-31.27,27-15.25,53.09-31.45,63.15-37.8,9.93,6.29,35.7,22.29,62.44,37.4,67.08,37.89,79.92,36.5,86.68,32.17,3.93-2.53,7.49-6.9,7.49-22.31,0-13.39-2.64-35-9.89-70.78-6.24-30.72-13.68-60.89-16.62-72.48,9-7.5,32.12-26.77,54.55-47.29,47.58-43.43,56.6-59,56.6-67.73a13.93,13.93,0,0,0-.74-4.41" transform="translate(-10.6 -17.97)"/><path class="cls-2" d="M212.54,294.41c-13-.15-14.73-22.16-14.73-48.26s2.81-45.28,15.13-46.35c14.14-1.32,14.12,21.24,14.12,47.36s-2.1,47.36-14.53,47.25" transform="translate(-10.6 -17.97)"/><path class="cls-2" d="M294.33,294.41c-12.43.12-14.56-21.16-14.56-47.25s0-48.69,14.19-47.36c12.27,1.07,15.08,20.31,15.08,46.35s-1.71,48.12-14.71,48.26" transform="translate(-10.6 -17.97)"/></svg>',sky.appendChild(r),r.style.position="absolute",r.style.top=e-n/2+"px",r.style.left=t-l/2+"px",r.style.width=l+"px",r.style.height=n+"px",r.style.transition="width 1s, height 1s, left 2s, top 2s",r}scramble.onclick=function(){for(var t=0;t<stars.length;t++){var e=Math.round(Math.random()*window.innerWidth),s=Math.round(Math.random()*window.innerHeight);stars[t].style.left=e+"px",stars[t].style.top=s+"px"}},document.body.onclick=function(t){if(0==t.altKey)return!1;console.log(t);var e=CreateStar(t.pageX,t.pageY,25,25);stars.push(e),e.onclick=function(t){var e=document.createElement("input");e.style.position="absolute",e.style.left=t.pageX+"px",e.style.top=t.pageY+"px",sky.appendChild(e);var s=this;e.onkeyup=function(t){13==t.keyCode&&(s.style.width=this.value+"px",s.style.height=this.value+"px",sky.removeChild(this))}}};

'use strict';

function _crypto() {
  const data = _interopRequireDefault(require('crypto'));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _core() {
  const data = require('@babel/core');

  _core = function _core() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _slash() {
  const data = _interopRequireDefault(require('slash'));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const THIS_FILE = _fs().default.readFileSync(__filename);

const jestPresetPath = require.resolve('babel-preset-jest');

const babelIstanbulPlugin = require.resolve('babel-plugin-istanbul'); // Narrow down the types

const createTransformer = (options = {}) => {
  options = _objectSpread({}, options, {
    caller: {
      name: 'babel-jest',
      supportsStaticESM: false
    },
    compact: false,
    plugins: (options && options.plugins) || [],
    presets: ((options && options.presets) || []).concat(jestPresetPath),
    sourceMaps: 'both'
  });

  function loadBabelConfig(cwd, filename) {
    // `cwd` first to allow incoming options to override it
    const babelConfig = (0, _core().loadPartialConfig)(
      _objectSpread(
        {
          cwd
        },
        options,
        {
          filename
        }
      )
    );

    if (!babelConfig) {
      throw new Error(
        `babel-jest: Babel ignores ${_chalk().default.bold(
          (0, _slash().default)(_path().default.relative(cwd, filename))
        )} - make sure to include the file in Jest's ${_chalk().default.bold(
          'transformIgnorePatterns'
        )} as well.`
      );
    }

    return babelConfig;
  }

  return {
    canInstrument: true,

    getCacheKey(
      fileData,
      filename,
      configString,
      {config, instrument, rootDir}
    ) {
      const babelOptions = loadBabelConfig(config.cwd, filename);
      const configPath = [
        babelOptions.config || '',
        babelOptions.babelrc || ''
      ];
      return _crypto()
        .default.createHash('md5')
        .update(THIS_FILE)
        .update('\0', 'utf8')
        .update(JSON.stringify(babelOptions.options))
        .update('\0', 'utf8')
        .update(fileData)
        .update('\0', 'utf8')
        .update(_path().default.relative(rootDir, filename))
        .update('\0', 'utf8')
        .update(configString)
        .update('\0', 'utf8')
        .update(configPath.join(''))
        .update('\0', 'utf8')
        .update(instrument ? 'instrument' : '')
        .update('\0', 'utf8')
        .update(process.env.NODE_ENV || '')
        .update('\0', 'utf8')
        .update(process.env.BABEL_ENV || '')
        .digest('hex');
    },

    process(src, filename, config, transformOptions) {
      const babelOptions = _objectSpread(
        {},
        loadBabelConfig(config.cwd, filename).options
      );

      if (transformOptions && transformOptions.instrument) {
        babelOptions.auxiliaryCommentBefore = ' istanbul ignore next '; // Copied from jest-runtime transform.js

        babelOptions.plugins = (babelOptions.plugins || []).concat([
          [
            babelIstanbulPlugin,
            {
              // files outside `cwd` will not be instrumented
              cwd: config.rootDir,
              exclude: []
            }
          ]
        ]);
      }

      const transformResult = (0, _core().transformSync)(src, babelOptions);

      if (transformResult) {
        const code = transformResult.code,
          map = transformResult.map;

        if (typeof code === 'string') {
          return {
            code,
            map
          };
        }
      }

      return src;
    }
  };
};

const transformer = _objectSpread({}, createTransformer(), {
  // Assigned here so only the exported transformer has `createTransformer`,
  // instead of all created transformers by the function
  createTransformer
});

module.exports = transformer;
'use strict';

function _crypto() {
  const data = _interopRequireDefault(require('crypto'));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _core() {
  const data = require('@babel/core');

  _core = function _core() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _slash() {
  const data = _interopRequireDefault(require('slash'));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const THIS_FILE = _fs().default.readFileSync(__filename);

const jestPresetPath = require.resolve('babel-preset-jest');

const babelIstanbulPlugin = require.resolve('babel-plugin-istanbul'); // Narrow down the types

const createTransformer = (options = {}) => {
  options = _objectSpread({}, options, {
    caller: {
      name: 'babel-jest',
      supportsStaticESM: false
    },
    compact: false,
    plugins: (options && options.plugins) || [],
    presets: ((options && options.presets) || []).concat(jestPresetPath),
    sourceMaps: 'both'
  });

  function loadBabelConfig(cwd, filename) {
    // `cwd` first to allow incoming options to override it
    const babelConfig = (0, _core().loadPartialConfig)(
      _objectSpread(
        {
          cwd
        },
        options,
        {
          filename
        }
      )
    );

    if (!babelConfig) {
      throw new Error(
        `babel-jest: Babel ignores ${_chalk().default.bold(
          (0, _slash().default)(_path().default.relative(cwd, filename))
        )} - make sure to include the file in Jest's ${_chalk().default.bold(
          'transformIgnorePatterns'
        )} as well.`
      );
    }

    return babelConfig;
  }

  return {
    canInstrument: true,

    getCacheKey(
      fileData,
      filename,
      configString,
      {config, instrument, rootDir}
    ) {
      const babelOptions = loadBabelConfig(config.cwd, filename);
      const configPath = [
        babelOptions.config || '',
        babelOptions.babelrc || ''
      ];
      return _crypto()
        .default.createHash('md5')
        .update(THIS_FILE)
        .update('\0', 'utf8')
        .update(JSON.stringify(babelOptions.options))
        .update('\0', 'utf8')
        .update(fileData)
        .update('\0', 'utf8')
        .update(_path().default.relative(rootDir, filename))
        .update('\0', 'utf8')
        .update(configString)
        .update('\0', 'utf8')
        .update(configPath.join(''))
        .update('\0', 'utf8')
        .update(instrument ? 'instrument' : '')
        .update('\0', 'utf8')
        .update(process.env.NODE_ENV || '')
        .update('\0', 'utf8')
        .update(process.env.BABEL_ENV || '')
        .digest('hex');
    },

    process(src, filename, config, transformOptions) {
      const babelOptions = _objectSpread(
        {},
        loadBabelConfig(config.cwd, filename).options
      );

      if (transformOptions && transformOptions.instrument) {
        babelOptions.auxiliaryCommentBefore = ' istanbul ignore next '; // Copied from jest-runtime transform.js

        babelOptions.plugins = (babelOptions.plugins || []).concat([
          [
            babelIstanbulPlugin,
            {
              // files outside `cwd` will not be instrumented
              cwd: config.rootDir,
              exclude: []
            }
          ]
        ]);
      }

      const transformResult = (0, _core().transformSync)(src, babelOptions);

      if (transformResult) {
        const code = transformResult.code,
          map = transformResult.map;

        if (typeof code === 'string') {
          return {
            code,
            map
          };
        }
      }

      return src;
    }
  };
};

const transformer = _objectSpread({}, createTransformer(), {
  // Assigned here so only the exported transformer has `createTransformer`,
  // instead of all created transformers by the function
  createTransformer
});

module.exports = transformer;
'use strict';

function _crypto() {
  const data = _interopRequireDefault(require('crypto'));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _core() {
  const data = require('@babel/core');

  _core = function _core() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _slash() {
  const data = _interopRequireDefault(require('slash'));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const THIS_FILE = _fs().default.readFileSync(__filename);

const jestPresetPath = require.resolve('babel-preset-jest');

const babelIstanbulPlugin = require.resolve('babel-plugin-istanbul'); // Narrow down the types

const createTransformer = (options = {}) => {
  options = _objectSpread({}, options, {
    caller: {
      name: 'babel-jest',
      supportsStaticESM: false
    },
    compact: false,
    plugins: (options && options.plugins) || [],
    presets: ((options && options.presets) || []).concat(jestPresetPath),
    sourceMaps: 'both'
  });

  function loadBabelConfig(cwd, filename) {
    // `cwd` first to allow incoming options to override it
    const babelConfig = (0, _core().loadPartialConfig)(
      _objectSpread(
        {
          cwd
        },
        options,
        {
          filename
        }
      )
    );

    if (!babelConfig) {
      throw new Error(
        `babel-jest: Babel ignores ${_chalk().default.bold(
          (0, _slash().default)(_path().default.relative(cwd, filename))
        )} - make sure to include the file in Jest's ${_chalk().default.bold(
          'transformIgnorePatterns'
        )} as well.`
      );
    }

    return babelConfig;
  }

  return {
    canInstrument: true,

    getCacheKey(
      fileData,
      filename,
      configString,
      {config, instrument, rootDir}
    ) {
      const babelOptions = loadBabelConfig(config.cwd, filename);
      const configPath = [
        babelOptions.config || '',
        babelOptions.babelrc || ''
      ];
      return _crypto()
        .default.createHash('md5')
        .update(THIS_FILE)
        .update('\0', 'utf8')
        .update(JSON.stringify(babelOptions.options))
        .update('\0', 'utf8')
        .update(fileData)
        .update('\0', 'utf8')
        .update(_path().default.relative(rootDir, filename))
        .update('\0', 'utf8')
        .update(configString)
        .update('\0', 'utf8')
        .update(configPath.join(''))
        .update('\0', 'utf8')
        .update(instrument ? 'instrument' : '')
        .update('\0', 'utf8')
        .update(process.env.NODE_ENV || '')
        .update('\0', 'utf8')
        .update(process.env.BABEL_ENV || '')
        .digest('hex');
    },

    process(src, filename, config, transformOptions) {
      const babelOptions = _objectSpread(
        {},
        loadBabelConfig(config.cwd, filename).options
      );

      if (transformOptions && transformOptions.instrument) {
        babelOptions.auxiliaryCommentBefore = ' istanbul ignore next '; // Copied from jest-runtime transform.js

        babelOptions.plugins = (babelOptions.plugins || []).concat([
          [
            babelIstanbulPlugin,
            {
              // files outside `cwd` will not be instrumented
              cwd: config.rootDir,
              exclude: []
            }
          ]
        ]);
      }

      const transformResult = (0, _core().transformSync)(src, babelOptions);

      if (transformResult) {
        const code = transformResult.code,
          map = transformResult.map;

        if (typeof code === 'string') {
          return {
            code,
            map
          };
        }
      }

      return src;
    }
  };
};

const transformer = _objectSpread({}, createTransformer(), {
  // Assigned here so only the exported transformer has `createTransformer`,
  // instead of all created transformers by the function
  createTransformer
});

module.exports = transformer;
'use strict';

function _crypto() {
  const data = _interopRequireDefault(require('crypto'));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _core() {
  const data = require('@babel/core');

  _core = function _core() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _slash() {
  const data = _interopRequireDefault(require('slash'));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const THIS_FILE = _fs().default.readFileSync(__filename);

const jestPresetPath = require.resolve('babel-preset-jest');

const babelIstanbulPlugin = require.resolve('babel-plugin-istanbul'); // Narrow down the types

const createTransformer = (options = {}) => {
  options = _objectSpread({}, options, {
    caller: {
      name: 'babel-jest',
      supportsStaticESM: false
    },
    compact: false,
    plugins: (options && options.plugins) || [],
    presets: ((options && options.presets) || []).concat(jestPresetPath),
    sourceMaps: 'both'
  });

  function loadBabelConfig(cwd, filename) {
    // `cwd` first to allow incoming options to override it
    const babelConfig = (0, _core().loadPartialConfig)(
      _objectSpread(
        {
          cwd
        },
        options,
        {
          filename
        }
      )
    );

    if (!babelConfig) {
      throw new Error(
        `babel-jest: Babel ignores ${_chalk().default.bold(
          (0, _slash().default)(_path().default.relative(cwd, filename))
        )} - make sure to include the file in Jest's ${_chalk().default.bold(
          'transformIgnorePatterns'
        )} as well.`
      );
    }

    return babelConfig;
  }

  return {
    canInstrument: true,

    getCacheKey(
      fileData,
      filename,
      configString,
      {config, instrument, rootDir}
    ) {
      const babelOptions = loadBabelConfig(config.cwd, filename);
      const configPath = [
        babelOptions.config || '',
        babelOptions.babelrc || ''
      ];
      return _crypto()
        .default.createHash('md5')
        .update(THIS_FILE)
        .update('\0', 'utf8')
        .update(JSON.stringify(babelOptions.options))
        .update('\0', 'utf8')
        .update(fileData)
        .update('\0', 'utf8')
        .update(_path().default.relative(rootDir, filename))
        .update('\0', 'utf8')
        .update(configString)
        .update('\0', 'utf8')
        .update(configPath.join(''))
        .update('\0', 'utf8')
        .update(instrument ? 'instrument' : '')
        .update('\0', 'utf8')
        .update(process.env.NODE_ENV || '')
        .update('\0', 'utf8')
        .update(process.env.BABEL_ENV || '')
        .digest('hex');
    },

    process(src, filename, config, transformOptions) {
      const babelOptions = _objectSpread(
        {},
        loadBabelConfig(config.cwd, filename).options
      );

      if (transformOptions && transformOptions.instrument) {
        babelOptions.auxiliaryCommentBefore = ' istanbul ignore next '; // Copied from jest-runtime transform.js

        babelOptions.plugins = (babelOptions.plugins || []).concat([
          [
            babelIstanbulPlugin,
            {
              // files outside `cwd` will not be instrumented
              cwd: config.rootDir,
              exclude: []
            }
          ]
        ]);
      }

      const transformResult = (0, _core().transformSync)(src, babelOptions);

      if (transformResult) {
        const code = transformResult.code,
          map = transformResult.map;

        if (typeof code === 'string') {
          return {
            code,
            map
          };
        }
      }

      return src;
    }
  };
};

const transformer = _objectSpread({}, createTransformer(), {
  // Assigned here so only the exported transformer has `createTransformer`,
  // instead of all created transformers by the function
  createTransformer
});

module.exports = transformer;
