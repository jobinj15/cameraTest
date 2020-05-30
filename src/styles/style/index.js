import defaultTheme from './default.js'
import darkTheme from './dark.js'
import themeStore from '../../screens/stores/ThemeStore'
import constants from '../../utility/constants.js';

// var currTheme = getCurrTheme()
// export default currTheme;

var instance = undefined;

 class ThemeManager {

    constructor() {

        console.log('ThemeManager!')

        var currTheme = this.getCurrTheme()
        return currTheme;
    }

    getCurrTheme() {

        console.log('getAllThemes styles ' + themeStore.theme)

        const themes = getAllThemes();
        const setTheme = themes[themeStore.theme]

        switch (setTheme) {

            case constants.THEME_DARK:
                return darkTheme;

            default:
                return defaultTheme;
        }

    }
}

if(instance==undefined)
instance = new ThemeManager();
export default instance;

// const tm = new ThemeManager();

// export default tm



export function getAllThemes() {
    return [constants.THEME_DEFAULT, constants.THEME_DARK]
}


function getCurrTheme() {

    console.log('getAllThemes ' + themeStore.theme)

    const themes = getAllThemes();
    const setTheme = themes[themeStore.theme]

    switch (setTheme) {

        case constants.THEME_DARK:
            return darkTheme;

        default:
            return defaultTheme;
    }

}

// class ThemeManager {

//     static myInstance = null;

//     _userID = "";


//     /**
//      * @returns {ThemeManager}
//      */
//     static getInstance() {
//         if (ThemeManager.myInstance == null) {
//             ThemeManager.myInstance = new ThemeManager();
//         }

//         return this.myInstance;
//     }

//     getUserID() {
//         return this._userID;
//     }

//     setUserID(id) {
//         this._userID = id;
//     }
// }
