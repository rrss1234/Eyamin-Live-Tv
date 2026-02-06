const player = videojs('main-player');

async function initApp() {
  const res = await fetch('channels.json');
  const json = await res.json();
  const data = json.iptv_channels;

  const tabInner = document.getElementById('tabInner');
  const container = document.getElementById('channelContainer');

  let first = true;

  Object.keys(data).forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.innerText = cat;
    btn.onclick = () => showCategory(i);
    tabInner.appendChild(btn);

    const grid = document.createElement('div');
    grid.id = 'cat-' + i;
    grid.style.display = first ? 'block' : 'none';

    data[cat].forEach(ch => {
      const c = document.createElement('div');
      c.innerText = ch.name;
      c.onclick = () => {
        player.src({src: ch.url, type:'application/x-mpegURL'});
        player.play();
      };
      grid.appendChild(c);
    });

    container.appendChild(grid);
    first = false;
  });
}

function showCategory(i){
  document.querySelectorAll('[id^=cat-]').forEach(g=>g.style.display='none');
  document.getElementById('cat-'+i).style.display='block';
}

window.onload = initApp;
