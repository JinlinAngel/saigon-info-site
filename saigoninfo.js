document.addEventListener('DOMContentLoaded', function () {

    var carousel = document.getElementById('saigonInfoSlides');
    var bootstrapCarousel = new bootstrap.Carousel(carousel);


    carousel.addEventListener('slide.bs.carousel', function () {
        var laneMarkings = document.querySelector('.lane-markings');
        laneMarkings.classList.add('animate-stripes');

        // Start rotating wheels
        var wheel1 = document.getElementById('motorbike-wheel-1');
        var wheel2 = document.getElementById('motorbike-wheel-2');
        wheel1.style.animation = "rotateWheel 1s linear infinite";
        wheel2.style.animation = "rotateWheel 1s linear infinite";
    });

    carousel.addEventListener('slid.bs.carousel', function () {
        var laneMarkings = document.querySelector('.lane-markings');
        laneMarkings.classList.remove('animate-stripes');

        // Stop rotating wheels
        var wheel1 = document.getElementById('motorbike-wheel-1');
        var wheel2 = document.getElementById('motorbike-wheel-2');
        wheel1.style.animation = "";
        wheel2.style.animation = "";
    });

    carousel.addEventListener('slid.bs.carousel', function (event) {
        var activeItem = event.relatedTarget; // Get the new active item after the slide transition
        var isNightLife = activeItem && activeItem.id === 'nightlife';

        if (isNightLife) {
            console.log('Nightlife slide is active');
            document.body.classList.add('dark-mode');
        } else {
            console.log('Nightlife slide is not active');
            document.body.classList.remove('dark-mode');
        }
    });

    var navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navbarLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var targetId = this.getAttribute('data-bs-target').substring(1);
            var items = document.querySelectorAll('.carousel-item');
            var idx = Array.from(items).findIndex(item => item.id === targetId);
            bootstrapCarousel.to(idx);
        });
    });

    drawSkyline(); // Initial draw of skyline
    window.addEventListener('resize', drawSkyline); // Redraw on resize
});

function drawSkyline() {

    const skylineContainer = document.querySelector('.skyline-container');
    // Clear existing skyline to avoid duplicating buildings
    skylineContainer.innerHTML = '';
    const numberOfBuildings = 30;
    const buildingHeights = [15, 25, 35]; // Allowed heights
    const containerWidth = skylineContainer.clientWidth; // Get the width of the container
    const gap = 2; // Gap in pixels
    const totalGapsWidth = (numberOfBuildings - 1) * gap; // Total width of all gaps
    const availableWidthForBuildings = containerWidth - totalGapsWidth; // Remaining width for buildings
    const buildingWidth = availableWidthForBuildings / numberOfBuildings; // Width of each building

    let accumulatedLeft = 0; // To keep track of the accumulated left position

    for (let i = 0; i < numberOfBuildings; i++) {
        const building = document.createElement('div');
        building.classList.add('building');

        const height = buildingHeights[Math.floor(Math.random() * buildingHeights.length)];
        building.style.height = `${height}vh`;
        building.style.width = `${buildingWidth}px`; // Set width in pixels
        building.style.left = `${accumulatedLeft}px`; // Set accumulated left position

        accumulatedLeft += buildingWidth + gap; // Increment for the next building

        addWindowsToBuilding(building, height, buildingWidth);
        skylineContainer.appendChild(building);
    }
}

function addWindowsToBuilding(building, buildingHeightVh, buildingWidthPx) {
    // Constants for window dimensions
    const windowWidthPercent = 20; // Width of each window as a percentage of building width
    const windowHeightVh = 2; // Height of each window in vh

    // Calculate the number of windows horizontally and vertically
    const numWindowsAcross = Math.floor(100 / windowWidthPercent);
    const numWindowsHigh = Math.floor(buildingHeightVh / windowHeightVh);

    for (let y = 0; y < numWindowsHigh; y++) {
        for (let x = 0; x < numWindowsAcross; x++) {
            if (Math.random() < 0.25) {
                const windowDiv = document.createElement('div');
                windowDiv.classList.add('window');
                windowDiv.style.height = `${windowHeightVh}vh`;
                windowDiv.style.width = `${windowWidthPercent}%`;
                windowDiv.style.left = `${x * windowWidthPercent}%`;
                windowDiv.style.top = `${y * windowHeightVh}vh`;

                building.appendChild(windowDiv);
                animateWindows(windowDiv);
            }
        }
    }
}

function animateWindows(windowDiv) {
    // Apply the 'blink' animation class to each window
    windowDiv.classList.add('blink');
}

document.querySelectorAll('img[data-bs-toggle="modal"]').forEach(item => {
    item.addEventListener('click', event => {
        // Get the image that was clicked
        const imageSrc = event.target.src;
        const imageAlt = event.target.alt;
        const imageDescription = event.target.getAttribute('data-description');

        // Update the modal image
        const modalImage = document.getElementById('modalImage');
        modalImage.src = imageSrc;
        modalImage.alt = imageAlt;

        // Wait for the modal image to load before setting the modal dialog size
        modalImage.onload = function () {
            // Adjust the modal width based on the image's width after it has loaded
            const modalDialog = document.querySelector('.modal-dialog');
            modalDialog.style.maxWidth = `${this.naturalWidth}px`; // Use naturalWidth for the image's original width
            modalDialog.style.width = 'auto'; // Set width to auto to avoid stretching
        };

        // Update the modal title
        const modalTitle = document.getElementById('imageModalLabel');
        modalTitle.textContent = imageAlt;

        // Update the modal description
        const modalDescription = document.getElementById('imageDescription');
        modalDescription.textContent = imageDescription;
    });
});
