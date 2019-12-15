module.exports = ({ types }) => {
    return {
        name: 'my-cli-inject-polyfills',
        visitor: {
            Program(path, state) {
                if (!JSON.parse(process.env.ENTRY_FILES || '[]').includes(state.filename)) return;
                const { polyfills } = state.opts;
                const { createImport } = require('@babel/preset-env/lib/utils')
                polyfills.slice().reverse().forEach(p => {
                    createImport(path, p)
                })
            }
        }
    }
}