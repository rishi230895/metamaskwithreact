import React, { useEffect, useState, useReducer } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import bannerImg from '../assets/metamask-dashboard.png'
import logo from '../assets/metamask.svg'
import HeroSection from "../components/HeroSection";
// import { type } from "@testing-library/user-event/dist/type";

const Home = () => {
	let injectedProvider = false;

	if (typeof window.ethereum !== "undefined") {
		injectedProvider = true;
	}

	const [hasProvider, setHasProvider] = useState(null);
	const initialState = { accounts: [] };
	const [wallet, setWallet] = useState(initialState);

    const reducer = (state, action) => {
        console.log(state, action)
        if(action.type == "ADD"){
            return state + 1;
        }
        if(action.type == "SUB"){
            return state - 1;
        }
    }
    const init = 0
    const [state, dispatch] = useReducer(reducer, init)

 
	useEffect(() => {
		const refreshAccounts = (accounts) => {
			if (accounts.length > 0) {
				updateWallet(accounts);
			} else {
				setWallet(initialState);
			}
		};
		const getProvider = async () => {
			const provider = await detectEthereumProvider({ silent: true });
			setHasProvider(true); // transform provider to true or false

			if (provider) {
				const accounts = await window.ethereum.request({
					method: "eth_accounts",
				});
				refreshAccounts(accounts);
				window.ethereum.on("accountsChanged", refreshAccounts);
			}
		};

		getProvider();
		return () => {
			window.ethereum?.removeListener("accountsChanged", refreshAccounts);
		};
	}, []);

	const updateWallet = async (accounts) => {
		setWallet({ accounts });
	};

	const handleConnect = async (e) => {
        e.preventDefault()
        try {
            let accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            updateWallet(accounts);
        } catch (error) {
            console.log(error)
        }
	};

	return (
		<div>
			{wallet.accounts.length > 0 && (
				<div>Wallet Accounts: {wallet.accounts[0]}</div>
			)}
			<HeroSection wallet={wallet} handleConnect={handleConnect} logo={logo} bannerImg={bannerImg} />
            <div>
                <span>{state}</span>
                <button onClick={() => dispatch({type: "ADD"})}>+</button>
                <button onClick={() => dispatch({type: "SUB"})}>-</button>
            </div>
		</div>
	);
};

export default Home;
