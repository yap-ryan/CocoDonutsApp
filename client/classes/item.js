/**
 *  Each Item should only be instantiated once (ie. only 1 Apple Fritter)
 *  and each item should have a unique ID
 * 
 *  NOTE: May not need this class if we store images in database
 * 
 */
class Item {


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
}

