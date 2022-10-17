const btn = document.getElementById("btn");
const displayColor = document.getElementById("displayColor");
const colorShow = document.getElementById("colorShow");
const colorBlock = document.getElementById("color");
const copy = document.getElementById("copy");
const reset = document.getElementById("reset");

btn.addEventListener("click", async () => {

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: pickColor,
        },

        async (data) => {

            if (data[0].result) {

                btn.style.display = "none";
                const color = data[0].result.sRGBHex;
                colorShow.style.background = color;
                colorShow.style.paddingLeft = "10px";
                colorShow.style.paddingTop = "10px";
                displayColor.innerText = color;
                colorBlock.style.display = "flex";
                reset.style.display = "block";

                copy.addEventListener("click", async () => {
                    try {
                        await navigator.clipboard.writeText(color);
                    } catch (error) {
                        console.log(error);
                    }
                });

                reset.addEventListener("click", () => {
                    copy.checked = false;
                    btn.style.display = "block";
                    colorBlock.style.display = "none";
                    reset.style.display = "none";
                });

            }
        }
    );
});


async function pickColor() {
    try {
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
    }
    catch (err) {
        console.error(err);
    }
}