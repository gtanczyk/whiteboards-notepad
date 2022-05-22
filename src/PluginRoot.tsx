import {useEffect} from "react";
import {registerSidebarTool} from "@whiteboards-io/plugins";
import icon from "./icon.svg";

export default function PluginRoot() {
    useEffect(() => {
        registerSidebarTool({
            id: "whiteboards-notepad",
            icon: window.location.origin + window.location.pathname + icon,
            tooltip: "Notepad",
            contentUrl: window.location.origin + window.location.pathname + "?sidebar",
        });
    }, []);

    return null;
}