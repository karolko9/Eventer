<script>
    const DIALOG_DATA = [
        [
            {
                src: "undraw_connected_world.svg",
                alt: "world icon",
                header: "Attend events all over the world",
                text: "Discover exciting events, both online and in-person, happening all around the globe. join unique experiences no matter where you are and broaden your horizons.",
            },
            {
                src: "undraw_presentation.svg",
                alt: "People with people with presentation",
                header: "Listen to Lectures and Gain Knowledge",
                text: "Join insightful talks and lectures from experts in various fields. Expand your horizons and stay informed on the latest trends and ideas shaping the world today.",
            },
            {
                src: "undraw_people.svg",
                alt: "People",
                header: "Network & Meet Other Ambitious People",
                text: "Connect with driven individuals who share your interests. Build valuable relationships and collaborate with inspiring people, wherever they are.",
            },
        ],
        [
            {
                src: "undraw_time_management.svg",
                alt: "Preson sitting next to clock",
                header: "Create Your Event in Minutes",
                text: "Got a great event idea? Our app lets you quickly create an event, add details and share your passion with others.",
            },
            {
                src: "undraw_connecting_teams.svg",
                alt: "Person holding other person message avatar",
                header: "Gain Visibility",
                text: "With our platform, you'll reach a wide audience and effectively promote your event. Start earning from your ideas today!",
            },
            {
                src: "undraw_booked.svg",
                alt: "Preson standing in front of calendar with tick signs holding in hand",
                header: "Your Event, Your Rules",
                text: "Our tools allow you to customise every aspect of your event — from ticket pricing to attendee management. Full control and convenience in one place.",
            },
        ],
    ];

    export let dialogStep;
    export let dialogUserType;
</script>

<section class="w-full flex flex-col items-center">
    <img
        class="h-[200px] mb-8"
        src={`${DIALOG_DATA[dialogUserType][dialogStep].src}`}
        alt={`${DIALOG_DATA[dialogUserType][dialogStep].alt}`}
    />
    <h2 class="mb-8 text-2xl text-black-default font-medium text-center">
        {DIALOG_DATA[dialogUserType][dialogStep].header}
    </h2>
    <p class="mb-8 text-black-default text-center">
        {DIALOG_DATA[dialogUserType][dialogStep].text}
    </p>
</section>
