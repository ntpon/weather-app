(() => {
  var e = {
      699: (e, t) => {
        t.q = '8f2335ff57faf6b1577e7b2c446a5f77';
      },
    },
    t = {};
  function n(o) {
    var a = t[o];
    if (void 0 !== a) return a.exports;
    var s = (t[o] = { exports: {} });
    return e[o](s, s.exports, n), s.exports;
  }
  (() => {
    'use strict';
    var e = n(699);
    const t = {
        clear: ['0-Clear.png', 'yosemite-0.jpg'],
        clouds: ['1-Clouds.png', 'yosemite-1.jpg'],
        drizzle: ['2-Drizzle.png', 'yosemite-2.jpg'],
        rain: ['3-Rain.png', 'yosemite-2.jpg'],
        thunderstorm: ['4-Thunderstorm.png', 'yosemite-2.jpg'],
        snow: ['5-Snow.png', 'yosemite-3.jpg'],
        mist: ['6-Mist.png', 'yosemite-4.jpg'],
        fog: ['7-Fog.png', 'yosemite-4.jpg'],
        haze: ['8-Haze.png', 'yosemite-4.jpg'],
      },
      o = document.getElementById('weather-search'),
      a = document.getElementById('weather-form'),
      s = document.getElementById('weather-init'),
      r = document.getElementById('weather-show'),
      i = document.getElementById('weather-show-city'),
      m = document.getElementById('weather-show-status'),
      c = document.getElementById('weather-show-time'),
      g = document.getElementById('weather-show-icon'),
      l = document.getElementById('weather-show-bg'),
      d = document.getElementById('weather-error'),
      y = document.getElementById('weather-locations'),
      p = document
        .getElementById('weather-locations')
        .getElementsByTagName('li'),
      u = (e) => {
        const t = document.createElement('li');
        return t.append(e), t;
      },
      h = JSON.parse(localStorage.getItem('locations')) || [];
    h.forEach((e) => {
      const t = u(e);
      y.append(t);
    });
    const w = async (n) => {
      try {
        const o = await (async (t) => {
          const n = `https://api.openweathermap.org/data/2.5/weather?q=${t}&units=metric&appid=${e.q}`;
          try {
            const e = await fetch(n);
            if (!e.ok) throw new Error(`City ${t} not found`);
            return await e.json();
          } catch (e) {
            throw new Error(e.message);
          }
        })(n);
        (d.style.display = 'none'), (r.style.display = 'block');
        const {
          title: a,
          des: s,
          time: p,
          icon: w,
          bg: E,
        } = ((e) => {
          const n = `${e.name}, ${e.sys.country}`,
            o = `${e.main.temp}°C ${e.weather[0].description}`,
            a = t[e.weather[0].main.toLowerCase()]
              ? t[e.weather[0].main.toLowerCase()]
              : t[0];
          return {
            title: n,
            des: o,
            time: `Local Time: ${new Date(
              ((e) => {
                const t = new Date(new Date().getTime() + 1e3 * e),
                  n = t.getUTCFullYear();
                return `${
                  t.getUTCMonth() + 1
                } ${t.getUTCDate()} ${n} ${t.getUTCHours()}:${t.getUTCMinutes()}:${t.getUTCSeconds()}`;
              })(e.timezone)
            ).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}`,
            icon: a[0],
            bg: a[1],
          };
        })(o);
        (i.textContent = a),
          (m.textContent = s),
          (c.textContent = p),
          (g.src = `images/${w}`),
          (l.style.backgroundImage = `url(images/${E})`),
          h.includes(n) ||
            ((e) => {
              var t;
              h.push(e),
                (t = h),
                localStorage.setItem('locations', JSON.stringify(t));
              const n = u(e);
              y.append(n);
            })(n);
      } catch (e) {
        (r.style.display = 'none'),
          (d.style.display = 'block'),
          (d.getElementsByTagName('h3')[0].textContent = e.message);
      }
      (o.value = ''), (s.style.display = 'none');
    };
    a.addEventListener('submit', (e) => {
      e.preventDefault();
      const t = o.value;
      t && w(t);
    });
    for (let e of p)
      e.addEventListener('click', (e) => {
        w(e.target.textContent);
      });
  })();
})();
