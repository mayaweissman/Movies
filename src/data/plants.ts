export function getAllPlants() {
    const plants = [
        {
            id: 1,
            mobileImgSrc: "Orchid.png",
            desktopImgSrc: "Orchid_desktop.png",
            hebTitle: "דרצנה דרקונית ",
            hebContent: "יכולה להפחית זיהום בבית על ידי ספיחת בנזן, פורמלדהיד, אתילן תלת כלורי וקסילן.            ",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [1, 2, 3]
        },
        // חסר: מידה, תמונה, קוד, רעלנים
        {
            id: 2,
            mobileImgSrc: "Philodendron.png",
            desktopImgSrc: "Philodendron_desktop.png",
            hebTitle: "קסנדו",
            hebContent: "שייך למשפחת הדקליים, שהוכחו כמפחיתים זיהום בבית על ידי ספיחת בנזן ופורמלדהיד מהאוויר.            ",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [1, 4, 2, 3]
        },
        // חסר: מידה, תמונה, קוד, רעלנים
        {
            id: 3,
            mobileImgSrc: "Pothos.png",
            desktopImgSrc: "Pothos_desktop.png",
            hebTitle: "פוטוס על מוס",
            hebContent: "הוכח כי צמחי פוטוס תורמים לניקוי האוויר בבית על ידי ספיחת בנזן, פורמלדהיד ואתילן תלת כלורי.",
            price: 12,
            size: "128cm",
            code: 100001008,
            toxins: [1, 2, 3]
        },
        // חסר: מידה, קוד
        {
            id: 4,
            mobileImgSrc: "Zamioculcas.png",
            desktopImgSrc: "Zamioculcas_desktop.png",
            hebTitle: " דמיה קוקולוס",
            hebContent: "שייך למשפחת הדקליים, שהוכחו כמפחיתים זיהום בבית על ידי ספיחת בנזן ופורמלדהיד מהאוויר.",
            price: 12,
            size: "128cm",
            code: 100001022,
            toxins: [1, 3]
        },
        // חסר: מידה
        {
            id: 5,
            mobileImgSrc: "Dracaena_der.png",
            desktopImgSrc: "Dracaena_der_desktop.png",
            hebTitle: "דרצנה דורדו",
            hebContent: "שייך לסדרת הדרקוניות, שהוכחו כמפחיתים זיהום בבית על ידי ספיחת בנזן, פורמלדהיד, אתילן תלת כלורי וקסילן.",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [2, 3, 4, 5]
        },
        // חסר: מידה, תמונה, קוד, רעלנים
        {
            id: 6,
            mobileImgSrc: "Sansevieria.png",
            desktopImgSrc: "Sansevieria_desktop.png",
            hebTitle: "עץ הנצח",
            hebContent: "שייך למשפחת האספרגיים, שהוכחו כמפחיתים זיהום בבית על ידי ספיחת בנזן, פורמלדהיד, אתילן תלת כלורי וקסילן.            ",
            price: 12,
            size: "128cm",
            code: 100001096,
            toxins: [1, 2, 3, 4]
        },
        // חסר: מידה
        {
            id: 7,
            mobileImgSrc: "Dracaena_mar.png",
            desktopImgSrc: "Dracaena_mar_desktop.png",
            hebTitle: " דרצנה מעוצבת גזע",
            hebContent: "הוכח כי צמחים אלו תורמים לניקוי האוויר בבית על ידי ספיחת בנזן, פורמלדהיד, אתילן תלת כלורי יקסילן.",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [2, 3, 4, 5]
        },
        // חסר: מידה, תמונה, קוד, רעלנים
        {
            id: 8,
            mobileImgSrc: "Orchid.png",
            desktopImgSrc: "Orchid_desktop.png",
            hebTitle: " דרצנה למון ליים            ",
            hebContent: "שייך לסדרת הדרקוניות, שהוכחו כמפחיתים זיהום בבית על ידי ספיחת בנזן, פורמלדהיד, אתילן תלת כלורי וקסילן.            ",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [2, 3, 4, 5]
        },
        // חסר: מידה, תמונה, קוד, רעלנים
        {
            id: 9,
            mobileImgSrc: "Chrysanthemum.png",
            desktopImgSrc: "Chrysanthemum_desktop.png",
            hebTitle: " חרצית",
            hebContent: "חרצית יכולה להפחית זיהום בבית על ידי ספיחת אמוניה, בנזן, פורמלדהיד, אתילן תלת כלורי וקסילן.            ",
            price: 12,
            size: "128cm",
            code: 100001024,
            toxins: [1, 2, 3, 4, 5]
        },
        // חסר: מידה
        {
            id: 10,
            mobileImgSrc: "Kalanchoe.png",
            desktopImgSrc: "Kalanchoe_desktop.png",
            hebTitle: " ניצנית",
            hebContent: "שייך למשפחת הטבוריתיים, שהוכחו כמפחיתים זיהום בבית על ידי ספיחת פורמלדהיד וקסילן.            ",
            price: 12,
            size: "128cm",
            code: 100001025,
            toxins: [3, 4]
        },
        // חסר: מידה
        {
            id: 11,
            mobileImgSrc: "Codiaeum.png",
            desktopImgSrc: "Codiaeum_desktop.png",
            hebTitle: " קרוטון",
            hebContent: "תורם לניקוי האוויר בבית על ידי ספיחת בנזן ואתילן תלת כלורי.            ",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [2, 3, 4, 5]
        },
        // חסר: מידה, תמונה, קוד, רעלנים
        {
            id: 12,
            mobileImgSrc: "Orchid.png",
            desktopImgSrc: "Orchid_desktop.png",
            hebTitle: "מרנטה",
            hebContent: "הוכחו כמפחיתים זיהום בבית על ידי ספיחת כמויות קטנות של בנזן ואתילן תלת כלורי.            ",
            price: 12,
            size: "128cm",
            code: 1234,
            toxins: [2, 3, 4, 5]
        },
        // חסר: מידה, תמונה, קוד, רעלנים
        {
            id: 13,
            mobileImgSrc: "Preridophyte.png",
            desktopImgSrc: "Preridophyte_desktop.png",
            hebTitle: "שרכים קטנים",
            hebContent: "הוכחו כמפחיתים זיהום בבית על ידי ספיחת חלק מהפורמלדהיד שבאוויר.            ",
            price: 12,
            size: "128cm",
            code: 100001124,
            toxins: [3]
        },
        // חסר: מידה, תמונה, קוד, רעלנים
        {
            id: 14,
            mobileImgSrc: "Orchid.png",
            desktopImgSrc: "Orchid_desktop.png",
            hebTitle: "סחלב",
            hebContent: "הוכחו כמפחיתים זיהום בבית על ידי ספיחת חלק מהקסילן שבאוויר.            ",
            price: 12,
            size: "128cm",
            code: 100001026,
            toxins: [4]
        },
        {
            id: 15,
            mobileImgSrc: "Alocasia.png",
            desktopImgSrc: "Alocasia_desktop.png",
            hebTitle: "אלוקסיה",
            hebContent: "שייך למשפחת הדקליים, שהוכחו כמפחידים זיהום בבית על ידי ספיחת בנזן ופורמלדהיד מהאוויר.",
            price: 12,
            size: "128cm",
            code: 100001026,
            toxins: [4]
        },
        // חסר: מידה, תמונה, קוד, רעלנים

    ];
    return plants;
}
