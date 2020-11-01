exports.getRandom = (dice) => {
    return Math.ceil(Math.random() * dice)
}

exports.calcPA = (int) => {
    let value = Math.ceil(this.getRandom(100) + (4*int/10) - 20);
    if(value > 100) {
        value = 100;
    }
    if(value < 1) {
        value = 1;
    }
    return value;
}

exports.calcWk = (con, int) => {
    let value = Math.ceil(this.getRandom(100) + 2*(con/10 + int/10) - 20);
    if(value > 100) {
        value = 100;
    }
    if(value < 1) {
        value = 1;
    }
    return value;
}

exports.calcAu = (race) => {
    let value = this.getRandom(100);
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