// Elements
const frame_container = document.getElementById('frame-container');


// SERVICES PORTS
const MEMO_SHEET_PORT = 8008
const ARPEJ_SCRAPPER_PORT = 8009;
const LOGS_HANDLER_PORT = 8010;

// Add Frame
function addFrame(name, desc, options) {
    // Create div element
    const frame = document.createElement('div');
    frame_container.appendChild(frame);

    // Set class
    frame.classList.add('frame', 'box');

    // Title
    const title = document.createElement('h2');
    title.innerText = name;

    // Infos Container
    const info_container = document.createElement('div');
    info_container.classList.add('info-container');

    // Info 1
    const info = document.createElement('p');
    info.innerText = desc;

    info_container.appendChild(info);

    // Options container
    const options_container = document.createElement('div');
    options_container.classList.add('buttons-container');

    // Options
    for (let i=0; i<options.length; i++) {
        const opt_name = options[i][0];
        const opt_func = options[i][1];
        
        // Add button
        const btn = document.createElement('button');
        btn.innerText = opt_name;

        // Connect option's func
        btn.addEventListener('click', opt_func);

        // Add to options_container
        options_container.appendChild(btn);
    }

    // Add children to frame
    frame.appendChild(title);
    frame.appendChild(info_container);
    frame.appendChild(options_container);

    // Log
    console.log('Added Frame :', name)
}

function service_redirection(service_port) {
    window.location.href = `${window.location.protocol}//${window.location.hostname}:${service_port}`;
}

function sendMsg(msg, host, port) {
    const socket = new WebSocket(`ws://${host}:${port}`);

    socket.onopen = () => {
        socket.send(msg);
    }
    socket.onmessage = (event) => {
        console.log('Response : ', event.data);
        alert(event.data);
    }
}

// Arpej-Scrapper
addFrame(
    "Arpej-Scrapper",
    "Statistiques sur l'utilisation des machines de linges.",
    [
        ["OPEN", function () {
            // Open in new tab url
            service_redirection(ARPEJ_SCRAPPER_PORT);
        }]
    ]
);

// MemoSheet
addFrame(
    "MemoSheet",
    "Information for different fields",
    [
        ["OPEN", function () {
            service_redirection(MEMO_SHEET_PORT);
        }]
    ]
)

addFrame(
    "LogsHandler",
    "Retrieve logs for all services",
    [
        ["OPEN", function () {
            service_redirection(LOGS_HANDLER_PORT);
        }]
    ]
)

addFrame(
    "ScholaSigner",
    "Activate/Disable auto signer",
    [
        ["START", function () {
            sendMsg('start', window.location.hostname, 8011);
        }],
        ["STOP", function () {
            sendMsg('stop', window.location.hostname, 8011);
        }]
    ]
)