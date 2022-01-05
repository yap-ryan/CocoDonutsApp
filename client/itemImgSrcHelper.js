/**
 *  We cant use require() dynamically with a variable, can only use it with string literal
 *  This function gets around that by setting up a big switch/case for each item id
 */
export default requireImgSrc = (itemId) => {
    switch(itemId) {
        case 0: return require('donuts/apple-fritter.jpg')
        case 1: return require('donuts/bavarian-cream-filled.jpg')
        case 2: return require('donuts/buttermilk.gif')
        case 3: return require('donuts/chocolate-coconut-cake.jpg')
        case 4: return require('donuts/chocolate-old-fashion.jpg')
        case 5: return require('donuts/chocolate-or-vanilla-peanut-cake.jpg')
        case 6: return require('donuts/chocolate-or-vanilla-sprinkle-cake.jpg')
        case 7: return require('donuts/chocolate-raised-bar.jpg')
        case 8: return require('donuts/chocolate-sprinkle-raised.jpg')
        case 9: return require('donuts/cinnamon-roll.jpg')
        case 10: return require('donuts/cinnamon-sugar-raised.jpg')
        case 11: return require('donuts/twist.gif')
        case 12: return require('donuts/coconut-chocolate-raised.jpg')
        case 13: return require('donuts/crumb-raised.jpg')
        // case 14: return require('donuts/glazed-buttermilk.jpg')
        case 14: return require('donuts/glazed-or-maple-old-fashion.jpg')
        case 15: return require('donuts/glazed-raised.jpg')
        case 16: return require('donuts/lavendar-cake.jpg')
        case 17: return require('donuts/lavender-raised.jpg')
        case 18: return require('donuts/lemon-jelly-filled.jpg')
        // case 20: return require('donuts/maple-buttermilk.jpg')
        case 19: return require('donuts/maple-raised-bar.jpg')
        case 20: return require('donuts/mochi-donuts.gif')
        case 21: return require('donuts/peanut-chocolate-raised.jpg')
        case 22: return require('donuts/raspberry-jelly-filled.jpg')
        case 23: return require('donuts/signature-coco-raised.jpg')
        // case 26: return require('donuts/sugar-twist.jpg')
        case 24: return require('donuts/vanilla-cake.jpg')
        case 25: return require('donuts/vanilla-coconut-cake.jpg')
        default: return require('donuts/placeholder.png')
    }
}