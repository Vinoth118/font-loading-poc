import { Flex } from "@chakra-ui/react";
import Header from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <Flex fontFamily={"dynamic-font"} direction={"column"} w = "100%">
        <Header />
        <Flex direction={"column"} p = "30px">
            {children}
        </Flex>
    </Flex>
}

export default Layout;