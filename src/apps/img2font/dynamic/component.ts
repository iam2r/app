export default (text = "Hello world") => {
    const element = document.createElement("div");
    element.className = "pure-button";
    element.innerHTML = text;
    element.onclick = async () => {
        const lazy = await import("./lazy");
        element.textContent = lazy.default;
    }
    return element;
};