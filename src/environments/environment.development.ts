import pkg from 'package.json'

export const environment = {
    production: false,
    version: pkg.version + "-INTERNAL_VERSION"
};
