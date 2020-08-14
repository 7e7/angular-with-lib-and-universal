/* eslint-disable typescript-filenames/no-js-extension */
/* The icon manifest used by jb-icon will be built from this file.
 *  To add a new icon, add the key name as the name that the user will
 *  input into jb-icon to use the icon, and the file name as the value.
 *  Make sure the icon is in the icons folder.
 *
 *  The manifest is built by the gulp task build-icon-manifest.
 * */

const EXTERNAL_ICON_MANIFEST = {
  addCircle: './add-circle.svg',
  appleWallet: './apple-wallet.svg',
  arrowDownWide: './arrow-down-wide.svg',
  arrowDown: './arrow-down.svg',
  arrowRight: './arrow-right.svg',
  arrowsH: './arrows-h.svg',
  bars: './bars.svg',
  calendar: './calendar.svg',
  caretRight: './caret-right.svg',
  carryOnBaggage: './carryon-baggage.svg',
  check: './check.svg',
  checkingBaggage: './checkin-baggage.svg',
  chevronLeft: './chevron-left.svg',
  chevronRight: './chevron-right.svg',
  clear: './clear.svg',
  clock: './clock.svg',
  closeCircle: './close-circle.svg',
  close: './close.svg',
  cloud: './cloud.svg',
  creditCard: './credit-card.svg',
  ellipesVa: './ellipes-va.svg',
  ems: './ems.svg',
  evenMoreSpeed: './even-more-speed.svg',
  exclamation: './exclamation.svg',
  externalLink: './external-link.svg',
  globe: './globe.svg',
  hand: './hand.svg',
  jetWithYourPet: './jet-with-your-pet.svg',
  jetblueLogo: './jetblue-logo.svg',
  keyboardArrowDown: './keyboard-arrow-down.svg',
  keyboardArrowUp: './keyboard-arrow-up.svg',
  mintIndicator: './mint-indicator.svg',
  mintSuite: './mint-suite.svg',
  mint: './mint.svg',
  myLocation: './my-location.svg',
  nearest: './nearest.svg',
  paperPlance: './paper-plance.svg',
  plane: './plane.svg',
  questionCircle: './question-circle.svg',
  rightArrow: './right-arrow.svg',
  smartphone: './smartphone.svg',
  suitcase: './suitcase.svg',
  trueBlueIconBlue: './true-blue-icon-blue.svg',
  trueBlueIcon: './true-blue-icon.svg',
  trueBlueLogo: './true-blue-logo.svg',
};

const EXTERNAL_ICON_MANIFEST_COMMENTS = `/* Do not manually edit this file!
* This will be built dynamically by gulp.
* See icon-manifest.constant.js for details. */
`;

const EXTERNAL_TS_LINT_DISABLE = `// tslint:disable
`;
const EXTERNAL_TS_LINT_ENABLE = `
// tslint:enable
`;

module.exports = {
  EXTERNAL_ICON_MANIFEST,
  EXTERNAL_ICON_MANIFEST_COMMENTS,
  EXTERNAL_TS_LINT_ENABLE,
  EXTERNAL_TS_LINT_DISABLE,
};
