/*
  « Transmettre à mon club » (/recommander). Le message se met à jour avec le
  nom du club et, si la localisation a été acceptée, la ville. Les liens
  WhatsApp (sans numéro : la personne choisit le contact) et e-mail (sans
  destinataire) reprennent le texte. Rien n'est envoyé à OnClub.
*/
(function () {
  'use strict'
  var boite = document.querySelector('[data-recommander]')
  if (!boite) return
  var zone = boite.querySelector('[data-message]')
  var club = boite.querySelector('[data-club]')
  var note = boite.querySelector('[data-ville-note]')
  var etat = boite.querySelector('[data-etat]')
  var base = zone.getAttribute('data-base')
  var modifie = false
  var ville = window.onclubVille || null

  function compose() {
    var t = base
    var c = (club.value || '').trim()
    var ou = c ? 'adhérent de ' + c : 'adhérent du club'
    if (ville) ou += ', à ' + ville
    return t.replace('adhérent du club', ou)
  }
  function liens() {
    var t = zone.value
    boite.querySelector('[data-wa]').href = 'https://wa.me/?text=' + encodeURIComponent(t)
    boite.querySelector('[data-mail]').href = 'mailto:?subject=' + encodeURIComponent('Une idée pour le club : OnClub') + '&body=' + encodeURIComponent(t)
  }
  function maj() {
    if (!modifie) zone.value = compose()
    if (note) {
      note.hidden = !ville
      note.textContent = ville ? 'Votre ville (' + ville + ') est ajoutée au message. Vous pouvez la retirer en modifiant le texte.' : ''
    }
    liens()
  }
  club.addEventListener('input', maj)
  zone.addEventListener('input', function () { modifie = true; liens() })
  document.addEventListener('onclub:ville', function (e) { ville = e.detail && e.detail.ville; maj() })

  var partage = boite.querySelector('[data-partage]')
  if (navigator.share && partage) {
    partage.hidden = false
    partage.addEventListener('click', function () {
      navigator.share({ title: 'OnClub', text: zone.value }).catch(function () {})
    })
  }
  var copier = boite.querySelector('[data-copier]')
  if (navigator.clipboard && copier) {
    copier.hidden = false
    copier.addEventListener('click', function () {
      navigator.clipboard.writeText(zone.value).then(function () { etat.textContent = 'Message copié. Collez-le où vous voulez.' }).catch(function () {})
    })
  }
  maj()
})()
