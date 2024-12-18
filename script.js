
document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
        const user_display = document.getElementById('user-display');
       user_display.textContent = `${user.fname} ${user.lname}`;
    }
});

function openImageModal(src) {
    document.getElementById("modal-image").src = src;
    document.getElementById("image-modal").style.display = "flex";
}

function closeImageModal() {
    document.getElementById("image-modal").style.display = "none";
}
