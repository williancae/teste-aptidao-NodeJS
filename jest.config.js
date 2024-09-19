module.exports = {
    // Diretório raiz onde estão os testes e o código fonte
    rootDir: 'src',

    // Mapeamento de módulos para resolver paths absolutos
    moduleNameMapper: {
        '^@modules/(.*)$': '<rootDir>/modules/$1',
        '^@utils/(.*)$': '<rootDir>/utils/$1',
        '^@config/(.*)$': '<rootDir>/config/$1',
    },

    // Transforma arquivos TypeScript usando ts-jest
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },

    // Ignorar node_modules, exceto aqueles que precisam ser transformados
    transformIgnorePatterns: [
        'node_modules/(?!your-es6-package)', // Substitua por um pacote que precise ser transformado, se houver
    ],

    // Extensões de arquivos que serão processados
    moduleFileExtensions: ['ts', 'js', 'json'],

    // Regex para encontrar arquivos de teste
    testRegex: '.*\\.spec\\.ts$',

    // Diretório de saída de cobertura de teste
    coverageDirectory: '../coverage',

    // Ambiente de teste
    testEnvironment: 'node',
};
