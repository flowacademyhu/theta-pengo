const chalk = require('chalk');


let play = [
['  ██████╗ ██╗      █████╗ ██╗   ██╗'],
['  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝'],
['  ██████╔╝██║     ███████║ ╚████╔╝ '],
['  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  '],
['  ██║     ███████╗██║  ██║   ██║   '],
['  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ']
];




let exit = [

['  ███████╗██╗  ██╗██╗████████╗'],
['  ██╔════╝╚██╗██╔╝██║╚══██╔══╝'],
['  █████╗   ╚███╔╝ ██║   ██║   '],
['  ██╔══╝   ██╔██╗ ██║   ██║   '],
['  ███████╗██╔╝ ██╗██║   ██║   '],
['  ╚══════╝╚═╝  ╚═╝╚═╝   ╚═╝   ']

]
let scores = [

['  ███████╗ ██████╗ ██████╗ ██████╗ ███████╗███████╗'],
['  ██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔════╝'],
['  ███████╗██║     ██║   ██║██████╔╝█████╗  ███████╗'],
['  ╚════██║██║     ██║   ██║██╔══██╗██╔══╝  ╚════██║'],
['  ███████║╚██████╗╚██████╔╝██║  ██║███████╗███████║'],
['  ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝']

];

let maps = [

['  ███╗   ███╗ █████╗ ██████╗ ███████╗'],
['  ████╗ ████║██╔══██╗██╔══██╗██╔════╝'],
['  ██╔████╔██║███████║██████╔╝███████╗'],
['  ██║╚██╔╝██║██╔══██║██╔═══╝ ╚════██║'],
['  ██║ ╚═╝ ██║██║  ██║██║     ███████║'],
['  ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ╚══════╝']

];


let REKT = [
['                                                                                               ']
['                      ██████╗  █████╗ ███╗   ███╗███████╗     ██████╗ ██╗   ██╗███████╗██████╗ '],
['                     ██╔════╝ ██╔══██╗████╗ ████║██╔════╝    ██╔═══██╗██║   ██║██╔════╝██╔══██╗'],
['                     ██║  ███╗███████║██╔████╔██║█████╗      ██║   ██║██║   ██║█████╗  ██████╔╝'],
['                     ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝      ██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗'],
['                     ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗    ╚██████╔╝ ╚████╔╝ ███████╗██║  ██║'],
['                      ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝     ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝'],
['                                                                                               '],
['                                ██╗   ██╗    ███████╗██╗   ██╗ ██████╗██╗  ██╗                 '],
['                                ██║   ██║    ██╔════╝██║   ██║██╔════╝██║ ██╔╝                 '],
['                                ██║   ██║    ███████╗██║   ██║██║     █████╔╝                  '],
['                                ██║   ██║    ╚════██║██║   ██║██║     ██╔═██╗                  '],
['                                ╚██████╔╝    ███████║╚██████╔╝╚██████╗██║  ██╗                 '],
['                                 ╚═════╝     ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝                 ']
]

let random = [
['                                                                                       '],
['  ██████╗  █████╗ ███╗   ██╗██████╗  ██████╗ ███╗   ███╗    ███╗   ███╗ █████╗ ██████╗ '],
['  ██╔══██╗██╔══██╗████╗  ██║██╔══██╗██╔═══██╗████╗ ████║    ████╗ ████║██╔══██╗██╔══██╗'],
['  ██████╔╝███████║██╔██╗ ██║██║  ██║██║   ██║██╔████╔██║    ██╔████╔██║███████║██████╔╝'],
['  ██╔══██╗██╔══██║██║╚██╗██║██║  ██║██║   ██║██║╚██╔╝██║    ██║╚██╔╝██║██╔══██║██╔═══╝ '],
['  ██║  ██║██║  ██║██║ ╚████║██████╔╝╚██████╔╝██║ ╚═╝ ██║    ██║ ╚═╝ ██║██║  ██║██║     '],
['  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝  ╚═════╝ ╚═╝     ╚═╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ']
                                                                                     
]

let fix = [
['                                                    '],
['  ███████╗██╗██╗  ██╗    ███╗   ███╗ █████╗ ██████╗ '],
['  ██╔════╝██║╚██╗██╔╝    ████╗ ████║██╔══██╗██╔══██╗'],
['  █████╗  ██║ ╚███╔╝     ██╔████╔██║███████║██████╔╝'],
['  ██╔══╝  ██║ ██╔██╗     ██║╚██╔╝██║██╔══██║██╔═══╝ '],
['  ██║     ██║██╔╝ ██╗    ██║ ╚═╝ ██║██║  ██║██║     '],
['  ╚═╝     ╚═╝╚═╝  ╚═╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ']

]

let gg = [
['                  '],
['██████╗  ██████╗  '],
['██╔════╝ ██╔════╝ '],
['██║  ███╗██║  ███╗'],
['██║   ██║██║   ██║'],
['╚██████╔╝╚██████╔╝'],
['╚═════╝  ╚═════╝  ']
                    
]

module.exports = { play, exit, scores, maps, random, fix, gg, REKT}

