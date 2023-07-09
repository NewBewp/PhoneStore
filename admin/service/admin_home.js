


function openAside() {
    document.getElementById("aside_right").style.display = "block";
}
document.getElementById("menu-btn").onclick = openAside

function closeAside() {
    document.getElementById("aside_right").style.display = "none";
}
document.getElementById("close-btn").onclick = closeAside