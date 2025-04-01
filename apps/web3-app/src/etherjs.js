import { ethers } from "ethers";

async function connectWallet() {
  if (!window.etherum) {
    return false;
  }

  try {
    const provider = new ethers.BrowserProvider(window.etherum);

    const accounts = await provider.send('eth_requestAccounts', []);

    if (!accounts.length === 0) {
      return;
    }

    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    return {
      provider, signer, address
    }
  }
  catch (error) {
    console.error(error.message || error.stack);
  }
}

// 示例用法
const connectButton = document.getElementById("connectButton");
connectButton.addEventListener("click", async () => {
  const walletData = await connectWallet();
  if (walletData) {
    document.getElementById("walletAddress").innerText = `已连接: ${walletData.address}`;
  }
});
