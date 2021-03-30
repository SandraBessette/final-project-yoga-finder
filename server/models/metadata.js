const metadata = {
    type:{
        Meditation: false,
        Yoga: false,
        Accessory: false
    },
    filter :{ 
        0: { name: "Online", isChoosen: false },
        1: { name: "Corporate", isChoosen: false },
        2: { name: "Hot yoga", isChoosen: false },
        3: { name: "Therapeutic yoga", isChoosen: false },
        4: { name: "Hatha Yoga", isChoosen: false },
        5: { name: "Ashtanga Yoga", isChoosen: false },
        6: { name: "Vinyasa/Flow Yoga", isChoosen: false },
        7: { name: "Yin Yoga", isChoosen: false },
        8: { name: "Kundalini Yoga", isChoosen: false },
        9: { name: "Prenatal Yoga", isChoosen: false },
        10: { name: "Kripalu Yoga", isChoosen: false },
    },
    sort :{
        distance: true,
        favorite: false,
        rating: false
    }
}

module.exports = metadata;