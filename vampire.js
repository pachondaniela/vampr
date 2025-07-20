class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire)
    vampire.creator = this
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0
    let currentVampire = this;

    // climb "up" the tree (using iteration), counting nodes, until no vampire is found

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++
    }
    return numberOfVampires;

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
  
    if (this.name === name) {
      return this
    } 
    for (const vamp of this.offspring) {
      const vampireWithName = vamp.vampireWithName(name);
      if(vampireWithName !== null){
        return vampireWithName
      }
    }

    return null
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalVampires = 0;

    for (const vamp of this.offspring){
      totalVampires++
      totalVampires += vamp.totalDescendents
    }

    return totalVampires
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {

    let millVampires = []

    if(this.yearConverted > 1980) {
      millVampires.push(this)
    } 

    for(const vamp of this.offspring){
      const millenialVampires = vamp.allMillennialVampires
      millVampires = millVampires.concat(millenialVampires)
    }
    return millVampires
  }


}

module.exports = Vampire;

