module.exports = {
    mount: {
        public: { url: '/', static: true },
        src: { url: '/dist' },
    },
    plugins: [
        '@snowpack/plugin-react-refresh',
        '@snowpack/plugin-postcss',
        '@snowpack/plugin-typescript',
        '@snowpack/plugin-dotenv',
    ],
    routes: [
        {
            match: 'routes',
            src: '.*',
            dest: '/index.html',
        },
    ],
    devOptions: {
        port: 3000,
        open: 'none',
    },
    buildOptions: {
        out: 'build',
        clean: true,
    },
}
