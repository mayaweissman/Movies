export function getAllPlants() {
    const plants = [
        {
            id: 1,
            imgSrc: "Orchid.png",
            hebTitle: "דרצנה דרקונית ",
            hebContent: "יכולה להפחית זיהום בבית על ידי ספיחת בנזן, פורמלדהיד, אתילן תלת כלורי וקסילן.            ",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [1, 2, 3]
        },
        {
            id: 2,
            imgSrc: "Orchid.png",
            hebTitle: "קסנדו",
            hebContent: "שייך למשפחת הדקליים, שהוכחו כמפחיתים זיהום בבית על ידי ספיחת בנזן ופורמלדהיד מהאוויר.            ",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [1, 4, 2, 3]
        },
        {
            id: 3,
            imgSrc: "Pothos.png",
            hebTitle: "פוטוס על מוס",
            hebContent: "הוכח כי צמחי פוטוס תורמים לניקוי האוויר בבית על ידי ספיחת בנזן, פורמלדהיד ואתילן תלת כלורי.            ",
            price: 12,
            size: "128cm",
            code: 100001008,
            toxins: [1, 2, 3, 4, 5]
        },
        {
            id: 4,
            imgSrc: "Orchid.png",
            hebTitle: " דמיה קוקולוס",
            hebContent: "שייך למשפחת הדקליים, שהוכחו כמפחיתים זיהום בבית על ידי ספיחת בנזן ופורמלדהיד מהאוויר.            ",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [2, 3, 4, 5]
        },
        {
            id: 5,
            imgSrc: "Orchid.png",
            hebTitle: "דרצנה דורדו",
            hebContent: "שייך לסדרת הדרקוניות, שהוכחו כמפחיתים זיהום בבית על ידי ספיחת בנזן, פורמלדהיד, אתילן תלת כלורי וקסילן.",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [2, 3, 4, 5]
        },
        {
            id: 6,
            imgSrc: "Sansevieria.png",
            hebTitle: "עץ הנצח",
            hebContent: "שייך למשפחת האספרגיים, שהוכחו כמפחיתים זיהום בבית על ידי ספיחת בנזן, פורמלדהיד, אתילן תלת כלורי וקסילן.            ",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [2, 3, 4, 5]
        },
        {
            id: 7,
            imgSrc: "Orchid.png",
            hebTitle: " דרצנה מעוצבת גזע",
            hebContent: "הוכח כי צמחים אלו תורמים לניקוי האוויר בבית על ידי ספיחת בנזן, פורמלדהיד, אתילן תלת כלורי יקסילן.",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [2, 3, 4, 5]
        },
        {
            id: 8,
            imgSrc: "Orchid.png",
            hebTitle: " דרצנה למון ליים            ",
            hebContent: "שייך לסדרת הדרקוניות, שהוכחו כמפחיתים זיהום בבית על ידי ספיחת בנזן, פורמלדהיד, אתילן תלת כלורי וקסילן.            ",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [2, 3, 4, 5]
        },
        {
            id: 9,
            imgSrc: "Chrysanthemum.png",
            hebTitle: " חרצית",
            hebContent: "חרצית יכולה להפחית זיהום בבית על ידי ספיחת אמוניה, בנזן, פורמלדהיד, אתילן תלת כלורי וקסילן.            ",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [2, 3, 4, 5]
        },
        {
            id: 10,
            imgSrc: "Kalanchoe.png",
            hebTitle: " ניצנית",
            hebContent: "שייך למשפחת הטבוריתיים, שהוכחו כמפחיתים זיהום בבית על ידי ספיחת פורמלדהיד וקסילן.            ",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [2, 3, 4, 5]
        },
        {
            id: 11,
            imgSrc: "Codiaeum.png",
            hebTitle: " קרוטון",
            hebContent: "תורם לניקוי האוויר בבית על ידי ספיחת בנזן ואתילן תלת כלורי.            ",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [2, 3, 4, 5]
        },
        {
            id: 12,
            imgSrc: "Orchid.png",
            hebTitle: "מרנטה",
            hebContent: "הוכחו כמפחיתים זיהום בבית על ידי ספיחת כמויות קטנות של בנזן ואתילן תלת כלורי.            ",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [2, 3, 4, 5]
        },
        {
            id: 13,
            imgSrc: "Preridophyte.png",
            hebTitle: "שרכים קטנים",
            hebContent: "הוכחו כמפחיתים זיהום בבית על ידי ספיחת חלק מהפורמלדהיד שבאוויר.            ",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [2, 3, 4, 5]
        },
        {
            id: 14,
            imgSrc: "Orchid.png",
            hebTitle: "סחלב",
            hebContent: "הוכחו כמפחיתים זיהום בבית על ידי ספיחת חלק מהקסילן שבאוויר.            ",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [2, 3, 4, 5]
        },

    ];
    return plants;
}
