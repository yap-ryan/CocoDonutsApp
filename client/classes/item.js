import ItemCard from '../screens/DonutShopScreen'

// Item Images imports
import appleFritterImg from 'donuts/apple-fritter.jpg'
import bavarianCreamFilledImg from 'donuts/bavarian-cream-filled.jpg'
import chocolateButtermilkImg from 'donuts/chocolate-buttermilk.jpg'


/**
 *  Should contain all Item objects which are donuts
 */
 export let donutList = [];

 /**
  *  Should instiantiate all donut items and put them into itemList static variable
  */
 export const instantiateDonutItems = () => {
      let appleFritter = new Item(0, 'Apple Fritter', 'donuts/apple-fritter.jpg', 5)
      let bavarianCreamFilled = new Item(1, 'Bavarian Cream Filled', 'donuts/bavarian-cream-filled.jpg', 5)
      let chocolateButtermilk = new Item(2, 'Chocolate Buttermilk', 'donuts/chocolate-buttermilk.jpg', 5)
 
      donutList.push(appleFritter, bavarianCreamFilled, chocolateButtermilk)
      console.log(donutList)
}

/**
 *  Each Item should only be instantiated once (ie. only 1 Apple Fritter)
 *  and each item should have a unique ID
 * 
 *  NOTE: May not need this class if we store images in database
 * 
 */
export default class Item {


    // id => INTEGER Each item is associated with a unique ID eg. Apple Fritter -> id: 0 (SHOULD NOT CHANGE)
    // name => STRING Item Name
    // imgSrc => Image path (can be relative; after bundled, will return final img path)
    // pointCost => INTEGER How many points a customer must use to buy a coupon for this item
    constructor(id, name, imgSrc, pointCost) {
        this.id = id
        this.name = name
        this.imgSrc = imgSrc
        this.pointCost = pointCost
    }

    /**
     *  Returns the item's id (ie. Apple Fritter should always return 0)
     */
    getItemId() {
        return this.id
    }

    getItemName() {
        return this.name
    }

    /**
     * Returns image path
     */
    getImgSrc() {
        return this.imgSrc
    }

    getPointCost(){
        return this.pointCost
    }

    getItemDisplayComponent() {
        return(
            <ItemCard itemName={this.name} imgSrc={this.imgSrc} pointCost={this.pointCost}/>
        )
    }
}




