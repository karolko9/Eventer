<script>
    import { IconMap, IconCalendarCheck, IconCirclePlus, IconUser, IconSettings} from '@tabler/icons-svelte';

    const iconMapping = {
        "map": IconMap,
        "events": IconCalendarCheck,
        "plus": IconCirclePlus,
        "user": IconUser,
        "settings": IconSettings,
    };

    const menuItems = [
        { href: "/", label: "Events Map", icon:"map", hideOnMobile: false },
        { href: "/my-events/attendee", label: "My Events", icon:"events", hideOnMobile: false },
        { href: "/create-event", label: "Create Event", icon:"plus", hideOnMobile: false },
        { href: "/profile", label: "Profile", icon:"user", hideOnMobile: true },
        // { href: "/settings", label: "Settings", icon:"settings", hideOnMobile: true }
    ];

    const getIconComponent = (iconName) => {
        return iconMapping[iconName] || null;
    }
</script>

<nav>
    <ul class="border-t-2 lg:border-r-2 border-gray-200 border-solid">
        {#each menuItems as item, index}
            <li class="{item.hideOnMobile}">
                <a href={item.href}>
                    {#if getIconComponent(item.icon)}
                        <svelte:component this={getIconComponent(item.icon)} style="color: #5B2784; width:30px; height:30px;" />
                    {/if}
                    <p>{item.label}</p>
                </a>
            </li>
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

 

    .hideMenuOption {
        display:none;
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