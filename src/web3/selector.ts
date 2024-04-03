import { NightlyConnectAdapter } from '@nightlylabs/wallet-selector-solana'

export const nightlyConnectAdapter: NightlyConnectAdapter = NightlyConnectAdapter.buildLazy(
  {
    appMetadata: {
      name: 'Invariant',
      description: 'Ginpaws - Aggregator liquidity provided',
      icon: 'https://invariant.app/favicon-192x192.png'
    },
    url: 'https://nc2.nightly.app'
  },
  true
)

export const openWalletSelectorModal = async () => {
  try {
    if (nightlyConnectAdapter.connected) {
      return
    }

    await nightlyConnectAdapter.connect()
  } catch (error) {
    console.log(error)
  }
}
