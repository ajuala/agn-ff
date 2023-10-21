const letters = "abcdefghijklmnopqrstuvwxyz".split('');
const digits = "0123456789".split('');
const hex_digits = "abcdef".split('').concat(digits);
const special_chars = "$#_-'\"?!,.".split('');

const rand_int = (a, b) => Math.floor((b - a) * Math.random() + a);
const choice = list => list.length == 0? null : list[rand_int(0, list.length)];
const rand_letters = size => new Array(size).fill("a").map(()=> choice(letters)).map( v => rand_int(0, 2) == 1? v.toUpperCase() : v).join('');
const rand_alnums = size => new Array(size).fill("a").map(()=> choice(letters.concat(digits) )).map( v => rand_int(0, 2) == 1? v.toUpperCase() : v).join('');
const rand_chars = size => new Array(size).fill("a").map(()=> choice(letters.concat(digits).concat(special_chars) )).map( v => rand_int(0, 2) == 1? v.toUpperCase() : v).join('');
const rand_digits = size => new Array(size).fill("a").map(()=> choice(digits)).join('');
const rand_hex = size => new Array(size).fill("a").map(()=> choice(hex_digits)).join('');


// tests
console.log('random chars:', rand_chars(16));
console.log('random digits:', rand_digits(16));
console.log('random letters:', rand_letters(16));
console.log('random alphanumeric:', rand_alnums(32));
console.log('random hex:', rand_hex(16).toUpperCase() );
