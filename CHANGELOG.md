## [1.1.1](https://github.com/honestica/typeguard/compare/v1.1.0...v1.1.1) (2023-07-17)


### build

* **deps:** bump semver from 5.7.1 to 5.7.2 ([#21](https://github.com/honestica/typeguard/issues/21)) ([d1ed3d8](https://github.com/honestica/typeguard/commit/d1ed3d8de2ac71eaba98b43721c61f7f9c7b6e4f))

# [1.1.0](https://github.com/honestica/typeguard/compare/v1.0.5...v1.1.0) (2023-05-31)


### build

* **deps:** bump http-cache-semantics from 4.1.0 to 4.1.1 ([#16](https://github.com/honestica/typeguard/issues/16)) ([6a01a17](https://github.com/honestica/typeguard/commit/6a01a17020a70562439b83ce796d69c99570634b))


### chore

* **deps:** upgrade all dependencies ([#15](https://github.com/honestica/typeguard/issues/15)) ([c411f79](https://github.com/honestica/typeguard/commit/c411f797467c5168f6c215e7c19bd47ef800da99))


### feat

* add StringConstraints ([#20](https://github.com/honestica/typeguard/issues/20)) ([c26a50c](https://github.com/honestica/typeguard/commit/c26a50c0cbe7e189a6433dab4fb276b56433096e))

## [1.0.5](https://github.com/honestica/typeguard/compare/v1.0.4...v1.0.5) (2022-09-20)


### build

* **convert_to_cjs.sh:** handle await import ([1d5c4a2](https://github.com/honestica/typeguard/commit/1d5c4a2c0d003e41411dadddf0017971adcebb97))


### chore

* **.nvmrc:** upgrade node to version 18 ([6d2c565](https://github.com/honestica/typeguard/commit/6d2c565b3a144b98582a06f44ddf73559fe387d3))
* **deps:** upgrade all dependencies ([d6d7c22](https://github.com/honestica/typeguard/commit/d6d7c226206acdc81c1e5316fb8664b22ebec245))
* **yarn.lock:** update dependencies ([5cc49bd](https://github.com/honestica/typeguard/commit/5cc49bdaaac734f431e72396d79e65cb4d9cccf4))

## [1.0.4](https://github.com/honestica/typeguard/compare/v1.0.3...v1.0.4) (2022-07-19)


### fix

* **package.json:** delete TypeScript peer dependency ([ce88fed](https://github.com/honestica/typeguard/commit/ce88fed8d8d70f3c4487ff1f19341f361e751372))

## [1.0.3](https://github.com/honestica/typeguard/compare/v1.0.2...v1.0.3) (2022-07-01)


### build

* **cjs:** adapt script for converting js to cjs files to run in multiple platform ([7247b08](https://github.com/honestica/typeguard/commit/7247b08a55ffb4db0a2a697c3dd2b3249156c9c0))
* **convert_to_cjs.sh:** add shebang ([023d5b2](https://github.com/honestica/typeguard/commit/023d5b2e9d17452386cf955f7eafc91f654890cb))


### chore

* convert cjs folder extension files into cjs ([755fafb](https://github.com/honestica/typeguard/commit/755fafbae1970b97eec878e1cc734048d67e7076))
* only build to CJS ([13ed043](https://github.com/honestica/typeguard/commit/13ed04374a1ed0c92de687a07b7b9109aacee27e))

## [1.0.2](https://github.com/honestica/typeguard/compare/v1.0.1...v1.0.2) (2022-06-24)


### chore

* **package.json:** add typescript as a peerDependency ([30d0e09](https://github.com/honestica/typeguard/commit/30d0e0971bd6532ace3570c1172255152d87e558))
* **yarn.lock:** update yarn.lock to reflect peerDependency adjustment ([0a0fcfa](https://github.com/honestica/typeguard/commit/0a0fcfa24fe7f06a7cf09c2dea5e5cbd5b4f18bb))


### docs

* **readme:** add links to badges ([e47fa63](https://github.com/honestica/typeguard/commit/e47fa6360e791a0a609baa4e3cfba0cee1fdaff2))
* **readme:** update getting started by fixing commands ([6659d57](https://github.com/honestica/typeguard/commit/6659d572a98bc86fabdfe7940a1b95fb7825da8c))

## [1.0.1](https://github.com/honestica/typeguard/compare/v1.0.0...v1.0.1) (2022-06-23)


### chore

* clean scripts and dependencies ([bc8d831](https://github.com/honestica/typeguard/commit/bc8d831e9f33821d07238621b69c91fd73cd7072))
* **deps:** add missing devDependencies after rebasing main branch ([ec0048d](https://github.com/honestica/typeguard/commit/ec0048d7464963dc754db65a1b3fe381ee75cb4b))

# 1.0.0 (2022-06-23)


### chore

* add badges to README.md ([d47ac7c](https://github.com/honestica/typeguard/commit/d47ac7c513ea94ccb64d9cdc6b095f02295008ca))
* add commitlint and commitizen ([bd7a710](https://github.com/honestica/typeguard/commit/bd7a710a74937950ff9c8362a5722bdfc136bdc1))
* **ci:** remove steps ([a0794a6](https://github.com/honestica/typeguard/commit/a0794a6dc3c2363eb16a6d5647224ab4c1f091b5))
* **cspell:** updated ignored words ([9259503](https://github.com/honestica/typeguard/commit/9259503748df31090a78d091231b5ab2716c50fc))
* **deps:** add missing inquirer devDependency ([98af3f6](https://github.com/honestica/typeguard/commit/98af3f6216c9c70ac759c6a64548f61981a971ee))
* **eslint:** check every TS and JS extension files (new and old) ([268f0dd](https://github.com/honestica/typeguard/commit/268f0ddc1bcda4ac44a9aa11d7122749c78479dd))
* **eslint:** delete unused and useless eslint plugins ([471a368](https://github.com/honestica/typeguard/commit/471a36886b29eeee2987ff2e031141e9071ea02e))
* **eslint:** use cjs config instead of json ([7c2d32e](https://github.com/honestica/typeguard/commit/7c2d32e615f3ce49ecf26491f270ffb4646340e8))
* **publish:** change branch naming ([43e5892](https://github.com/honestica/typeguard/commit/43e589232aaf803a54b2b1f914c099f4ff4690ac))
* **publish:** test with token setup ([cbc0ef1](https://github.com/honestica/typeguard/commit/cbc0ef18a0012cce22ef027b7df9cb961c88978d))
* **quality:** add a lot of quality gates and implements CI ([858482f](https://github.com/honestica/typeguard/commit/858482f0f84d8f5dd528386de53579999ae14c58))
* rename package with unscoped package name ([a8ec6b3](https://github.com/honestica/typeguard/commit/a8ec6b3af30de32f462bec19c8409a33b253a307))
* **settings:** add token ([f92cd44](https://github.com/honestica/typeguard/commit/f92cd4450bcfeb7d8597b06c0b4864678c748cdb))
* **test:** add mocha reports ([3bd1ad0](https://github.com/honestica/typeguard/commit/3bd1ad0458d70356da9c216063069288a3d7969d))
* update vscode settings ([724b544](https://github.com/honestica/typeguard/commit/724b54438c6aa80f53e9deda6beb77b0517d90a0))
* **yarn:** fix yarn.lock ([e81251b](https://github.com/honestica/typeguard/commit/e81251b8502b7fb8b7d6d132fd595ea01f95c048))


### ci

* delete verify step ([4bc87fa](https://github.com/honestica/typeguard/commit/4bc87fae05396e79e3eda1730ec02f20770d2940))
* **github:** add a new guard to check package.json library usage and access ([95d5f92](https://github.com/honestica/typeguard/commit/95d5f92a0777ad86b17214b768465e0c2c935165))
* **github:** change protected branch master to main ([c181c91](https://github.com/honestica/typeguard/commit/c181c91d3baa4f9bad4be2f1f48ba658b54489be))


### docs

* **README:** add installation step ([48c0c0f](https://github.com/honestica/typeguard/commit/48c0c0f72bcd7e88ec48765dd6abdcac09669c22))


### feat

* **FHIRSDK-1:** Modified license. ([b2ac47f](https://github.com/honestica/typeguard/commit/b2ac47fcc286626b7ab9a0df1075546667410fca))


### fix

* **fixme:** better prototype typing + light formatting ([75d5643](https://github.com/honestica/typeguard/commit/75d5643f6812b74e5e7da468e9856eadabff54fa))
* **github:** yml indentation ([031c405](https://github.com/honestica/typeguard/commit/031c4054de53998a74339aa6b63c2124442de1fa))
* **github:** yml indentation ([22e63e3](https://github.com/honestica/typeguard/commit/22e63e368c77b2ae735ee01d736958093a85ab46))
* **github:** yml indentation ([0e9f3a7](https://github.com/honestica/typeguard/commit/0e9f3a7ba1e8f84bdf4b3300f5416f9b3b9a2571))
* **github:** yml indentation ([286d416](https://github.com/honestica/typeguard/commit/286d41627f10fac9f6aac0b1f52d6dffa2c070b8))

# [1.0.0-alpha.4](https://github.com/honestica/typeguard/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2022-06-23)


### chore

* update vscode settings ([65918ec](https://github.com/honestica/typeguard/commit/65918ec51765d6d5ef83b72bd5fdbd572cbbe4d0))

# [1.0.0-alpha.3](https://github.com/honestica/typeguard/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2022-06-23)


### chore

* rename package with unscoped package name ([e8e0f5d](https://github.com/honestica/typeguard/commit/e8e0f5d59eb5ba78cd0145f77d8743030711b144))

# [1.0.0-alpha.2](https://github.com/honestica/typeguard/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2022-06-23)


### ci

* delete verify step ([23f0f71](https://github.com/honestica/typeguard/commit/23f0f7141b4622439395af3a2b3ac734714412cc))

# 1.0.0-alpha.1 (2022-06-23)


### chore

* add commitlint and commitizen ([35f0607](https://github.com/honestica/typeguard/commit/35f06072fc4e002d8c1fea7b5f941933a8d9c39d))
* **ci:** remove steps ([87f5853](https://github.com/honestica/typeguard/commit/87f5853df0de54a761179e1d76c3ce5ede9d0aaa))
* **cspell:** updated ignored words ([6a250de](https://github.com/honestica/typeguard/commit/6a250de022a4adb88feab24ad8f5802d2cc78ecd))
* **deps:** add missing inquirer devDependency ([1c9aa28](https://github.com/honestica/typeguard/commit/1c9aa2877e3fa18ff1d1795198163b6bb00a2a59))
* **eslint:** check every TS and JS extension files (new and old) ([08537da](https://github.com/honestica/typeguard/commit/08537dacec2cf4279b43d27f35bdce9fb8743a67))
* **eslint:** delete unused and useless eslint plugins ([c799f59](https://github.com/honestica/typeguard/commit/c799f594017e4794890a3381c70669bdf84c73bd))
* **eslint:** use cjs config instead of json ([fe617c0](https://github.com/honestica/typeguard/commit/fe617c089970d325f36cf447b9c8944a164b0417))
* **merge:** resolve merge conflicts ([10ab0f6](https://github.com/honestica/typeguard/commit/10ab0f6edff147482564b642efce0d4ffa1dcc59))
* **publish:** change branch naming ([8adf721](https://github.com/honestica/typeguard/commit/8adf721d0b0f99ff6abbb37d596d9a907a9c02b7))
* **publish:** test with token setup ([24cf46a](https://github.com/honestica/typeguard/commit/24cf46aec5da36c31779676b4449cb45633dcfdf))
* **quality:** add a lot of quality gates and implements CI ([bc935a2](https://github.com/honestica/typeguard/commit/bc935a20ef513a61d8eefb8a7e5433c1fd93d5d6))
* **settings:** add token ([94ba0a5](https://github.com/honestica/typeguard/commit/94ba0a58b3c90fa76644bb713ffa4bf27d77cc2f))
* **test:** add mocha reports ([28c2832](https://github.com/honestica/typeguard/commit/28c283281859a9548cbcf5f49ff7a9a6b83c512c))


### ci

* **github:** add a new guard to check package.json library usage and access ([f11bad4](https://github.com/honestica/typeguard/commit/f11bad41cb3b52468e8c7c9011ed15c790788769))
* **github:** change protected branch master to main ([621df9e](https://github.com/honestica/typeguard/commit/621df9efbe573e8ea853e049b6e13e1c7decc2e3))


### feat

* **FHIRSDK-1:** Modified license. ([b2ac47f](https://github.com/honestica/typeguard/commit/b2ac47fcc286626b7ab9a0df1075546667410fca))


### fix

* **fixme:** better prototype typing + light formatting ([9c78df0](https://github.com/honestica/typeguard/commit/9c78df0de7edfafe1ce8b37c3703d0bfc6c84a60))
* **github:** yml indentation ([518f7be](https://github.com/honestica/typeguard/commit/518f7be9218d1665f13dca382c0110c04dee2703))
* **github:** yml indentation ([3df8c7c](https://github.com/honestica/typeguard/commit/3df8c7cd1655e2948a9a35469762683f6585d29f))
* **github:** yml indentation ([61f7d42](https://github.com/honestica/typeguard/commit/61f7d42469f7290da86e5322b8848a076a8f700f))
* **github:** yml indentation ([a937421](https://github.com/honestica/typeguard/commit/a93742123ed4ed834a1a576d434fcb0939e2032f))
* run prettier on codebase ([7cfce67](https://github.com/honestica/typeguard/commit/7cfce67d359bda694794c258b72e52685f3ca844))
