import { Helmet } from "react-helmet";
import "./DoomRenderer.css";
import { useRef } from "react";
import { useEffect } from "react";

function DoomRenderer({ appCoreRef }) {
	const containerRef = useRef(null);

	useEffect(() => {
		if (!containerRef.current) {
			return;
		}

		let removeOpenStateListener = null;
		let dosInstance = null;
		let isUnmounted = false;

		const stopDos = () => {
			if (!dosInstance) {
				return;
			}

			try {
				dosInstance.stop();
			} catch (_) {}

			dosInstance = null;
		};

		const shadowRoot = containerRef.current.shadowRoot || containerRef.current.attachShadow({ mode: "open" });
		while (shadowRoot.firstChild) {
			shadowRoot.removeChild(shadowRoot.firstChild);
		}

		// Create scoped style element
		const container = document.createElement("div");
		container.style = "width: 100% !important; height: 100% !important; margin: 0; padding: 0; left: 0px !important; top: 0px !important;";

		const style = document.createElement("style");
		style.textContent = `
			canvas {
				width: 100% !important;
				height: 100% !important;
			}
		`;

		const ensureDosScriptLoaded = () => {
			if (typeof window.Dos === "function") {
				return Promise.resolve();
			}

			return new Promise((resolve, reject) => {
				let script = document.querySelector("script[data-jsdos-script='true']");

				if (!script) {
					script = document.createElement("script");
					script.src = "https://v8.js-dos.com/latest/js-dos.js";
					script.async = true;
					script.dataset.jsdosScript = "true";
					document.head.appendChild(script);
				}

				script.addEventListener("load", resolve, { once: true });
				script.addEventListener("error", reject, { once: true });
			});
		};

		requestAnimationFrame(() => {
			if (isUnmounted) {
				return;
			}

			const div = document.createElement("div");
			div.id = "DOOM";

			container.appendChild(div);

			// Load CSS inside Shadow DOM
			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = "https://v8.js-dos.com/latest/js-dos.css";

			div.appendChild(link);

			ensureDosScriptLoaded()
				.then(() => {
					if (isUnmounted || typeof window.Dos !== "function") {
						return;
					}

					removeOpenStateListener = appCoreRef?.current?.onAppCoreOpenStateChanged?.((isOpened) => {
						if (!isOpened) {
							stopDos();
						}
					});

					const doomUrl = `${process.env.PUBLIC_URL || ""}/doom.jsdos`;

					dosInstance = window.Dos(div, {
						autoStart: true,
						kiosk: true,
						noNetworking: true,
						noCloud: true,
						url: doomUrl,
					});
				})
				.catch(() => {
					if (!isUnmounted) {
						div.innerHTML = '<p style="color:white;padding:12px">Failed to load Doom engine.</p>';
					}
				});
		});

		shadowRoot.appendChild(style);
		shadowRoot.appendChild(container);

		return () => {
			isUnmounted = true;
			stopDos();
			if (typeof removeOpenStateListener === "function") {
				removeOpenStateListener();
			}
		};
	}, []);

	return (
		<div id="DOOM-CONTAINER" className="dosbox-default app-doom-renderer-container" ref={containerRef}>
			{/* <style scoped>
				<script type="text/javascript">
					{`
					// Dos(document.getElementById("DOOM"), {
					// 	autoStart: true,
					// 	kiosk: true,
					// 	noNetworking: true,
					// 	noCloud: true,
					// 	url: "https://cdn.dos.zone/original/2X/9/9ed7eb9c2c441f56656692ed4dc7ab28f58503ce.jsdos",
					// });
                    `}
				</script>
			</style> */}
		</div>
	);
}

export default DoomRenderer;
