/*jslint browser: true*/
(function (doc) {
  'use strict';
  
  function iso(d) {
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }

  function incWeek(d, n) {
    return new Date(d.getTime() + (n * 7 * 24 * 60 * 60 * 1000));
  }

  function length(d1, d2) {
    var delta = d2 - d1,
        weeks = delta / (1000 * 60 * 60 * 24 * 7),
        roundWeeks = parseInt(weeks, 10),
        days = parseInt((weeks - roundWeeks) * 7, 10),
        round = (delta / (1000 * 60 * 60 * 24) / (365 / 12)).toFixed(1);
    return roundWeeks + 'w' + days + 'd ~' + round.replace('.0', '') + 'm';
  }

  function update() {
    var now = new Date(),
        begin = new Date(doc.getElementById('begin').value),
        on = new Date(doc.getElementById('on').value),
        due = incWeek(begin, 40);
    if (begin.toString() === 'Invalid Date' || on.toString() === 'Invalid Date') {
      return;
    }
    doc.getElementById('conception').innerHTML = iso(incWeek(begin, 2));
    doc.getElementById('sofar').innerHTML = length(begin, now);
    doc.getElementById('togo').innerHTML = length(now, due);
    doc.getElementById('onsofar').innerHTML = length(begin, on);
    doc.getElementById('ontogo').innerHTML = length(on, due);
    doc.getElementById('due').innerHTML = iso(due);
  }
  
  function set(id) {
    localStorage.setItem(id, doc.getElementById(id).value);
  }

  function get(id) {
    return localStorage.getItem(id) || iso(new Date());
  }

  doc.getElementById('begin').addEventListener('input', function () {
    update();
    set('begin');
  }, false);
  doc.getElementById('on').addEventListener('input', function () {
    update();
    set('on');
  }, false);
  
  doc.getElementById('begin').setAttribute('value', get('begin'));
  doc.getElementById('on').setAttribute('value', get('on'));
  update();
}(document));