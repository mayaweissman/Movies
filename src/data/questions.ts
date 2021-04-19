export function getAllQuestions() {
    const qustions = [
        {
            id: 1,
            index: 1,
            hebTitle: "יש אצלכם מעשנים בבית?",
            outputId: 1,
            infoId: 2,
            explanationId: 1,
            mobileVideoSrc: 'cigarette_mobile.mp4'
        },
        {
            id: 2,
            index: 2,
            hebTitle: `צבעתם את הבית לאחרונה, או שאתם מתכננים לצבוע או לשפץ בקרוב?`,
            outputId: 2,
            infoId: 2,
            explanationId: 2,
            mobileVideoSrc:"roller_mobile.mp4"
        },
        {
            id: 3,
            index: 3,
            hebTitle: `משתמשים הרבה חומרי ניקוי?`,
            outputId: 2,
            infoId: 3,
            explanationId: 3,
            mobileVideoSrc:"spray_mobile.mp4"
        },
        {
            id: 4,
            index: 4,
            hebTitle: `יש לכם חיות מחמד? או מטהרי אוויר בבית?`,
            outputId: 2,
            infoId: 4,
            explanationId: 4,
            mobileVideoSrc:"dog_mobile.mp4"
        },
        {
            id: 5,
            index: 5,
            hebTitle: `האם אתם או בני המשפחה משתמשים בנרות ריחניים, דאודורנטים, לק או ספריי לשיער?`,
            outputId: 2,
            infoId: 5,
            explanationId: 5,
            mobileVideoSrc:""
        },

    ];
    return qustions;
}
