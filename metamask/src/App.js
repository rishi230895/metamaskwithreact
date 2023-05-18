// import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import { Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
	return (
		<div className="App">
			<Header />
            <Home />
				{/* <nav>s */}
			<Footer />
		</div>
	);
}

export default App;
