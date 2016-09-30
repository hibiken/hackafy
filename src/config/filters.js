export const filters = [
  {label: '1977', className: '_1977' },
  {label: 'ADEN', className: 'aden'},
  {label: 'Brooklyn', className: 'brooklyn'},
  {label: 'Clarendon', className: 'clarendon'},
  {label: 'earlybird', className: 'earlybird'},
  {label: 'Gingham', className: 'gingham'},
  {label: 'Hudson', className: 'hudson'},
  {label: 'Inkwell', className: 'inkwell'},
  {label: 'lark', className: 'lark'},
  {label: 'Lo-Fi', className: 'lofi'},
  {label: 'Mayfair', className: 'mayfair'},
  {label: 'Moon', className: 'moon'},
  {label: 'Nashville', className: 'nashville'},
  {label: 'Perpetua', className: 'perpetua'},
  {label: 'Reyes', className: 'reyes'},
  {label: 'Rise', className: 'rise'},
  {label: 'Slumber', className: 'slumber'},
  {label: 'Toaster', className: 'toaster'},
  {label: 'Walden', className: 'walden'},
  {label: 'Willow', className: 'willow'},
  {label: 'X-pro II', className: 'xpro2'},
];


export const filterStyles = {
  '_1977': {
    brightness: 1.1,
    contrast: 1.1,
    saturate: 1.3,
  },
  'aden': {
    brightness: 1.2,
    contrast: 0.9,
    saturate: .85,
  },
  'amaro': {
    brightness: 1.1,
    contrast: 0.9,
    saturate: 1.5,
  },
  'brannan': {
    brightness: 1.0,
    contrast: 1.4,
    sepia: 0.5,
    saturate: 1.0, // is 1.0 a default value?
  },
  'brooklyn': {
    brightness: 1.1,
    contrast: 0.9,
    saturate: 1.0,
  },
  'clarendon': {
    brightness: 1.0,
    contrast: 1.2,
    saturate: 1.35,
  },
  'earlybird': {
    brightness: 1.0,
    contrast: 0.9,
    saturate: 1.0,
    sepia: 0.2,
  },
  'gingham': {
    brightness: 1.05,
    contrast: 1.0,
    'hue-rotate': -10,
    saturate: 1.0,
  },
  'hudson': {
    brightness: 1.2,
    contrast: 0.9,
    saturate: 1.1,
  },
  'inkwell': {
    brightness: 1.1,
    contrast: 1.1,
    sepia: 0.3,
    saturate: 1.0,
    grayscale: 1,
  },
  'lark': {
    brightness: 1.0,
    contrast: 0.9,
    saturate: 1.0,
  },
  'lofi': {
    brightness: 1.0,
    contrast: 1.5,
    saturate: 1.1,
  },
  'mayfair': {
    brightness: 1.0,
    contrast: 1.1,
    saturate: 1.1,
  },
  'moon': {
    brightness: 1.1,
    contrast: 1.1,
    saturate: 1.0,
    grayscale: 1,
  },
  'nashville': {
    brightness: 1.05,
    contrast: 1.2,
    saturate: 1.2,
    sepia: 0.2,
  },
  'perpetua': {
    brightness: 1.0,
    contrast: 1.0,
    saturate: 1.0,
  },
  'reyes': {
    brightness: 1.1,
    contrast: 0.85,
    saturate: 0.75,
    sepia: 0.22,
  },
  'rise': {
    brightness: 1.05,
    contrast: 0.9,
    saturate: 0.9,
    sepia: 0.2,
  },
  'slumber': {
    brightness: 1.05,
    contrast: 1.0,
    saturate: 0.66,
  },
  'toaster': {
    brightness: 0.9,
    contrast: 1.5,
    saturate: 1.0,
  },
  'walden': {
    brightness: 1.1,
    'hue-rotate': -10,
    contrast: 1.0,
    sepia: 0.3,
    saturate: 1.6,
  },
  'willow': {
    brightness: 0.9,
    contrast: 0.95,
    saturate: 1.0,
    grayscale: 0.5,
  },
  'xpro2': {
    brightness: 1.0,
    contrast: 1.0,
    saturate: 1.0,
    sepia: 0.3,
  }
};

/* This function will convert filter object to style object accepted by React components */
/* Example:
  const styleObj = {
    brightness: 1.0,
    contrast: 1.2,
    saturate: 1.1,
    'hue-rotate': -10
  }

  getFilterStyle(styleObj) => { filter: 'brightness(1.0) contrast(1.2) saturate(1.1) hue-rotate(-10deg)'}

*/
export const getFilterStyle = (styleObj) => {
  if (styleObj === {}) {
    return {}
  }

  const keys = Object.keys(styleObj);
  return keys.reduce((styleObject, key) => {
    if (key === 'hue-rotate') {
      styleObject.filter += `${key}(${styleObj[key]}deg) `;
    } else {
      styleObject.filter += `${key}(${styleObj[key]}) `;
    }
    return styleObject;
  }, {filter: ''});
}
