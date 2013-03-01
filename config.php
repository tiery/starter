<?php

// Roots directory
define('_WEBROOT_', '/');

// Site Name
define('_SITENAME_', 'Le coach minceur bio');

if (_WEBROOT_ == '' || _SITENAME_ == '') {
  echo '<h1>Votre site n\'est pas correctement configuré.</h1>';
  echo '<p>Veuillez mettre à jour de fichier config.php situé à la racine du site.</p>';
  exit;
}
define('_ROOT_', $_SERVER['DOCUMENT_ROOT'] . _WEBROOT_);

// Theme directory
define('_UICSS_', _WEBROOT_ . 'ui/css/');
define('_UIIMG_', _WEBROOT_ . 'ui/img/');
define('_UIJS_', _WEBROOT_ . 'ui/js/');

// Templates directory
define('_TPL_', _WEBROOT_ . 'templates/');
define('_INC_', _ROOT_ . 'includes/');

// Medias directory
define('_MEDIAS_', _WEBROOT_ . 'medias/');

// Assets Cache
define('_CACHE_', time());

?>