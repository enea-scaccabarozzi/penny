/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'penny',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws',
			providers: {
				aws: {
					region: 'eu-west-2',
					profile: 'personal',
				},
			},
		}
	},
	async run() {
		const stage = new sst.Secret('DeployStage', 'dev')
		const secrets = [stage]

		new sst.aws.Nextjs('Web', {
			path: './apps/web',
			buildCommand: 'pnpm nx build web',
			link: [...secrets],
		})
	},
})
