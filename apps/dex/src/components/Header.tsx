import React from 'react';
import Logo from '../moralis-logo.svg';
import Eth from '../eth.svg';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Header(props) {
  return (
    <header>
      <div className="leftH">
        <img src={Logo} alt="logo" className="logo" />
        <Link to="/" className="link">
          <div className="headerItem">Swap</div>
        </Link>
        <Link to="/tokens" className="link">
          <div className="headerItem">Tokens</div>
        </Link>
      </div>
      <ConnectButton
        accountStatus="full"
        chainStatus="icon"
        showBalance
        label="Connect Wallet"
      ></ConnectButton>
    </header>
  );
}

export default Header;
