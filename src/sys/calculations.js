exports.getRandom = (dice) => {
    return Math.round(Math.random() * (dice-1) + 1) 
}

exports.calcPA = (int) => {
    let value = Math.round(this.getRandom(100) + (4 * int / 10) - 20);
    if (value > 100) {
        value = 100;
    }
    if (value < 1) {
        value = 1;
    }
    return value.toString();
}

exports.calcWk = (con, int) => {
    let value = Math.round(this.getRandom(100) + 2 * (con / 10 + int / 10) - 20);
    if (value > 100) {
        value = 100;
    }
    if (value < 1) {
        value = 1;
    }
    return value.toString();
}

exports.calcAu = (race) => {
    let value = Math.round(this.getRandom(100));
    switch (race) {
        case "elf":
            (value < 81) ? value = 81 : value
            break;
        case "gnom":
            (value > 80) ? value = 80 : value
            break;
        case "zwerg":
            (value > 80) ? value = 80 : value
            break;
    }
    return value.toString();
}

exports.calcB = (race) => {
    let value;
    switch (race) {
        case "gnom":
            value = this.getRandom(3) + this.getRandom(3) + 8;
            break;
        case "halbling":
            value = this.getRandom(3) + this.getRandom(3) + 8;
            break;
        case "zwerg":
            value = this.getRandom(3) + this.getRandom(3) + this.getRandom(3) + 12;
            break;
        default:
            value = this.getRandom(3) + this.getRandom(3) + this.getRandom(3) + this.getRandom(3) + 16;
            break;
    }
    return value.toString();
}

exports.calcLP = (race, ko) => {
    let value = Math.round(this.getRandom(3) + 7 + (ko / 10));
    switch (race) {
        case "gnom":
            value -= 3;
            break;
        case "halbling":
            value -= 2;
            break;
        case "zwerg":
            value += 1;
            break;
    }
    return value.toString();
}

exports.calcAP = (classname, ausb) => {
    let value = Math.round(this.getRandom(3) + 1 + parseInt(ausb.replace("+", "")));

    if (classname.includes("(bb)") || classname.includes("(kr)") || classname.includes("(wa)")) {
        value += 2;
    } else if (classname.includes("(sc)") ||
        classname.includes("(as)") ||
        classname.includes("(gl)") ||
        classname.includes("(sp)") ||
        classname.includes("(mg)") ||
        classname.includes("(sg)") ||
        classname.includes("(tm)") ||
        classname.includes("(er)") ||
        classname.includes("(pk)") ||
        classname.includes("(ba)") ||
        classname.includes("(or)")) {
        value += 1;
    }
    return value.toString();
}

exports.calcAusB = (ko, st) => {
    let value = Math.ceil(ko / 10 + st / 20);
    if (value !== 0) {
        return "+" + value.toString();
    } else {
        return value;
    }
}


exports.calcSchB = (st, gs) => {
    let value = Math.ceil(st / 20 + gs / 30 - 3);
    if (value < 0) {
        value = "0";
    }
    if (value != 0) {
        return "+" + value.toString();
    } else {
        return value;
    }
}

exports.calcAnB = (gs) => {
    let value;
    if (gs <= 5) { return value = "-2" };
    if (gs <= 20) { return value = "-1" };
    if (gs <= 80) { return value = "0" };
    if (gs <= 95) { return value = "+1" };
    if (gs <= 100) { return value = "+2" };
}

exports.calcAbB = (gw) => {
    let value;
    if (gw <= 5) { return value = "-2" };
    if (gw <= 20) { return value = "-1" };
    if (gw <= 80) { return value = "0" };
    if (gw <= 95) { return value = "+1" };
    if (gw <= 100) { return value = "+2" };
}

exports.calcZauB = (zt) => {
    let value;
    if (zt <= 5) { return value = "-2" };
    if (zt <= 20) { return value = "-1" };
    if (zt <= 80) { return value = "0" };
    if (zt <= 95) { return value = "+1" };
    if (zt <= 100) { return value = "+2" };
}

exports.calcResG = (int, classtype, race) => {
    let value;
    switch (race) {
        case "elf":
            value = 2;
            break;
        case "gnom":
            value = 4;
            break;
        case "halbling":
            value = 4;
            break;
        case "zwerg":
            value = 3;
            break;
        default:
            if (int <= 5) { value = -2 };
            if (int <= 20 && int > 5) { value = -1 };
            if (int <= 80 && int > 20) { value = 0 };
            if (int <= 95 && int > 80) { value = 1 };
            if (int <= 100 && int > 95) { value = 2 };
    }
    if (classtype === "Magician" || classtype === "DarkMagician") {
        value += 2;
    }
    if (value < 0) { value = 0 }
    if (value !== 0) {
        value = "+" + Math.ceil(value).toString();
    } else {
        value = Math.ceil(value).toString();
    }
    return value;
}

