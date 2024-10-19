<script>
    import { IconMap, IconCalendarCheck, IconCirclePlus, IconUser, IconSettings, IconDeviceImac} from '@tabler/icons-svelte';
    import { currentUserType } from "../stores/userTypeStore";

    // Reactive store value
    let userType = $currentUserType;

    const iconMapping = {
        "map": IconMap,
        "events": IconCalendarCheck,
        "plus": IconCirclePlus,
        "user": IconUser,
        "settings": IconSettings,
        "online": IconDeviceImac
    };

    // Menu items array with showToHost and showToAttendee properties
    const menuItems = [
        { href: "/map", label: "Events Map", icon:"map", showToHost: false, showToAttendee: true },
        { href: "/online-events", label: "Online Events", icon:"online", showToHost: false, showToAttendee: true},
        { href: `/my-events/${userType === "attendee" ? "attendee" : "host" }`, label: "My Events", icon:"events", showToHost: true, showToAttendee: true },
        { href: "/create-event", label: "Create Event", icon:"plus", showToHost: true, showToAttendee: false },
        { href: "/profile", label: "Profile", icon:"user", showToHost: true, showToAttendee: true }, 
    ];

    // Helper function to return the icon component
    const getIconComponent = (iconName) => {
        return iconMapping[iconName] || null;
    }
</script>

<nav>
    <ul class="border-t-2 lg:border-r-2 border-gray-200 border-solid">
        {#each menuItems as item, index}
            {#if (userType === "attendee" && item.showToAttendee) || (userType === "host" && item.showToHost)}
                <li>
                    <a href={item.href}>
                        {#if getIconComponent(item.icon)}
                            <svelte:component this={getIconComponent(item.icon)} style="color: #5B2784; width:30px; height:30px;" />
                        {/if}
                        <p>{item.label}</p>
                    </a>
                </li>
            {/if}
        {/each}
    </ul>
</nav>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    nav {
        width:100%;
        height: 75px;
        background-color: #fff;
        z-index: 2;
        border-right:2px solid rgba(0, 0, 0, 0.2);
        position: relative;
        z-index: 2000;
    }

    ul {
        height:100%;
        padding: 0;
        margin: 0;
        list-style-type: none;
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 0;
    }

    li {
        cursor:pointer;
    }

    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        text-decoration: none;
    }

    p {
        margin:0;
        font-family: "Poppins", sans-serif;
        font-size: 16px;
        color:#5b2784;
    }

    @media (min-width:1024px){
        nav {
            width: fit-content;
            height: 100%;
        }
        
        ul {
            padding:20px;
            flex-direction: column;
            justify-content: flex-start;
            gap:16px;
        }
    }
</style>