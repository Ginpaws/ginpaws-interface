/* eslint-disable no-case-declarations */
import { WalletAdapter } from './adapters/types'
import { StandardAdapter } from './adapters/standard'

const _wallet: WalletAdapter = new StandardAdapter()
const getSolanaWallet = (): WalletAdapter | any => {
  if ('phantom' in window) {
    const provider = (window.phantom as any)?.solana

    if (provider?.isPhantom) {
      return provider
    }
  }
  return _wallet
}

const disconnectWallet = () => {
  _wallet.disconnect()
}
export { getSolanaWallet, disconnectWallet }
