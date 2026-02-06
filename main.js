
const player = videojs('main-player');

async function initApp() {
    try {
        const res = await fetch('channels.json');
        const json = await res.json();
        const data = json.iptv_channels;

        const tabInner = document.getElementById('tabInner');
        const container = document.getElementById('channelContainer');

        let firstCategory = true;
        let firstChannelPlayed = false;

        Object.keys(data).forEach((category, index) => {
            const btn = document.createElement('div');
            btn.className = `tab-btn ${firstCategory ? 'active' : ''}`;
            btn.textContent = category;
            btn.onclick = () => showCategory(index);
            tabInner.appendChild(btn);

            const grid = document.createElement('div');
            grid.className = `channel-grid ${firstCategory ? 'active' : ''}`;
            grid.id = `cat-${index}`;

            data[category].forEach(channel => {
                const card = document.createElement('div');
                card.className = 'channel-card';
                card.innerHTML = `
                    <img src="${channel.logo}" onerror="this.src='https://i.postimg.cc/8kWYsw9n/20241228_183443.png'">
                    <p>${channel.name}</p>
                `;
                card.onclick = () => playVideo(channel.url, card);

                if(!firstChannelPlayed) {
                    playVideo(channel.url, card);
                    firstChannelPlayed = true;
                }

                grid.appendChild(card);
            });

            container.appendChild(grid);
            firstCategory = false;
        });

        document.getElementById('preloader').style.display = 'none';
    } catch(err) {
        alert('channels.json লোড হয়নি!');
        console.error(err);
    }
}

function showCategory(index) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.channel-grid').forEach(g => g.classList.remove('active'));
    document.querySelectorAll('.tab-btn')[index].classList.add('active');
    document.getElementById(`cat-${index}`).classList.add('active');
}

function playVideo(url, el) {
    document.querySelectorAll('.channel-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');

    player.src({src: url, type:'application/x-mpegURL'});
    player.play();
}

window.onload = initApp;
