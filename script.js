document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("scroll", function () {
        const sections = document.querySelectorAll("main section");
        const sidebarLinks = document.querySelectorAll(".sidebar ul li a");

        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 60;
            if (scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        sidebarLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === currentSection) {
                link.classList.add("active");
            }
        });
    });

    let currentPhotoIndex = 0;
    const photos = document.querySelectorAll('.pump-photo');
    const totalPhotos = photos.length;

    const showPhoto = (index) => {
        photos.forEach((photo, i) => {
            photo.style.display = i === index ? 'block' : 'none';
        });
    };

    document.querySelector('.next').addEventListener('click', function () {
        currentPhotoIndex = (currentPhotoIndex + 1) % totalPhotos;
        showPhoto(currentPhotoIndex);
    });

    document.querySelector('.prev').addEventListener('click', function () {
        currentPhotoIndex = (currentPhotoIndex - 1 + totalPhotos) % totalPhotos;
        showPhoto(currentPhotoIndex);
    });

    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");

    photos.forEach(photo => {
        photo.addEventListener('click', function () {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    document.querySelector('.close').addEventListener('click', function () {
        modal.style.display = "none";
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    let startX, startY, distX, distY;
    const threshold = 100;  // Minimum swipe distance
    const restraint = 50;   // Max vertical distance for a swipe
    const allowedTime = 300; // Max swipe duration
    let startTime;

    document.querySelector('.pump-photos').addEventListener('touchstart', function (e) {
        const touchObj = e.changedTouches[0];
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime = new Date().getTime();
    });

    document.querySelector('.pump-photos').addEventListener('touchmove', function (e) {
        e.preventDefault();
    });

    document.querySelector('.pump-photos').addEventListener('touchend', function (e) {
        const touchObj = e.changedTouches[0];
        distX = touchObj.pageX - startX;
        distY = touchObj.pageY - startY;
        const elapsedTime = new Date().getTime() - startTime;

        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                if (distX > 0) {
                    // Swipe Right
                    currentPhotoIndex = (currentPhotoIndex - 1 + totalPhotos) % totalPhotos;
                } else {
                    // Swipe Left
                    currentPhotoIndex = (currentPhotoIndex + 1) % totalPhotos;
                }
                showPhoto(currentPhotoIndex);
            }
        }
    });

    showPhoto(currentPhotoIndex);
});
