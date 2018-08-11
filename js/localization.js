
var _app_userLang = (navigator.language || navigator.userLanguage).slice(0, 2);
if (_app_userLang !== 'nl' && _app_userLang !== 'en') _app_userLang = 'en';

var _app_localization = {
    publicToilet: {
        nl: 'Openbaar toilet',
        en: 'Public toilet'
    },
    locationIsRoofed: {
        nl: 'toilet beschikt over een dak',
        en: 'toilet has a roof',
    },
    locationIsNotRoofed: {
        nl: 'toilet heeft geen dak',
        en: 'toilet does not have a roof',
    },
    verlichting: {
        nl: 'toilet heeft verlichting',
        en: 'toilet has lighting',
    },
    noConnection: {
        nl: 'Je bent niet verbonden met de server. Je kunt nog steeds een offline kaart gebruiken maar deze heeft minder detail.',
        en: 'You are not connected to the server. You can still use an offline chart but it is less detailed.'
    }

}