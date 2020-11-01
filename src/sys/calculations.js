exports.getRandom = (dice) => {
    return Math.round(Math.random() * dice)
}

exports.calcPA = (int) => {
    let value = Math.round(this.getRandom(100) + (4*int/10) - 20);
    if(value > 100) {
        value = 100;
    }
    if(value < 1) {
        value = 1;
    }
    return value;
}

exports.calcWk = (con, int) => {
    let value = Math.round(this.getRandom(100) + 2*(con/10 + int/10) - 20);
    if(value > 100) {
        value = 100;
    }
    if(value < 1) {
        value = 1;
    }
    return value;
}

exports.calcAu = (race) => {
    let value = Math.round(this.getRandom(100));
    switch(race) {
        case "elf":
            (value < 81) ? value = 81 : value
            break;
        case "gnome": 
            (value > 80) ? value = 80 : value
            break;
        case "dwarf":
            (value > 80) ? value = 80 : value
            break;
    }
    return value;
}

exports.calcB = (race) => {
    let value;
    switch(race) {
        case "gnome":
            value = this.getRandom(3) + this.getRandom(3) + 8;
            break;
        case "halfling":
            value = this.getRandom(3) + this.getRandom(3) + 8;
            break;
        case "dwarf":
            value = this.getRandom(3) + this.getRandom(3) + this.getRandom(3) + 12;
            break;
        default:
            value = this.getRandom(3) + this.getRandom(3) + this.getRandom(3) + this.getRandom(3) + 16;
            break;
    }
    return value;
}

exports.calcLP = (race, ko) => {
    let value = Math.round(this.getRandom(3) + 7 + (ko/10));
    switch(race) {
        case "gnome": 
            value -= 3;
            break;
        case "halfling":
            value -= 2;
            break;
        case "dwarf":
            value += 1;
            break;
    }
    return value;
}

exports.calcAP = (classname, ausb) => {
    let value = Math.round(this.getRandom(3) + 1 + parseInt(ausb.replace("+", "")));
    
    if(classname.includes("(bb)") || classname.includes("(kr)") || classname.includes("(wa)")){
        value += 2;
    } else if(classname.includes("(sc)") || 
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
    return value;
}

exports.calcAusB = (ko, st) => {
    let value = Math.ceil(ko/10 + st/20);
    if(value !== 0) {
        return "+" + value;
    } else {
        return value;
    }
}
    

exports.calcSchB = (st, gs) => {
    let value = Math.ceil(st/20 + gs/30 - 3);
    if(value < 0) {
        value = 0;
    }
    if(value !== 0) {
        return "+" + value;
    } else {
        return value;
    }
}

exports.calcAnB = (gs) => {
    let value;
    if(gs <= 5){return value="-2"};
    if(gs <= 20){return value="-1"};
    if(gs <= 80){return value="0"};
    if(gs <= 95){return value="+1"};
    if(gs <= 100){return value="+2"};
}

exports.calcAbB = (gw) => {
    let value;
    if(gw <= 5){return value="-2"};
    if(gw <= 20){return value="-1"};
    if(gw <= 80){return value="0"};
    if(gw <= 95){return value="+1"};
    if(gw <= 100){return value="+2"};
}

exports.calcZauB = (zt) => {
    let value;
    if(zt <= 5){return value="-2"};
    if(zt <= 20){return value="-1"};
    if(zt <= 80){return value="0"};
    if(zt <= 95){return value="+1"};
    if(zt <= 100){return value="+2"};
}