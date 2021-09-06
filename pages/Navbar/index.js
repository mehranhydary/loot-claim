import React, { useState } from 'react';
import { providers } from 'ethers';

const Navbar = ({ address, setAddress }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  async function handleClick() {
    await window.ethereum.enable();
    const provider = new providers.Web3Provider(window.ethereum);

    // Collect address
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAddress(address);
    setIsLoggedIn(true);
  }
  function shortenETHAddress(address) {
    if (address) return address.slice(0, 6) + "..." + address.slice(38, 42);
  }
  
  return (
    <div className="container">
      <div onClick={handleClick} className="user-container">
        <div className="profile-image"> </div>
        <div className="user-info">
          {
            !isLoggedIn ?
            <div className="user-name">Connect ~\(≧▽≦)/~</div> :
            (
              <>
                <div className="user-name">~\(≧▽≦)/~</div>
                <div className="user-address">{shortenETHAddress(address)}</div>
              </>
            )
          }
        </div>
      </div>
      <style jsx>{`
        .container {
          align-items: right-align;
          display: flex;
          justify-content: right;
          margin 0 auto;
          padding: 32px 0px;
          width: 100%;

        }
        .user-container {
          border: 1px solid rgba(0, 0, 0, 0.05);
          cursor: pointer;
          align-items: center;
          background-color: #white;
          border-radius: 40px;
          cursor: pointer;
          display: flex;
          height: 69px;
          padding: 0px 24px 0px 12px;
          transition: all 0.2s linear;
          width: 215px;
        }
        .user-container:hover,
        .user-container:focus,
        .user-container:active {
          color: #0070f3;
          border-color: #0070f3;
          cursor: pointer;
        }
        .profile-image {
          background: radial-gradient(ellipse at top, #663399, transparent),
            radial-gradient(ellipse at bottom, #4066E0, transparent);
          border-radius: 100%;
          height: 32px;
          margin-right: 8px;
          width: 32px;
        }
        .user-info {

        }
        .user-name {
          font-size: 15px;
          font-weight: 600;
        }
        .user-address {
          color: rgba(0, 0, 0, 0.7);
          font-size: 15px;
        }
      `}</style>
    </div>
  );
}

export default Navbar;