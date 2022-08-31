import React from 'react'

function Home() {
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div >
			<nav >
				<h1>Application 1</h1>
				<button  onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
 
}

export default Home