exports.calcResK = (ko, classtype, race) => {
    let value;
    switch (race) {
        case "elf":
            value = 2;
            break;
        case "gnom":
            value = 4;
            break;
        case "halbling":
            value = 4;
            break;
        case "zwerg":
            value = 3;
            break;
        default:

            if (ko <= 5) { value = -2 };
            if (ko <= 20 && ko > 5) { value = -1 };
            if (ko <= 80 && ko > 20) { value = 0 };
            if (ko <= 95 && ko > 80) { value = 1 };
            if (ko <= 100 && ko > 95) { value = 2 };
            break;
    }
    if (classtype === "Magician" || classtype === "DarkMagician") {
        value += 2;
    }
    if (classtype === "Warrior" || classtype === "MagWar") {
        value += 1
    }
    if (value < 0) { value = 0 }
    if (value !== 0) {
        value = "+" + Math.ceil(value).toString();
    } else {
        value = Math.ceil(value).toString();
    }
    return value;
}

exports.calcHeight = (st, gender, race, height, locked) => {
    let value;
    if(locked) {
        value = height;
    } else {
        switch (race) {
            case "elf":
                value = this.getRandom(6) + this.getRandom(6) + st / 10 + 160;
                break;
            case "gnom":
                value = this.getRandom(6) + st / 10 + 90;
                break;
            case "halbling":
                value = this.getRandom(6) + this.getRandom(6) + st / 10 + 100;
                break;
            case "zwerg":
                value = this.getRandom(6) + st / 10 + 130;
                break;
            default:
    
                if (gender === "männlich") {
                    value = this.getRandom(20) + this.getRandom(20) + st / 10 + 150;
                } else {
                    value = this.getRandom(20) + this.getRandom(20) + st / 10 + 140;
                }
                break;
        }
        value = Math.ceil(value).toString();
    }
    return value;
}

exports.calcWeight = (st, gender, race, height, weight, locked) => {
    let value;
    if(locked) {
        value = weight;
    } else {
        switch (race) {
            case "elf":
                value = this.getRandom(6) + this.getRandom(6) + this.getRandom(6) + this.getRandom(6) - 8 + st / 10 + parseInt(height) - 120;
                break;
            case "gnom":
                value = this.getRandom(6) + this.getRandom(6) + this.getRandom(6) + st / 10 + parseInt(height) - 90;
                break;
            case "halbling":
                value = this.getRandom(6) + this.getRandom(6) + this.getRandom(6) + 3 + st / 10 + parseInt(height) - 90;
                break;
            case "zwerg":
                value = this.getRandom(6) + this.getRandom(6) + this.getRandom(6) + this.getRandom(6) + st / 10 + parseInt(height) - 90;
                break;
            default:
    
                if (gender === "männlich") {
                    value = this.getRandom(6) + this.getRandom(6) + this.getRandom(6) + this.getRandom(6) + st / 10 + parseInt(height) - 120;
                } else {
                    value = this.getRandom(6) + this.getRandom(6) + this.getRandom(6) + this.getRandom(6) - 4 + st / 10 + parseInt(height) - 90;
                }
                break;
        }
        value = Math.ceil(value).toString();
    }
    return value;
}

exports.calcWeaponhand = (race) => {
    let value;
    if (race === "gnom") {
        value = "b";
    } else {
        let random = this.getRandom(20);
        if (random <= 15) {
            value = "l"
        } else if (random <= 19 && random > 15) {
            value = "r"
        } else {
            value = "b"
        }
    }
    return value;
}

exports.calcMilieu = (classname) => {
    let value;
    let random = this.getRandom(100);
    if(classname === "ba" || classname === "pb" || classname === "ps") {
        random += 20;
    }
    if(classname === "dr" || classname === "ma") {
        random += 10;
    }
    if(classname === "as" || classname === "hä" || classname === "wa") {
        random -= 10;
    }
    if(classname === "sp") {
        random -= 20
    }

    if(random <= 10) {
        value = "Unfrei";
    }
    if(random <= 50 && random > 10){
        value = "Volk";
    } 
    if(random <= 90 && random > 50){
        value = "Mittelschicht";
    }
    if(random < 100 && random > 90){
        value = "Adel";
    }
    return Math.ceil(value).toString();
}