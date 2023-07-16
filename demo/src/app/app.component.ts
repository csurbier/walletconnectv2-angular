import { Component } from '@angular/core';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createConfig } from '@wagmi/core'
import { arbitrum, mainnet, polygon } from '@wagmi/core/chains'
import { getAccount, getContract } from '@wagmi/core'
const chains = [ polygon]
const projectId = '6133adf3bee71a90c0c5e582d52c3f12'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
const web3modal = new Web3Modal({ projectId }, ethereumClient) 
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';

  constructor(){
    web3modal.subscribeModal(newState => {
      console.log(newState)
      
      const account = getAccount()
      if (account.address){
        console.log(account);
      }
      else{
        console.log("===Not yet connected")
      }
    }
   )
  }
  async onClickWallet(){
    web3modal.openModal() 
  }
 
}
