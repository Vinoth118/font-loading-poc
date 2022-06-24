import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [font, setFont] = useState<string | null>(null);
    
    useEffect(() => {
        const initialFont = localStorage.getItem('dynamic-font');
        if(initialFont) { setFont(initialFont) } else { setFont('sans-serif') }
        window.addEventListener('storage', (event) => {
            if(event.url.substring(0, 21) == 'http://localhost:3000' && event.key == "dynamic-font" && event.newValue != null) {
                setFont(event.newValue)
            }
        })
    }, [])

    if(font == null) {
        return <></>
    }

    return <Flex fontFamily={font} direction={"column"} w = "100%">
        <Header />
        <Flex direction={"column"} p = "30px">
            {children}
        </Flex>
    </Flex>
}

export default Layout;