let c = require("../sys/calculations");

exports.randomBaseUpgrade = () => {
    let rdm = c.getRandom(100);
    if(rdm <= 50){
        return "-"
    } else if(rdm < 56 && rdm > 50) {
        return "Wk"
    } else if(rdm < 61 && rdm > 55) {
        return "pA"
    }  else if(rdm < 66 && rdm > 60) {
        return "Au"
    }  else if(rdm < 71 && rdm > 65) {
        return "St"
    }  else if(rdm < 76 && rdm > 70) {
        return "Gs"
    }  else if(rdm < 81 && rdm > 75) {
        return "Gw"
    }  else if(rdm < 86 && rdm > 80) {
        return "Ko"
    }  else if(rdm < 91 && rdm > 85) {
        return "In"
    }  else if(rdm < 96 && rdm > 90) {
        return "Zt"
    }  else if(rdm < 101 && rdm > 95) {
        return "frei"
    } 
}

exports.calcAPOnLevelUp = (level, classname, classtype) => {
    if(level <= 5) {
        if(classname.includes("(Bb)") || classname.includes("(Kr)") || classname.includes("(Wa)")) {
            return c.getRandom(3) + 3;
        } 
        if(classtype === "Warrior" || classtype === "MagWar" || classtype === "DMagWar" || classname.includes("(Sc)") || classname.includes("(DSc)")) {
            return c.getRandom(3) + 2;
        }
        if(classtype === "Magician" && !classname.includes("(Sc)") || classtype === "DarkMagician" && !classname.includes("(DSc)")) {
            return c.getRandom(3) + 1;
        }
    } else {
        return c.getRandom(3)
    }
}