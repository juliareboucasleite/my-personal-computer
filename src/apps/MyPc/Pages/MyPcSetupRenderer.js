import "./MyPcSetupRenderer.css";
import "../MyPcRenderer.css";

function MyPcSetupRenderer({ appRef }) {
	return (
		<div className="my-pc-renderer-container">
			<div className="my-pc-renderer-title-container">
				<a className="my-pc-renderer-title">config</a>
			</div>
			<div className="my-pc-renderer-container-2">
				<div className="my-pc-info-father-container">
					<div className="my-pc-info-container">
						<div className="my-pc-title3-container">
							ASUS TUF Gaming A15
							<br />
							AMD Ryzen 7 7535HS with Radeon Graphics
							<br />
							NVIDIA GeForce RTX 3050 Laptop GPU GDDR6 4 GB 128 bits
						</div>
						<div>
							<img src="icons/computer.png" style={{ width: "140px", height: "140px" }}></img>
						</div>
					</div>
				</div>
			</div>
			<div className="my-pc-renderer-title-container">
				<a className="my-pc-renderer-title">setup</a>
			</div>
			<div className="my-pc-renderer-container-2">
				<div className="my-pc-info-father2-container">
					<div className="my-pc-setup-info-container">Mouse Katar Pro Wireless <br/>Headset Corsair Virtuoso <br/>Monitor LG Ultrawide 34wr50qc-b</div>
				    <div className="my-pc-setup-info-container">Keyboard Razer 60% Hutsmini <br/>Mousepad Custom</div>
				</div>
			</div>
		</div>
	);
}

export default MyPcSetupRenderer;
